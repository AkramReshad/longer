"""Resource operations and readable flow-definition compilation."""

from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any, Iterable, Mapping, Optional

from client import KlaviyoClient, KlaviyoError

KLAVIYO_DIR = Path(__file__).resolve().parent.parent
RESOURCE_PATHS = {
    "flow": "flows",
    "list": "lists",
    "template": "templates",
}


def resource_name(resource: Mapping[str, Any]) -> Optional[str]:
    attributes = resource.get("attributes")
    if not isinstance(attributes, Mapping):
        return None
    name = attributes.get("name")
    return str(name) if name else None


def index_unique_names(
    resources: Iterable[dict[str, Any]],
    resource_type: str,
    managed_names: Optional[set[str]] = None,
) -> dict[str, dict[str, Any]]:
    result: dict[str, dict[str, Any]] = {}
    duplicates: set[str] = set()
    for resource in resources:
        name = resource_name(resource)
        if not name:
            continue
        if name in result and (managed_names is None or name in managed_names):
            duplicates.add(name)
        result[name] = resource
    if duplicates:
        names = ", ".join(sorted(duplicates))
        raise KlaviyoError(
            f"Duplicate remote {resource_type} names prevent idempotency: {names}"
        )
    return result


class KlaviyoAPI:
    """Name-idempotent Klaviyo resource manager."""

    def __init__(self, client: KlaviyoClient, *, dry_run: bool = False) -> None:
        self.client = client
        self.dry_run = dry_run

    def list_resources(self, resource_type: str) -> list[dict[str, Any]]:
        path = self._resource_path(resource_type)
        query: dict[str, Any] = {}
        if resource_type == "template":
            query[f"additional-fields[{resource_type}]"] = "definition"
        resources = self.client.get_all(path, query=query)
        if resource_type == "flow":
            hydrated = []
            for resource in resources:
                resource_id = resource.get("id")
                if not resource_id:
                    raise KlaviyoError("Remote flow response is missing an id.")
                payload = self.client.request(
                    "GET",
                    f"flows/{resource_id}",
                    query={"additional-fields[flow]": "definition"},
                )
                hydrated.append(payload["data"])
            return hydrated
        return resources

    def inspect(
        self, resource_type: str, *, resource_id: Optional[str], name: Optional[str]
    ) -> Any:
        if resource_id:
            query = None
            if resource_type in {"flow", "template"}:
                query = {f"additional-fields[{resource_type}]": "definition"}
            payload = self.client.request(
                "GET",
                f"{self._resource_path(resource_type)}/{resource_id}",
                query=query,
            )
            return payload.get("data")

        resources = self.list_resources(resource_type)
        if name:
            match = index_unique_names(resources, resource_type, {name}).get(name)
            if match is None:
                raise KlaviyoError(f"No remote {resource_type} named {name!r}.")
            return match
        return resources

    def pull(self, resource_types: Iterable[str]) -> int:
        count = 0
        for resource_type in resource_types:
            resources = self.list_resources(resource_type)
            target_dir = KLAVIYO_DIR / self._resource_path(resource_type)
            target_dir.mkdir(parents=True, exist_ok=True)
            for resource in resources:
                resource_id = resource.get("id")
                if not resource_id:
                    raise KlaviyoError(
                        f"Remote {resource_type} response is missing an id."
                    )
                target = target_dir / f"{resource_id}.json"
                target.write_text(
                    json.dumps(resource, indent=2, ensure_ascii=False) + "\n",
                    encoding="utf-8",
                )
                print(f"Updated {target.relative_to(Path.cwd())}")
                count += 1
        return count

    def ensure_tracked_lists(self) -> tuple[int, int]:
        lists_dir = KLAVIYO_DIR / "lists"
        tracked = []
        local_names: set[str] = set()
        for path in sorted(lists_dir.glob("*.json")):
            resource = load_json(path)
            name = resource_name(resource)
            if not name:
                raise KlaviyoError(f"{path} has no attributes.name")
            if name in local_names:
                raise KlaviyoError(f"Duplicate tracked list name: {name}")
            local_names.add(name)
            tracked.append((path, name))

        remote = index_unique_names(
            self.list_resources("list"), "list", local_names
        )
        created = 0
        for previous_path, name in tracked:
            resource_id, was_created = self.ensure_list(name, remote)
            created += int(was_created)
            if not self.dry_run:
                resource = remote[name]
                target = lists_dir / f"{resource_id}.json"
                target.write_text(
                    json.dumps(resource, indent=2, ensure_ascii=False) + "\n",
                    encoding="utf-8",
                )
                if target != previous_path:
                    previous_path.unlink()
        return created, len(tracked) - created

    def ensure_list(
        self, name: str, remote_by_name: dict[str, dict[str, Any]]
    ) -> tuple[str, bool]:
        existing = remote_by_name.get(name)
        if existing:
            print(f"Verified list {name} ({existing['id']})")
            return str(existing["id"]), False
        if self.dry_run:
            print(f"Would create list {name}")
            return f"dry-run:list:{name}", True

        payload = {"data": {"type": "list", "attributes": {"name": name}}}
        resource = self.client.request("POST", "lists", body=payload)["data"]
        remote_by_name[name] = resource
        print(f"Created list {name} ({resource['id']})")
        return str(resource["id"]), True

    def apply_flow(self, definition_path: Path) -> dict[str, Any]:
        source = load_json(definition_path)
        validate_keys(source, {"name", "trigger", "templates", "actions", "entry"})
        name = require_string(source, "name", str(definition_path))
        actions = source.get("actions")
        if not isinstance(actions, list) or not actions:
            raise KlaviyoError(f"{definition_path}: actions must be a non-empty array")

        templates = source.get("templates", [])
        if not isinstance(templates, list):
            raise KlaviyoError(f"{definition_path}: templates must be an array")
        local_template_names: set[str] = set()
        for template in templates:
            if not isinstance(template, dict):
                raise KlaviyoError(
                    f"{definition_path}: each template must be an object"
                )
            template_name = require_string(template, "name", "template")
            if template_name in local_template_names:
                raise KlaviyoError(f"Duplicate local template name: {template_name}")
            local_template_names.add(template_name)
            template_attributes(template, definition_path.parent)
        compile_flow(
            source,
            list_id="validation:list",
            template_ids={
                name: f"validation:template:{name}"
                for name in local_template_names
            },
        )

        list_name = parse_list_trigger(source.get("trigger"), str(definition_path))
        remote_flows = index_unique_names(
            self.list_resources("flow"), "flow", {name}
        )
        remote_lists = index_unique_names(
            self.list_resources("list"), "list", {list_name}
        )
        list_id, _ = self.ensure_list(list_name, remote_lists)

        remote_templates = index_unique_names(
            self.list_resources("template"), "template", local_template_names
        )
        template_ids: dict[str, str] = {}
        for template in templates:
            template_name = require_string(template, "name", "template")
            template_id = self.ensure_template(
                template, definition_path.parent, remote_templates
            )
            template_ids[template_name] = template_id

        compiled = compile_flow(source, list_id=list_id, template_ids=template_ids)
        existing_flow = remote_flows.get(name)
        if existing_flow:
            print(
                f"Verified flow {name} ({existing_flow['id']}); "
                "no flow changes applied"
            )
            return existing_flow

        payload = {
            "data": {
                "type": "flow",
                "attributes": {"name": name, "definition": compiled},
            }
        }
        if self.dry_run:
            print("Would create flow with payload:")
            print(json.dumps(payload, indent=2, ensure_ascii=False))
            return payload["data"]

        resource = self.client.request(
            "POST",
            "flows",
            body=payload,
            query={"additional-fields[flow]": "definition"},
        )["data"]
        print(f"Created flow {name} ({resource['id']})")
        return resource

    def ensure_template(
        self,
        spec: dict[str, Any],
        base_dir: Path,
        remote_by_name: dict[str, dict[str, Any]],
    ) -> str:
        name = require_string(spec, "name", "template")
        attributes = template_attributes(spec, base_dir)

        existing = remote_by_name.get(name)
        if existing:
            existing_attributes = existing.get("attributes", {})
            changed = any(
                existing_attributes.get(key) != value
                for key, value in attributes.items()
            )
            if changed:
                if self.dry_run:
                    print(f"Would update template {name} ({existing['id']})")
                else:
                    payload = {
                        "data": {
                            "type": "template",
                            "id": existing["id"],
                            "attributes": attributes,
                        }
                    }
                    existing = self.client.request(
                        "PATCH", f"templates/{existing['id']}", body=payload
                    )["data"]
                    remote_by_name[name] = existing
                    print(f"Updated template {name} ({existing['id']})")
            else:
                print(f"Verified template {name} ({existing['id']})")
            return str(existing["id"])

        if self.dry_run:
            print(f"Would create template {name}")
            return f"dry-run:template:{name}"
        payload = {"data": {"type": "template", "attributes": attributes}}
        resource = self.client.request("POST", "templates", body=payload)["data"]
        remote_by_name[name] = resource
        print(f"Created template {name} ({resource['id']})")
        return str(resource["id"])

    @staticmethod
    def _resource_path(resource_type: str) -> str:
        try:
            return RESOURCE_PATHS[resource_type]
        except KeyError:
            raise KlaviyoError(f"Unsupported resource type: {resource_type}") from None


