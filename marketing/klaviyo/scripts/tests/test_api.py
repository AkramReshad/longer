from __future__ import annotations

import io
import json
import sys
import tempfile
import unittest
from pathlib import Path
from urllib.error import HTTPError

SCRIPTS_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(SCRIPTS_DIR))

from api import KlaviyoAPI, compile_flow, index_unique_names  # noqa: E402
from client import KlaviyoAPIError, KlaviyoClient, KlaviyoError  # noqa: E402


class Response:
    def __init__(self, payload: dict) -> None:
        self.payload = json.dumps(payload).encode()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        return None

    def read(self) -> bytes:
        return self.payload


class FakeClient:
    def __init__(self, resources=None) -> None:
        self.resources = resources or {"flows": [], "lists": [], "templates": []}
        self.writes = []

    def get_all(self, path, *, query=None):
        return list(self.resources[path])

    def request(self, method, path, *, body=None, query=None):
        if method == "GET":
            collection, resource_id = path.split("/", 1)
            resource = next(
                item for item in self.resources[collection] if item["id"] == resource_id
            )
            return {"data": resource}
        self.writes.append((method, path, body, query))
        resource = dict(body["data"])
        resource["id"] = f"new-{resource['type']}"
        return {"data": resource}


class ClientTests(unittest.TestCase):
    def test_authenticated_request_and_pagination(self) -> None:
        responses = iter(
            [
                Response(
                    {
                        "data": [{"id": "one"}],
                        "links": {"next": "https://a.klaviyo.com/api/lists?page=2"},
                    }
                ),
                Response({"data": [{"id": "two"}], "links": {"next": None}}),
            ]
        )
        requests = []

        def opener(request):
            requests.append(request)
            return next(responses)

        client = KlaviyoClient("secret", opener=opener)
        self.assertEqual(["one", "two"], [r["id"] for r in client.get_all("lists")])
        self.assertEqual(
            "Klaviyo-API-Key secret", requests[0].get_header("Authorization")
        )
        self.assertEqual("2026-04-15", requests[0].get_header("Revision"))

    def test_api_errors_include_detail_and_pointer(self) -> None:
        payload = {
            "errors": [
                {
                    "title": "Invalid input",
                    "detail": "A name is required",
                    "source": {"pointer": "/data/attributes/name"},
                }
            ]
        }

        def opener(request):
            raise HTTPError(
                request.full_url,
                400,
                "Bad Request",
                {},
                io.BytesIO(json.dumps(payload).encode()),
            )

        client = KlaviyoClient("secret", opener=opener)
        with self.assertRaisesRegex(
            KlaviyoAPIError, r"Invalid input: A name is required.*attributes/name"
        ):
            client.request("POST", "lists", body={})

    def test_client_blocks_unexpected_pagination_host(self) -> None:
        client = KlaviyoClient("secret", opener=lambda request: Response({}))
        with self.assertRaisesRegex(KlaviyoError, "unexpected URL"):
            client.request("GET", "https://example.com/steal")


class DefinitionTests(unittest.TestCase):
    def test_compiles_named_template_and_list_trigger(self) -> None:
        source = {
            "actions": [
                {
                    "key": "email-one",
                    "type": "send-email",
                    "next": "delay",
                    "status": "draft",
                    "message": {"template": "Welcome", "subject_line": "Welcome"},
                },
                {
                    "key": "delay",
                    "type": "time-delay",
                    "next": None,
                    "unit": "days",
                    "value": 2,
                },
            ]
        }
        result = compile_flow(
            source, list_id="list-id", template_ids={"Welcome": "tpl-id"}
        )
        self.assertEqual([{"type": "list", "id": "list-id"}], result["triggers"])
        self.assertEqual("email-one", result["entry_action_id"])
        message = result["actions"][0]["data"]["message"]
        self.assertEqual("tpl-id", message["template_id"])
        self.assertNotIn("template", result["actions"][0]["data"]["message"])
        self.assertEqual("delay", result["actions"][0]["links"]["next"])

    def test_rejects_ambiguous_resource_names(self) -> None:
        resources = [
            {"id": "one", "attributes": {"name": "Same"}},
            {"id": "two", "attributes": {"name": "Same"}},
        ]
        with self.assertRaisesRegex(KlaviyoError, "Duplicate remote flow names"):
            index_unique_names(resources, "flow")

    def test_rejects_duplicate_local_template_names_before_writes(self) -> None:
        client = FakeClient()
        api = KlaviyoAPI(client)
        definition = {
            "name": "Welcome Flow",
            "trigger": {"type": "list", "name": "Waitlist"},
            "templates": [
                {"name": "Welcome Email", "html": "<p>One</p>"},
                {"name": "Welcome Email", "html": "<p>Two</p>"},
            ],
            "actions": [
                {
                    "key": "welcome",
                    "type": "send-email",
                    "message": {"template": "Welcome Email"},
                }
            ],
        }
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "flow.json"
            path.write_text(json.dumps(definition))
            with self.assertRaisesRegex(KlaviyoError, "Duplicate local template name"):
                api.apply_flow(path)
        self.assertEqual([], client.writes)

    def test_dry_run_plans_all_writes_without_calling_write_methods(self) -> None:
        client = FakeClient()
        api = KlaviyoAPI(client, dry_run=True)
        definition = {
            "name": "Welcome Flow",
            "trigger": {"type": "list", "name": "Waitlist"},
            "templates": [
                {"name": "Welcome Email", "editor_type": "CODE", "html": "<p>Hi</p>"}
            ],
            "actions": [
                {
                    "key": "welcome",
                    "type": "send-email",
                    "status": "draft",
                    "message": {"template": "Welcome Email", "subject_line": "Hi"},
                }
            ],
        }
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "flow.json"
            path.write_text(json.dumps(definition))
            resource = api.apply_flow(path)
        self.assertEqual([], client.writes)
        trigger = resource["attributes"]["definition"]["triggers"][0]
        self.assertEqual("dry-run:list:Waitlist", trigger["id"])

    def test_existing_names_reuse_flow_and_update_changed_template(self) -> None:
        resources = {
            "flows": [{"id": "flow-id", "attributes": {"name": "Welcome Flow"}}],
            "lists": [{"id": "list-id", "attributes": {"name": "Waitlist"}}],
            "templates": [
                {
                    "id": "template-id",
                    "attributes": {
                        "name": "Welcome Email",
                        "editor_type": "CODE",
                        "html": "<p>Old</p>",
                    },
                }
            ],
        }
        client = FakeClient(resources)
        api = KlaviyoAPI(client)
        definition = {
            "name": "Welcome Flow",
            "trigger": {"type": "list", "name": "Waitlist"},
            "templates": [{"name": "Welcome Email", "html": "<p>New</p>"}],
            "actions": [
                {
                    "key": "welcome",
                    "type": "send-email",
                    "message": {"template": "Welcome Email", "subject_line": "Hi"},
                }
            ],
        }
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "flow.json"
            path.write_text(json.dumps(definition))
            result = api.apply_flow(path)
        self.assertEqual("flow-id", result["id"])
        self.assertEqual(["PATCH"], [write[0] for write in client.writes])
        self.assertEqual("templates/template-id", client.writes[0][1])


if __name__ == "__main__":
    unittest.main()
