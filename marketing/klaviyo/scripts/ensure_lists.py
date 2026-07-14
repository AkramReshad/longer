#!/usr/bin/env python3
"""Ensure every locally tracked Klaviyo list exists in the account."""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any
from urllib.request import Request, urlopen

API_URL = "https://a.klaviyo.com/api/lists"
API_REVISION = "2026-04-15"
LISTS_DIR = Path(__file__).resolve().parent.parent / "lists"


def api_key() -> str:
    value = os.environ.get("KLAVIYO_API_KEY")
    if not value:
        raise SystemExit(
            "KLAVIYO_API_KEY is missing. Load marketing/.env before running."
        )
    return value


def request_json(
    key: str, method: str, url: str, body: dict[str, Any] | None = None
) -> dict[str, Any]:
    encoded = None if body is None else json.dumps(body).encode("utf-8")
    request = Request(
        url,
        data=encoded,
        method=method,
        headers={
            "Authorization": f"Klaviyo-API-Key {key}",
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            "Revision": API_REVISION,
        },
    )
    with urlopen(request) as response:
        return json.load(response)


def fetch_lists(key: str) -> list[dict[str, Any]]:
    resources: list[dict[str, Any]] = []
    url: str | None = API_URL
    while url:
        payload = request_json(key, "GET", url)
        resources.extend(payload.get("data", []))
        url = payload.get("links", {}).get("next")
    return resources


def write_resource(resource: dict[str, Any], previous_path: Path) -> Path:
    target = LISTS_DIR / f"{resource['id']}.json"
    target.write_text(
        json.dumps(resource, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    if previous_path != target and previous_path.exists():
        previous_path.unlink()
    return target


def create_list(key: str, name: str) -> dict[str, Any]:
    payload = {
        "data": {
            "type": "list",
            "attributes": {"name": name},
        }
    }
    return request_json(key, "POST", API_URL, payload)["data"]


def main() -> None:
    key = api_key()
    LISTS_DIR.mkdir(parents=True, exist_ok=True)
    local_paths = sorted(LISTS_DIR.glob("*.json"))
    remote = fetch_lists(key)
    remote_by_id = {resource["id"]: resource for resource in remote}
    remote_by_name = {
        resource["attributes"]["name"]: resource for resource in remote
    }

    created = 0
    refreshed = 0
    for path in local_paths:
        local = json.loads(path.read_text(encoding="utf-8"))
        resource_id = local.get("id")
        name = local.get("attributes", {}).get("name")
        if not name:
            raise SystemExit(f"{path} has no attributes.name")

        resource = remote_by_id.get(resource_id) or remote_by_name.get(name)
        if resource is None:
            resource = create_list(key, name)
            created += 1
            print(f"Created {name} ({resource['id']})")
        else:
            refreshed += 1
            print(f"Verified {name} ({resource['id']})")

        write_resource(resource, path)

    print(f"Ensured {len(local_paths)} list(s): {created} created, {refreshed} refreshed.")


if __name__ == "__main__":
    main()
