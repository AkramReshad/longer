#!/usr/bin/env python3
"""Compatibility wrapper for the shared Klaviyo API layer."""

from klaviyo import main


if __name__ == "__main__":
    raise SystemExit(main(["ensure-lists"]))
