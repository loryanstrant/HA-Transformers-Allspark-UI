"""Transformers Allspark UI integration."""

from __future__ import annotations

import inspect
import json
import logging
from functools import partial
from pathlib import Path
from typing import Any
from uuid import uuid4

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_call_later

from .const import (
    BACKGROUND_FILENAME,
    CARD_BUNDLE_FILENAME,
    CONF_MANAGE_LOVELACE_RESOURCES,
    CONF_MANAGE_THEMES,
    DEFAULT_ENTRY_DATA,
    DOMAIN,
    FONT_STYLESHEET_FILENAME,
    INTEGRATION_VERSION,
    LEGACY_RESOURCE_PATHS,
    RESOURCE_DEFINITIONS,
    STATIC_DIRECTORY_NAME,
    STATIC_URL_BASE,
    THEME_INSTALL_FILENAME,
    THEME_SOURCE_FILENAME,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up Transformers Allspark UI from YAML."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Transformers Allspark UI from a config entry."""
    _LOGGER.debug("%s async_setup_entry starting for entry %s", DOMAIN, entry.entry_id)
    manager = AllsparkUIManager(hass, entry)
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = manager

    await manager.async_setup()
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    manager: AllsparkUIManager | None = hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    if manager is not None:
        manager.async_cancel_retries()
    return True


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload the config entry after updates."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_migrate_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Migrate old entry versions."""
    if entry.version > 1:
        _LOGGER.error(
            "Cannot migrate %s config entry from future version %s.%s",
            DOMAIN,
            entry.version,
            entry.minor_version,
        )
        return False

    if entry.minor_version < 1:
        hass.config_entries.async_update_entry(entry, minor_version=1)

    return True


class AllsparkUIManager:
    """Runtime manager for static assets, Lovelace resources, and themes."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self._retry_unsub = None

    async def async_setup(self) -> None:
        """Set up runtime registration for this config entry."""
        _LOGGER.debug("%s registering static path", DOMAIN)
        await self._async_register_static_path()
        _LOGGER.debug("%s ensuring Lovelace resources", DOMAIN)
        await self._async_ensure_lovelace_resources()
        _LOGGER.debug("%s installing themes", DOMAIN)
        await self._async_install_themes()
        _LOGGER.debug("%s installing background image", DOMAIN)
        await self._async_install_background()
        _LOGGER.debug("%s setup finished", DOMAIN)

    @property
    def _entry_data(self) -> dict[str, Any]:
        """Return merged entry defaults."""
        return {**DEFAULT_ENTRY_DATA, **self.entry.data, **self.entry.options}

    def async_cancel_retries(self) -> None:
        """Cancel any scheduled retry callback."""
        if self._retry_unsub is not None:
            self._retry_unsub()
            self._retry_unsub = None

    async def _async_register_static_path(self) -> None:
        """Expose bundled frontend files under a stable URL prefix."""
        static_path = Path(__file__).parent / STATIC_DIRECTORY_NAME
        try:
            await self.hass.http.async_register_static_paths(
                [StaticPathConfig(STATIC_URL_BASE, str(static_path), False)]
            )
        except RuntimeError:
            _LOGGER.debug("Static path %s was already registered", STATIC_URL_BASE)

    async def _async_ensure_lovelace_resources(self) -> None:
        """Register or migrate Lovelace resources in storage mode."""
        if not self._entry_data[CONF_MANAGE_LOVELACE_RESOURCES]:
            return

        lovelace = self.hass.data.get("lovelace")
        resources = getattr(lovelace, "resources", None) if lovelace else None
        if lovelace is None or resources is None:
            _LOGGER.debug("%s Lovelace resource manager unavailable; using storage fallback", DOMAIN)
            await self._async_sync_lovelace_resource_store()
            return

        if getattr(lovelace, "mode", None) != "storage":
            _LOGGER.debug(
                "%s Lovelace is in %s mode; attempting live resource manager sync",
                DOMAIN,
                getattr(lovelace, "mode", None),
            )

        if hasattr(resources, "loaded") and not resources.loaded:
            _LOGGER.debug("%s Lovelace resource manager not loaded; using storage fallback and scheduling retry", DOMAIN)
            await self._async_sync_lovelace_resource_store()
            self.async_cancel_retries()

            @callback
            def _retry(_now: Any) -> None:
                self._retry_unsub = None
                self.hass.async_create_task(self._async_ensure_lovelace_resources())

            self._retry_unsub = async_call_later(self.hass, 5, _retry)
            return

        existing_resources = await self._async_get_existing_resources(resources)

        for resource_definition in RESOURCE_DEFINITIONS:
            if not resource_definition["register"]:
                continue

            filename = resource_definition["filename"]
            desired_url = self._build_resource_url(filename)
            desired_path = self._strip_query(desired_url)
            desired_type = resource_definition["resource_type"]
            candidate_paths = {desired_path}

            if filename == CARD_BUNDLE_FILENAME:
                candidate_paths.update(LEGACY_RESOURCE_PATHS)

            matching_resources = [
                resource for resource in existing_resources if resource["path"] in candidate_paths
            ]

            if matching_resources:
                primary_resource = matching_resources[0]
                if primary_resource["url"] != desired_url or primary_resource["resource_type"] != desired_type:
                    await self._async_update_resource(
                        resources,
                        primary_resource["id"],
                        desired_url,
                        desired_type,
                    )

                for duplicate in matching_resources[1:]:
                    await self._async_delete_resource(resources, duplicate["id"])
                continue

            await self._async_create_resource(resources, desired_url, desired_type)

        await self._async_sync_lovelace_resource_store()
        _LOGGER.debug("%s Lovelace resource sync complete", DOMAIN)

    async def _async_install_themes(self) -> None:
        """Install or refresh the integration theme file in the HA themes directory."""
        if not self._entry_data[CONF_MANAGE_THEMES]:
            return

        source = Path(__file__).parent / "themes" / THEME_SOURCE_FILENAME
        if not await self.hass.async_add_executor_job(source.is_file):
            _LOGGER.warning("Theme source file is missing: %s", source)
            return

        destination_directory = Path(self.hass.config.path("themes"))
        destination = destination_directory / THEME_INSTALL_FILENAME

        await self.hass.async_add_executor_job(
            partial(destination_directory.mkdir, parents=True, exist_ok=True)
        )
        source_text = await self.hass.async_add_executor_job(source.read_text, "utf-8")

        destination_text = None
        if await self.hass.async_add_executor_job(destination.exists):
            destination_text = await self.hass.async_add_executor_job(destination.read_text, "utf-8")

        if source_text == destination_text:
            _LOGGER.debug("%s theme file already up to date", DOMAIN)
            return

        await self.hass.async_add_executor_job(destination.write_text, source_text, "utf-8")
        _LOGGER.info("%s wrote theme file to %s", DOMAIN, destination)

        try:
            await self.hass.services.async_call(
                "frontend",
                "reload_themes",
                blocking=True,
            )
            _LOGGER.debug("%s requested frontend.reload_themes", DOMAIN)
        except Exception as err:  # pragma: no cover - defensive logging only
            _LOGGER.warning("Failed to reload themes after updating %s: %s", destination, err)

    async def _async_install_background(self) -> None:
        """Copy the bundled Transformers background image into HA's media folder
        so it can be picked as a view background. It is also served via the
        static path at ``{STATIC_URL_BASE}/backgrounds/{BACKGROUND_FILENAME}``."""
        source = Path(__file__).parent / "www" / "backgrounds" / BACKGROUND_FILENAME
        if not await self.hass.async_add_executor_job(source.is_file):
            return

        media_dirs = getattr(self.hass.config, "media_dirs", None) or {}
        if not media_dirs:
            _LOGGER.debug("%s no media dir configured; background served via static path only", DOMAIN)
            return

        destination_dir = Path(next(iter(media_dirs.values()))) / DOMAIN
        destination = destination_dir / BACKGROUND_FILENAME
        try:
            await self.hass.async_add_executor_job(
                partial(destination_dir.mkdir, parents=True, exist_ok=True)
            )
            source_bytes = await self.hass.async_add_executor_job(source.read_bytes)
            if await self.hass.async_add_executor_job(destination.exists):
                if await self.hass.async_add_executor_job(destination.read_bytes) == source_bytes:
                    return
            await self.hass.async_add_executor_job(destination.write_bytes, source_bytes)
            _LOGGER.info("%s installed background image to %s", DOMAIN, destination)
        except Exception as err:  # noqa: BLE001
            _LOGGER.warning("%s could not install background to media (%s)", DOMAIN, err)

    async def _async_sync_lovelace_resource_store(self) -> None:
        """Synchronize Lovelace resources directly in the storage file."""
        storage_path = Path(self.hass.config.path(".storage/lovelace_resources"))
        payload = await self.hass.async_add_executor_job(self._load_lovelace_resource_store, storage_path)
        before = json.dumps(payload, sort_keys=True)

        data = payload.setdefault("data", {})
        items = [item for item in data.setdefault("items", []) if isinstance(item, dict)]
        data["items"] = items

        for resource_definition in RESOURCE_DEFINITIONS:
            if not resource_definition["register"]:
                continue

            filename = resource_definition["filename"]
            desired_url = self._build_resource_url(filename)
            desired_path = self._strip_query(desired_url)
            desired_type = resource_definition["resource_type"]
            candidate_paths = {desired_path}

            if filename == CARD_BUNDLE_FILENAME:
                candidate_paths.update(LEGACY_RESOURCE_PATHS)

            matching_indexes = [
                index
                for index, item in enumerate(items)
                if self._strip_query(str(item.get("url", ""))) in candidate_paths
            ]

            if matching_indexes:
                primary_index = matching_indexes[0]
                items[primary_index]["url"] = desired_url
                items[primary_index]["type"] = desired_type
                items[primary_index].pop("res_type", None)

                for duplicate_index in reversed(matching_indexes[1:]):
                    items.pop(duplicate_index)
                continue

            items.append(
                {
                    "id": uuid4().hex,
                    "url": desired_url,
                    "type": desired_type,
                }
            )

        after = json.dumps(payload, sort_keys=True)
        if after == before:
            return

        await self.hass.async_add_executor_job(self._write_json_file, storage_path, payload)

    @staticmethod
    def _load_lovelace_resource_store(storage_path: Path) -> dict[str, Any]:
        """Load the Lovelace resource storage payload from disk."""
        if not storage_path.exists():
            return {
                "version": 1,
                "minor_version": 1,
                "key": "lovelace_resources",
                "data": {"items": []},
            }

        return json.loads(storage_path.read_text(encoding="utf-8"))

    @staticmethod
    def _write_json_file(storage_path: Path, payload: dict[str, Any]) -> None:
        """Write JSON payloads using the same formatting as Home Assistant storage."""
        storage_path.write_text(f"{json.dumps(payload, indent=2)}\n", encoding="utf-8")

    async def _async_get_existing_resources(self, resources: Any) -> list[dict[str, Any]]:
        """Return normalized Lovelace resource items."""
        items = resources.async_items()
        if inspect.isawaitable(items):
            items = await items

        normalized: list[dict[str, Any]] = []
        for item in items:
            resource_id = self._get_resource_attr(item, "id")
            url = self._get_resource_attr(item, "url")
            resource_type = self._get_resource_attr(item, "type") or self._get_resource_attr(item, "res_type")
            if not url:
                continue

            normalized.append(
                {
                    "id": resource_id,
                    "url": url,
                    "path": self._strip_query(url),
                    "resource_type": resource_type,
                }
            )

        return normalized

    async def _async_create_resource(self, resources: Any, url: str, resource_type: str) -> None:
        """Create a Lovelace resource using compatibility payload fallbacks."""
        last_error: Exception | None = None
        for payload in (
            {"url": url, "type": resource_type},
            {"url": url, "res_type": resource_type},
            {"url": url},
        ):
            try:
                await resources.async_create_item(payload)
                return
            except Exception as err:  # pragma: no cover - compatibility fallback
                last_error = err

        _LOGGER.warning("Failed to create Lovelace resource %s: %s", url, last_error)

    async def _async_update_resource(
        self,
        resources: Any,
        resource_id: Any,
        url: str,
        resource_type: str,
    ) -> None:
        """Update an existing Lovelace resource using compatibility payload fallbacks."""
        if resource_id is None:
            await self._async_create_resource(resources, url, resource_type)
            return

        last_error: Exception | None = None
        for payload in (
            {"url": url, "type": resource_type},
            {"url": url, "res_type": resource_type},
            {"url": url},
        ):
            try:
                await resources.async_update_item(resource_id, payload)
                return
            except Exception as err:  # pragma: no cover - compatibility fallback
                last_error = err

        _LOGGER.warning("Failed to update Lovelace resource %s: %s", url, last_error)

    async def _async_delete_resource(self, resources: Any, resource_id: Any) -> None:
        """Delete a duplicate Lovelace resource if possible."""
        if resource_id is None:
            return
        try:
            await resources.async_delete_item(resource_id)
        except Exception as err:  # pragma: no cover - defensive logging only
            _LOGGER.debug("Unable to delete duplicate resource %s: %s", resource_id, err)

    def _build_resource_url(self, filename: str) -> str:
        """Return the versioned URL for a frontend asset."""
        return f"{STATIC_URL_BASE}/{filename}?v={INTEGRATION_VERSION}"

    @staticmethod
    def _get_resource_attr(item: Any, name: str) -> Any:
        """Read an attribute from a dict-like or object-like resource item."""
        if isinstance(item, dict):
            return item.get(name)
        return getattr(item, name, None)

    @staticmethod
    def _strip_query(url: str) -> str:
        """Return a resource URL without its query string."""
        return url.split("?", 1)[0]
