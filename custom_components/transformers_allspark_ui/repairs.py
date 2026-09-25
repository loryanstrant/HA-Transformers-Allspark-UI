"""Repair flows for Transformers Allspark UI."""

from __future__ import annotations

from collections.abc import Awaitable, Callable
from typing import Any

import voluptuous as vol
from homeassistant.components.repairs import ConfirmRepairFlow, RepairsFlow
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResult

from .const import MIGRATION_ISSUE_PREFIX


class MigrationRepairFlow(RepairsFlow):
    """Let the user retry a failed config entry migration without restarting."""

    def __init__(self, entry_id: str) -> None:
        """Remember which config entry this repair is about."""
        self.entry_id = entry_id

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Start the repair."""
        return await self.async_step_confirm()

    @property
    def _retry_migration(self) -> Callable[[str], Awaitable[None]] | None:
        """Return the core's retry-migration call, or None before 2026.10.

        Older cores only leave ``migration_error`` on a restart, so the repair
        has to ask for one instead of retrying in place.
        """
        return getattr(self.hass.config_entries, "async_retry_migration", None)

    async def async_step_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Retry the migration once the user confirms they have fixed the cause."""
        retry_migration = self._retry_migration

        if user_input is not None:
            if retry_migration is not None:
                await retry_migration(self.entry_id)
            return self.async_create_entry(data={})

        step_id = "confirm" if retry_migration is not None else "confirm_restart"
        return self.async_show_form(step_id=step_id, data_schema=vol.Schema({}))

    async def async_step_confirm_restart(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Handle the same step under its pre-2026.10 wording."""
        return await self.async_step_confirm(user_input)


async def async_create_fix_flow(
    hass: HomeAssistant,
    issue_id: str,
    data: dict[str, str | int | float | None] | None,
) -> RepairsFlow:
    """Create the flow that fixes an issue raised by this integration."""
    if issue_id.startswith(MIGRATION_ISSUE_PREFIX) and data is not None:
        return MigrationRepairFlow(str(data["entry_id"]))

    return ConfirmRepairFlow()