def compile_flow(
    source: Mapping[str, Any], *, list_id: str, template_ids: Mapping[str, str]
) -> dict[str, Any]:
    raw_actions = source["actions"]
    keys: list[str] = []
    for position, action in enumerate(raw_actions):
        if not isinstance(action, dict):
            raise KlaviyoError(f"Action {position + 1} must be an object")
        key = require_string(action, "key", f"action {position + 1}")
        if key in keys:
            raise KlaviyoError(f"Duplicate action key: {key}")
        keys.append(key)

    compiled_actions = []
    for action in raw_actions:
        key = str(action["key"])
        action_type = require_string(action, "type", f"action {key}")
        next_key = action.get("next")
        if next_key is not None and next_key not in keys:
            raise KlaviyoError(f"Action {key!r} links to unknown action {next_key!r}")

        data = copy.deepcopy(action.get("data"))
        reserved = {"key", "type", "next", "data"}
        inline_data = {
            k: copy.deepcopy(v) for k, v in action.items() if k not in reserved
        }
        if data is not None and inline_data:
            raise KlaviyoError(
                f"Action {key!r} cannot combine a data object with inline action fields"
            )
        if data is None:
            data = inline_data
        if not isinstance(data, dict):
            raise KlaviyoError(f"Action {key!r} data must be an object")

        if action_type == "send-email":
            message = data.get("message")
            if not isinstance(message, dict):
                raise KlaviyoError(f"Email action {key!r} requires a message object")
            template_name = message.pop("template", None)
            if not isinstance(template_name, str) or not template_name:
                raise KlaviyoError(
                    f"Email action {key!r} requires message.template by resource name"
                )
            if template_name not in template_ids:
                raise KlaviyoError(
                    f"Email action {key!r} references undefined template "
                    f"{template_name!r}"
                )
            message["template_id"] = template_ids[template_name]

        compiled_actions.append(
            {
                "temporary_id": key,
                "type": action_type,
                "links": {"next": next_key},
                "data": data,
            }
        )

    entry = source.get("entry", keys[0])
    if entry not in keys:
        raise KlaviyoError(f"Flow entry references unknown action {entry!r}")
    return {
        "triggers": [{"type": "list", "id": list_id}],
        "profile_filter": None,
        "actions": compiled_actions,
        "entry_action_id": entry,
    }


