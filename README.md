# Transformers Allspark UI

Transformers Allspark UI is a HACS-ready Home Assistant custom integration that bundles:

- 11 Transformers-themed Lovelace custom cards
- 8 Transformers themes (Dark/Light/Silver/Dirty Metal × G1/Movie)
- shared font assets and stylesheet (`Transformers G1`, `Transformers Movie`)
- Home Assistant brand assets for the integration

It is designed as an **integration-first** package under `custom_components/transformers_allspark_ui/`, so users can install one thing and get cards, themes, and assets working together.

## Features

- Automatic static asset hosting under:
	- `/transformers_allspark_ui_static/transformers-cards.js`
	- `/transformers_allspark_ui_static/transformers-fonts.css`
- Automatic Lovelace resource registration/sync (storage mode)
- Legacy resource migration from:
	- `/transformers_ui_static/transformers-cards.js?...`
- Automatic theme install/update to Home Assistant `themes/` directory
- Automatic `frontend.reload_themes` call after theme updates
- Config flow + options flow with defaults for:
	- resource management
	- theme management
	- default font style (`theme`, `g1`, `movie`)
- Card picker discoverability via `window.customCards`
- Card picker previews enabled (`preview: true`) with dynamic stub configs

## Requirements

- Home Assistant `2026.3.0` or newer
- Lovelace in storage mode for automatic resource management
- Themes enabled in your Home Assistant configuration:

`frontend: themes: !include_dir_merge_named themes`

## Installation (HACS)

1. Add this repository as a custom repository in HACS (category: **Integration**) if needed.
2. Install **Transformers Allspark UI** from HACS.
3. Restart Home Assistant.
4. Go to **Settings → Devices & Services → Add Integration**.
5. Add **Transformers Allspark UI** and complete the config flow.

On setup, the integration can automatically:

- expose bundled frontend assets
- create/update Lovelace resources
- copy/update the theme package into your active `themes/` directory
- reload themes

## Included cards

- `transformers-status-card`
- `transformers-sensor-card`
- `transformers-button-card`
- `transformers-text-card`
- `transformers-gauge-card`
- `transformers-clock-card`
- `transformers-glance-card`
- `transformers-light-card`
- `transformers-picture-card`
- `transformers-weather-card`
- `transformers-alarm-card`

All cards are registered for the card picker and support preview tiles in the Community cards list.

## Font behavior

Supported font styles:

- `theme` (default): follows active theme/global integration default
- `g1`: forces `Transformers G1`
- `movie`: forces `Transformers Movie`

The bundled stylesheet provides shared font-family names so fonts can also be referenced by native cards or other custom cards.

## Themes included

- `Transformers Dark (G1)`
- `Transformers Dark (Movie)`
- `Transformers Light (G1)`
- `Transformers Light (Movie)`
- `Transformers Silver (G1)`
- `Transformers Silver (Movie)`
- `Transformers Dirty Metal (G1)`
- `Transformers Dirty Metal (Movie)`

## Migration notes

This integration supersedes older split card/theme setups.

When resource management is enabled, it will migrate stale legacy card resources, including paths such as:

- `/transformers_ui_static/transformers-cards.js?v=0.1.7&font=g1`

to the canonical integration static path:

- `/transformers_allspark_ui_static/transformers-cards.js?v=<integration-version>`

and keep the resource entry aligned to the current installed version.

## Development

Build frontend assets:

- `npm run build`

After deployment changes:

1. restart Home Assistant
2. verify resources in `.storage/lovelace_resources`
3. verify integration entry in `.storage/core.config_entries`
4. check logs for tracebacks

## Repository layout

- `custom_components/transformers_allspark_ui/` — integration package
- `custom_components/transformers_allspark_ui/www/` — bundled JS/CSS/fonts served by HA
- `custom_components/transformers_allspark_ui/themes/` — source theme package
- `custom_components/transformers_allspark_ui/brand/` — integration brand assets
- `src/` — card source files

## Status

Current version: `0.1.0`

Core integration functionality, resource sync/migration, theme installation, and card picker previews are implemented and validated in local Home Assistant testing.
