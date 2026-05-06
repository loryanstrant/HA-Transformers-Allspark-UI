"""Config flow for Transformers Allspark UI."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback

from .const import (
    CONF_DEFAULT_FONT_STYLE,
    CONF_MANAGE_LOVELACE_RESOURCES,
    CONF_MANAGE_THEMES,
    DEFAULT_ENTRY_DATA,
    DOMAIN,
    FONT_STYLE_OPTIONS,
    NAME,
)


def _build_schema(defaults: dict[str, Any]) -> vol.Schema:
    """Build the config flow schema."""
    return vol.Schema(
        {
            vol.Required(
                CONF_MANAGE_LOVELACE_RESOURCES,
                default=defaults[CONF_MANAGE_LOVELACE_RESOURCES],
            ): bool,
            vol.Required(
                CONF_MANAGE_THEMES,
                default=defaults[CONF_MANAGE_THEMES],
            ): bool,
            vol.Required(
                CONF_DEFAULT_FONT_STYLE,
                default=defaults[CONF_DEFAULT_FONT_STYLE],
            ): vol.In(FONT_STYLE_OPTIONS),
        }
    )


class TransformersAllsparkUIConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Transformers Allspark UI."""

    VERSION = 1
    MINOR_VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        """Handle the initial setup flow."""
        if user_input is None:
            return self.async_show_form(
                step_id="user",
                data_schema=_build_schema(DEFAULT_ENTRY_DATA),
                last_step=True,
            )

        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        return self.async_create_entry(
            title=NAME,
            data=user_input,
        )

    async def async_step_reconfigure(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        """Handle reconfiguration of the single config entry."""
        entry = self._get_reconfigure_entry()
        defaults = {**DEFAULT_ENTRY_DATA, **entry.data}

        if user_input is None:
            return self.async_show_form(
                step_id="reconfigure",
                data_schema=_build_schema(defaults),
                last_step=True,
            )

        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_mismatch()

        return self.async_update_reload_and_abort(
            entry,
            data_updates=user_input,
        )

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> config_entries.OptionsFlow:
        """Return the options flow handler."""
        return TransformersAllsparkUIOptionsFlow(config_entry)


class TransformersAllsparkUIOptionsFlow(config_entries.OptionsFlowWithReload):
    """Handle options for Transformers Allspark UI."""

    def __init__(self, config_entry: config_entries.ConfigEntry) -> None:
        self._config_entry = config_entry

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        """Manage integration options."""
        defaults = {**DEFAULT_ENTRY_DATA, **self._config_entry.data, **self._config_entry.options}

        if user_input is None:
            return self.async_show_form(
                step_id="init",
                data_schema=_build_schema(defaults),
                last_step=True,
            )

        return self.async_create_entry(title="", data=user_input)
