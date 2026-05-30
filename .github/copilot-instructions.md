# Copilot instructions — HA-Transformers-Allspark-UI

> Canonical standards live in the `dev-standards` repo on SOUNDWAVE/Gitea.
> Read by Copilot chat **and** inline suggestions. For full HA build conventions,
> see the `build-ha-component` skill in dev-standards.

## What this repo is

A **Home Assistant custom component** that delivers a Transformers-themed **card
suite + themes + fonts**. Domain: `transformers_allspark_ui`. This supersedes the
older standalone `ha-transformers-cards` repo (now archived).

## Two-layer build (important)

- **Source** for the cards lives in `src/*.js` (base-card + per-type cards).
- They are **bundled via rollup** (`rollup.config.js`, `package.json`) into the
  shipped artifact `custom_components/transformers_allspark_ui/www/transformers-cards.js`.
- **Edit `src/`, then rebuild — never hand-edit the bundled `www/*.js`.** A
  `.js.map` is committed alongside the bundle.
- `scripts/generate-brand-assets.mjs` regenerates brand assets.

## Repo shape

- `custom_components/transformers_allspark_ui/` — `manifest.json`, `__init__.py`,
  `config_flow.py`, `const.py`, `strings.json`, `translations/`, `brand/`,
  `themes/transformers-themes.yaml`, `www/` (bundled card JS + fonts + CSS).
- `src/` — card source; `rollup.config.js`, `package.json`, `scripts/`.
- `hacs.json`, `CARD-EXAMPLES.md`, `THEME-EXAMPLES.md`, `.github/workflows/`.

## Conventions

- Bump `manifest.json` **version** every release (semver); `domain` matches the
  folder name.
- JS deps via npm; commit `package-lock.json`. Rebuild the bundle before release.
- Test: `hassfest` + HACS validation, then `pytest` with
  `pytest-homeassistant-custom-component`.
- Deploy/test via the published release artifact into TEST1/TEST2, not host
  file-copy. Backup + auto-rollback.

## Never

- Don't hand-edit `www/transformers-cards.js` (it's generated).
- Don't commit HA long-lived tokens or deploy keys — Gitea Actions secrets only.
