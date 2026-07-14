"""Authenticated JSON:API client for Klaviyo's server-side API."""

from __future__ import annotations

import json
import os
from typing import Any, Callable, Mapping, Optional
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, urlopen

API_BASE_URL = "https://a.klaviyo.com/api/"
API_REVISION = "2026-04-15"


class KlaviyoError(RuntimeError):
    """Base error for actionable CLI failures."""


class KlaviyoAPIError(KlaviyoError):
    """An HTTP error returned by Klaviyo."""

    def __init__(self, method: str, url: str, status: int, payload: Any) -> None:
        self.method = method
        self.url = url
        self.status = status
        self.payload = payload
        super().__init__(self._message())

    def _message(self) -> str:
        prefix = f"Klaviyo API {self.method} {self.url} returned HTTP {self.status}"
        errors = self.payload.get("errors") if isinstance(self.payload, dict) else None
        if not isinstance(errors, list) or not errors:
            return f"{prefix}: {self.payload or 'empty response body'}"

        details = []
        for error in errors:
            if not isinstance(error, dict):
                details.append(str(error))
                continue
            label = error.get("title") or error.get("code") or "API error"
            detail = error.get("detail")
            source = error.get("source")
            location = None
            if isinstance(source, dict):
                location = source.get("pointer") or source.get("parameter")
            rendered = f"{label}: {detail}" if detail else str(label)
            if location:
                rendered += f" ({location})"
            details.append(rendered)
        return f"{prefix}: {'; '.join(details)}"


class KlaviyoClient:
    """Small authenticated client with pagination and dry-run write suppression."""

    def __init__(
        self,
        api_key: Optional[str] = None,
        *,
        revision: str = API_REVISION,
        dry_run: bool = False,
        opener: Callable[..., Any] = urlopen,
    ) -> None:
        self.api_key = api_key or os.environ.get("KLAVIYO_API_KEY", "")
        if not self.api_key:
            raise KlaviyoError(
                "KLAVIYO_API_KEY is missing. Load marketing/.env before running."
            )
        self.revision = revision
        self.dry_run = dry_run
        self._opener = opener

    def request(
        self,
        method: str,
        path_or_url: str,
        *,
        body: Optional[Mapping[str, Any]] = None,
        query: Optional[Mapping[str, Any]] = None,
    ) -> dict[str, Any]:
        method = method.upper()
        url = self._url(path_or_url, query)
        if self.dry_run and method not in {"GET", "HEAD"}:
            raise KlaviyoError(
                f"Internal error: attempted {method} during dry-run; write was blocked."
            )

        encoded = None if body is None else json.dumps(body).encode("utf-8")
        request = Request(
            url,
            data=encoded,
            method=method,
            headers={
                "Authorization": f"Klaviyo-API-Key {self.api_key}",
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                "Revision": self.revision,
            },
        )
        try:
            with self._opener(request) as response:
                raw = response.read()
        except HTTPError as error:
            raw = error.read()
            raise KlaviyoAPIError(
                method, url, error.code, self._decode(raw, allow_text=True)
            ) from None
        except URLError as error:
            raise KlaviyoError(
                f"Klaviyo API {method} {url} failed: {error.reason}"
            ) from None

        if not raw:
            return {}
        decoded = self._decode(raw)
        if not isinstance(decoded, dict):
            raise KlaviyoError(
                f"Klaviyo API {method} {url} returned a non-object JSON response."
            )
        return decoded

    def get_all(
        self, path: str, *, query: Optional[Mapping[str, Any]] = None
    ) -> list[dict[str, Any]]:
        resources: list[dict[str, Any]] = []
        url: Optional[str] = self._url(path, query)
        while url:
            payload = self.request("GET", url)
            data = payload.get("data", [])
            if not isinstance(data, list):
                raise KlaviyoError(f"Expected a resource collection from {url}.")
            resources.extend(item for item in data if isinstance(item, dict))
            links = payload.get("links")
            next_url = links.get("next") if isinstance(links, dict) else None
            url = str(next_url) if next_url else None
        return resources

    @staticmethod
    def _decode(raw: bytes, *, allow_text: bool = False) -> Any:
        try:
            return json.loads(raw.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            if allow_text:
                return raw.decode("utf-8", errors="replace")
            raise KlaviyoError("Klaviyo returned invalid JSON.") from None

    @staticmethod
    def _url(path_or_url: str, query: Optional[Mapping[str, Any]]) -> str:
        url = urljoin(API_BASE_URL, path_or_url.lstrip("/"))
        parsed = urlparse(url)
        if parsed.scheme != "https" or parsed.netloc != "a.klaviyo.com":
            raise KlaviyoError(f"Refusing to send credentials to unexpected URL: {url}")
        if query:
            separator = "&" if parsed.query else "?"
            url += separator + urlencode(query, doseq=True)
        return url
