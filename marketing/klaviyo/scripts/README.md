# Klaviyo API scripts

`klaviyo.py` is the first-party control surface for Longer-owned lists, templates,
and flows. It uses only Python's standard library and the stable Klaviyo API
revision declared in `client.py`.

Load the private API key before running commands:

```sh
set -a
source marketing/.env
set +a
```

The key needs read/write scopes for lists, templates, and flows.

## Commands

```sh
# Show planned API writes; live reads still run for accurate name resolution.
python3 marketing/klaviyo/scripts/klaviyo.py apply path/to/flow.json --dry-run

# Create missing resources, update changed named templates, and create the flow.
python3 marketing/klaviyo/scripts/klaviyo.py apply path/to/flow.json

# Pull raw resources using the repository's {resource}/{id}.json convention.
python3 marketing/klaviyo/scripts/klaviyo.py pull all

# Inspect one live resource by unique name or ID, including definitions.
python3 marketing/klaviyo/scripts/klaviyo.py inspect flow --name "Longer — Welcome"
python3 marketing/klaviyo/scripts/klaviyo.py inspect template --id ABC123

# Preserve the existing tracked-list workflow.
python3 marketing/klaviyo/scripts/klaviyo.py ensure-lists --dry-run
```

`pull_lists.py` and `ensure_lists.py` remain as compatibility wrappers.

## Flow definition

Definitions are JSON so they remain readable, diffable, and dependency-free.
Paths are resolved relative to the definition file. A definition owns its named
templates and assigns them to email actions by name:

```json
{
  "name": "Longer — Clinical Enrollment",
  "trigger": {
    "type": "list",
    "name": "Longer Clinical Enrollment — Prelaunch"
  },
  "templates": [
    {
      "name": "Longer — Enrollment Confirmed",
      "editor_type": "CODE",
      "html_file": "emails/enrollment-confirmed.html",
      "text_file": "emails/enrollment-confirmed.txt"
    }
  ],
  "actions": [
    {
      "key": "confirmation",
      "type": "send-email",
      "next": "follow-up-delay",
      "status": "draft",
      "message": {
        "name": "Enrollment Confirmed",
        "template": "Longer — Enrollment Confirmed",
        "from_email": "patients@longer.com",
        "from_label": "Longer Clinical Affairs",
        "subject_line": "Your enrollment has been received",
        "preview_text": "Treatment eligibility is under review.",
        "smart_sending_enabled": true,
        "transactional": false,
        "add_tracking_params": true
      }
    },
    {
      "key": "follow-up-delay",
      "type": "time-delay",
      "next": null,
      "unit": "days",
      "value": 2,
      "secondary_value": 0,
      "timezone": "profile",
      "delay_until_weekdays": [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday"
      ]
    }
  ],
  "entry": "confirmation"
}
```

Action `key` values become Klaviyo `temporary_id` values. `next` and `entry`
refer to those keys. The compiler resolves the trigger's list name to its ID and
each email action's `message.template` name to its template ID.

Resource names are the idempotency keys. A unique existing list or flow is
reused. A unique existing template is updated when its managed fields differ.
Duplicate remote names fail before writes because they make name resolution
ambiguous. Existing flows are verified by name; Klaviyo's create endpoint does
not replace a flow definition in place.
