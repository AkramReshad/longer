#!/usr/bin/env python3
"""Manage Longer-owned Klaviyo resources through the public API."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Optional, Sequence

from api import KlaviyoAPI
from client import API_REVISION, KlaviyoClient, KlaviyoError

RESOURCE_CHOICES = ("flow", "list", "template")


def parser() -> argparse.ArgumentParser:
    result = argparse.ArgumentParser(
        description="Create, pull, and inspect Longer Klaviyo resources."
    )
    result.add_argument(
        "--dry-run",
        action="store_true",
        help="Read live state and print planned writes without changing Klaviyo.",
    )
    result.add_argument(
        "--revision",
        default=API_REVISION,
        help=f"Klaviyo API revision (default: {API_REVISION}).",
    )
    commands = result.add_subparsers(dest="command", required=True)

    apply_parser = commands.add_parser(
        "apply", help="Create or verify a flow from a readable local JSON definition."
    )
    apply_parser.add_argument("definition", type=Path)

    pull_parser = commands.add_parser(
        "pull", help="Pull raw remote resources into marketing/klaviyo."
    )
    pull_parser.add_argument(
        "resource",
        choices=(*RESOURCE_CHOICES, "all"),
        help="Resource collection to pull.",
    )

    inspect_parser = commands.add_parser(
        "inspect", help="Print live resource JSON for verification."
    )
    inspect_parser.add_argument("resource", choices=RESOURCE_CHOICES)
    identity = inspect_parser.add_mutually_exclusive_group()
    identity.add_argument("--id", dest="resource_id")
    identity.add_argument("--name")

    commands.add_parser(
        "ensure-lists",
        help="Create or verify lists tracked in marketing/klaviyo/lists.",
    )
    return result


def main(argv: Optional[Sequence[str]] = None) -> int:
    arguments = list(argv) if argv is not None else sys.argv[1:]
    dry_run = "--dry-run" in arguments
    arguments = [argument for argument in arguments if argument != "--dry-run"]
    args = parser().parse_args(arguments)
    args.dry_run = args.dry_run or dry_run
    try:
        client = KlaviyoClient(revision=args.revision, dry_run=args.dry_run)
        api = KlaviyoAPI(client, dry_run=args.dry_run)
        if args.command == "apply":
            api.apply_flow(args.definition.resolve())
        elif args.command == "pull":
            if args.dry_run:
                raise KlaviyoError("--dry-run is only valid with apply or ensure-lists")
            resources = RESOURCE_CHOICES if args.resource == "all" else (args.resource,)
            count = api.pull(resources)
            print(f"Pulled {count} resource definition(s).")
        elif args.command == "inspect":
            resource = api.inspect(
                args.resource, resource_id=args.resource_id, name=args.name
            )
            print(json.dumps(resource, indent=2, ensure_ascii=False))
        elif args.command == "ensure-lists":
            created, verified = api.ensure_tracked_lists()
            verb = "Would ensure" if args.dry_run else "Ensured"
            print(
                f"{verb} {created + verified} list(s): "
                f"{created} created, {verified} verified."
            )
        return 0
    except KlaviyoError as error:
        print(f"error: {error}", file=sys.stderr)
        return 1
    except KeyError as error:
        print(
            f"error: Klaviyo response is missing required field {error}",
            file=sys.stderr,
        )
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