def parse_list_trigger(value: Any, context: str) -> str:
    if not isinstance(value, dict):
        raise KlaviyoError(f"{context}: trigger must be an object")
    validate_keys(value, {"type", "name"})
    if value.get("type") != "list":
        raise KlaviyoError(f"{context}: trigger.type must be 'list'")
    return require_string(value, "name", f"{context} trigger")


def template_attributes(spec: Mapping[str, Any], base_dir: Path) -> dict[str, Any]:
    validate_keys(
        spec,
        {"name", "editor_type", "html", "html_file", "text", "text_file"},
    )
    name = require_string(spec, "name", "template")
    editor_type = spec.get("editor_type", "CODE")
    if editor_type not in {"CODE", "USER_DRAGGABLE"}:
        raise KlaviyoError(
            f"Template {name!r}: editor_type must be CODE or USER_DRAGGABLE"
        )
    attributes: dict[str, Any] = {"name": name, "editor_type": editor_type}
    attributes["html"] = read_inline_or_file(spec, "html", base_dir, required=True)
    text = read_inline_or_file(spec, "text", base_dir, required=False)
    if text is not None:
        attributes["text"] = text
    return attributes


def read_inline_or_file(
    spec: Mapping[str, Any], key: str, base_dir: Path, *, required: bool
) -> Optional[str]:
    inline = spec.get(key)
    filename = spec.get(f"{key}_file")
    if inline is not None and filename is not None:
        raise KlaviyoError(f"Template cannot set both {key} and {key}_file")
    if inline is not None:
        if not isinstance(inline, str):
            raise KlaviyoError(f"Template {key} must be a string")
        return inline
    if filename is not None:
        if not isinstance(filename, str) or not filename:
            raise KlaviyoError(f"Template {key}_file must be a path string")
        path = (base_dir / filename).resolve()
        try:
            return path.read_text(encoding="utf-8")
        except OSError as error:
            raise KlaviyoError(f"Cannot read template file {path}: {error}") from None
    if required:
        raise KlaviyoError(f"Template requires {key} or {key}_file")
    return None


def load_json(path: Path) -> dict[str, Any]:
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except OSError as error:
        raise KlaviyoError(f"Cannot read {path}: {error}") from None
    except json.JSONDecodeError as error:
        raise KlaviyoError(
            f"Invalid JSON in {path} at line {error.lineno}, "
            f"column {error.colno}: {error.msg}"
        ) from None
    if not isinstance(payload, dict):
        raise KlaviyoError(f"{path} must contain a JSON object")
    return payload


def require_string(value: Mapping[str, Any], key: str, context: str) -> str:
    result = value.get(key)
    if not isinstance(result, str) or not result.strip():
        raise KlaviyoError(f"{context}: {key} must be a non-empty string")
    return result


def validate_keys(value: Mapping[str, Any], allowed: set[str]) -> None:
    unexpected = set(value) - allowed
    if unexpected:
        raise KlaviyoError(f"Unexpected field(s): {', '.join(sorted(unexpected))}")
