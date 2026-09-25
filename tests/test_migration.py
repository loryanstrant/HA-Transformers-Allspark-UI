"""Tests for config entry migration and its repair flow."""

from __future__ import annotations

from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryError
from homeassistant.helpers import issue_registry as ir
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.transformers_allspark_ui import async_migrate_entry
from custom_components.transformers_allspark_ui.const import (
    DOMAIN,
    MIGRATION_ISSUE_PREFIX,
)
from custom_components.transformers_allspark_ui.repairs import (
    MigrationRepairFlow,
    async_create_fix_flow,
)


def _entry(hass: HomeAssistant, version: int, minor_version: int) -> MockConfigEntry:
    """Add a config entry at a given schema version."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Transformers Allspark UI",
        data={},
        version=version,
        minor_version=minor_version,
    )
    entry.add_to_hass(hass)
    return entry


async def test_migrate_current_version_succeeds(hass: HomeAssistant) -> None:
    """An entry already at the current schema migrates cleanly."""
    entry = _entry(hass, 1, 1)

    assert await async_migrate_entry(hass, entry) is True
    assert entry.version == 1
    assert entry.minor_version == 1


async def test_migrate_bumps_minor_version(hass: HomeAssistant) -> None:
    """An entry below the current minor version is bumped in place."""
    entry = _entry(hass, 1, 0)

    assert await async_migrate_entry(hass, entry) is True
    assert entry.minor_version == 1


async def test_successful_migration_clears_a_stale_repair(
    hass: HomeAssistant,
) -> None:
    """A repair left by an earlier failed attempt is removed once we succeed."""
    entry = _entry(hass, 1, 1)
    issue_id = f"{MIGRATION_ISSUE_PREFIX}{entry.entry_id}"
    ir.async_create_issue(
        hass,
        DOMAIN,
        issue_id,
        is_fixable=True,
        severity=ir.IssueSeverity.ERROR,
        translation_key="migrate_unsupported_version",
    )
    assert ir.async_get(hass).async_get_issue(DOMAIN, issue_id) is not None

    assert await async_migrate_entry(hass, entry) is True
    assert ir.async_get(hass).async_get_issue(DOMAIN, issue_id) is None


async def test_future_version_raises_config_entry_error(hass: HomeAssistant) -> None:
    """A downgrade is non-recoverable, so it raises rather than returning False."""
    entry = _entry(hass, 2, 0)

    with pytest.raises(ConfigEntryError) as err:
        await async_migrate_entry(hass, entry)

    assert err.value.translation_domain == DOMAIN
    assert err.value.translation_key == "migrate_unsupported_version"


async def test_future_version_creates_a_fixable_repair(hass: HomeAssistant) -> None:
    """The user gets a repair carrying the entry id, so it can be retried."""
    entry = _entry(hass, 2, 0)

    with pytest.raises(ConfigEntryError):
        await async_migrate_entry(hass, entry)

    issue = ir.async_get(hass).async_get_issue(
        DOMAIN, f"{MIGRATION_ISSUE_PREFIX}{entry.entry_id}"
    )
    assert issue is not None
    assert issue.is_fixable is True
    assert issue.severity is ir.IssueSeverity.ERROR
    assert issue.data == {"entry_id": entry.entry_id}


async def test_future_version_leaves_the_entry_in_migration_error(
    hass: HomeAssistant,
) -> None:
    """Setting up a future-version entry parks it in the non-recoverable state."""
    entry = _entry(hass, 2, 0)

    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert entry.state is ConfigEntryState.MIGRATION_ERROR


async def _migration_repair_flow(
    hass: HomeAssistant, entry: MockConfigEntry
) -> MigrationRepairFlow:
    """Build the repair flow the issue would open."""
    flow = await async_create_fix_flow(
        hass,
        f"{MIGRATION_ISSUE_PREFIX}{entry.entry_id}",
        {"entry_id": entry.entry_id},
    )
    assert isinstance(flow, MigrationRepairFlow)
    flow.hass = hass
    return flow


async def test_repair_flow_retries_the_migration(hass: HomeAssistant) -> None:
    """On cores that can retry, submitting the repair asks for another migration."""
    entry = _entry(hass, 2, 0)
    flow = await _migration_repair_flow(hass, entry)
    retry = AsyncMock()

    with patch.object(
        hass.config_entries, "async_retry_migration", retry, create=True
    ):
        form = await flow.async_step_init()
        assert form["type"] == "form"
        assert form["step_id"] == "confirm"

        result = await flow.async_step_confirm({})

    retry.assert_awaited_once_with(entry.entry_id)
    assert result["type"] == "create_entry"


async def test_repair_flow_falls_back_to_asking_for_a_restart(
    hass: HomeAssistant,
) -> None:
    """Before 2026.10 there is no retry API, so the repair asks for a restart."""
    entry = _entry(hass, 2, 0)
    flow = await _migration_repair_flow(hass, entry)

    with patch.object(
        hass.config_entries, "async_retry_migration", None, create=True
    ):
        form = await flow.async_step_init()
        assert form["type"] == "form"
        assert form["step_id"] == "confirm_restart"

        result = await flow.async_step_confirm_restart({})

    assert result["type"] == "create_entry"


async def test_unknown_issue_gets_a_plain_confirm_flow(hass: HomeAssistant) -> None:
    """An issue we do not recognise still returns a usable repair flow."""
    flow = await async_create_fix_flow(hass, "something_else", None)

    assert not isinstance(flow, MigrationRepairFlow)
