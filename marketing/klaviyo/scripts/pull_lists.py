#!/usr/bin/env python3
"""Pull raw Klaviyo list metadata without downloading list memberships."""

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


def fetch_lists(key: str) -> list[dict[str, Any]]:
    resources: list[dict[str, Any]] = []
    url: str | None = API_URL

    while url:
        request = Request(
            url,
            headers={
                "Authorization": f"Klaviyo-API-Key {key}",
                "Accept": "application/vnd.api+json",
                "Revision": API_REVISION,
            },
        )
        with urlopen(request) as response:
            payload = json.load(response)

        resources.extend(payload.get("data", []))
        url = payload.get("links", {}).get("next")

    return resources


def write_resources(resources: list[dict[str, Any]]) -> None:
    LISTS_DIR.mkdir(parents=True, exist_ok=True)
    for resource in resources:
        resource_id = resource["id"]
        path = LISTS_DIR / f"{resource_id}.json"
        path.write_text(
            json.dumps(resource, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        print(f"Updated {path.relative_to(Path.cwd())}")


def main() -> None:
    resources = fetch_lists(api_key())
    write_resources(resources)
    print(f"Pulled {len(resources)} list definition(s).")


if __name__ == "__main__":
    main()
