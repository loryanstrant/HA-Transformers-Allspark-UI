# Transformers Allspark UI

[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5?style=flat-square)](https://github.com/hacs/integration)
[![Release](https://img.shields.io/github/v/release/loryanstrant/HA-Transformers-Allspark-UI?style=flat-square)](https://github.com/loryanstrant/HA-Transformers-Allspark-UI/releases)
[![Release date](https://img.shields.io/github/release-date/loryanstrant/HA-Transformers-Allspark-UI?style=flat-square)](https://github.com/loryanstrant/HA-Transformers-Allspark-UI/releases)
[![Downloads](https://img.shields.io/github/downloads/loryanstrant/HA-Transformers-Allspark-UI/total?style=flat-square)](https://github.com/loryanstrant/HA-Transformers-Allspark-UI/releases)
[![License](https://img.shields.io/github/license/loryanstrant/HA-Transformers-Allspark-UI?style=flat-square)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/loryanstrant/HA-Transformers-Allspark-UI?style=flat-square)](https://github.com/loryanstrant/HA-Transformers-Allspark-UI/commits)
[![Stars](https://img.shields.io/github/stars/loryanstrant/HA-Transformers-Allspark-UI?style=flat-square)](https://github.com/loryanstrant/HA-Transformers-Allspark-UI/stargazers)

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=loryanstrant&repository=HA-Transformers-Allspark-UI&category=integration)

<img width="256" height="256" alt="icon" src="https://github.com/user-attachments/assets/1925a8bf-44ad-4749-bb18-aeaac61c8d8c" />
<br><br>

Transformers Allspark UI is a HACS-ready Home Assistant custom integration that bundles:

- 11 G1-themed custom cards
- 2 Fonts (G1 & Movie)
- 9 Theme styles (including the `TELETRAAN-I` backdrop theme)
- A bundled full-page Transformers backdrop image

It is designed as unified integration package, so that you can simply install one thing and get cards, themes, and fonts working together.

I previously had a separate custom components for the [theme](https://github.com/loryanstrant/ha-transformers-theme) and the [cards](https://github.com/loryanstrant/ha-transformers-cards) to do this job, and they still required some manual work for the fonts.

This supercedes both of them.

## Features

- **Visual editor for every card** — configure each card from a form, exposing its full set of options (no YAML required)
- **Appearance controls on every card** — hide the card title, and set width, height, font size and icon size
- **Light card with Mushroom-style controls** — tap to reveal brightness, colour‑temperature and RGB colour, shown based on what the light supports
- **Full-page backdrop** — a bundled Transformers backdrop image and a `TELETRAAN-I` theme that paints it (with a red frame) across the whole view
- Global font setting and individual card override
- Supports native cards
- Allows entity icons to be used
- Reflects entity state

## Requirements

- Home Assistant `2026.3.0` or newer
- [card-mod custom component](https://github.com/thomasloven/lovelace-card-mod)
- Themes enabled in your Home Assistant configuration:

`frontend: themes: !include_dir_merge_named themes`

## Installation (HACS)

1. Add this repository as a custom repository in HACS (category: **Integration**) if needed.
2. Install **Transformers Allspark UI** from HACS.
3. Restart Home Assistant.
4. Go to **Settings → Devices & Services → Add Integration**.
5. Add **Transformers Allspark UI** and complete the config flow.
6. Restart Home Assistant again.

## Font behavior

Supported font styles on the included cards:

- `theme` (default): follows active theme/global integration default
- `g1` forces `Transformers G1`
- `movie` forces `Transformers Movie`

The bundled stylesheet provides shared font-family names so fonts can also be referenced by native cards or other custom cards.

## Card options

Every card has a **visual editor** (Add/Edit card → the form) that exposes its full set of options — no YAML required. On top of each card's own options, all cards share these appearance controls:

- **Font** — `theme` / `g1` / `movie`
- **Hide card title** — drop the card header
- **Width / Height / Font size / Icon size** — size the card and its text/icons (a bare number is treated as pixels; `width` also accepts CSS values such as `100%`)

The **light card** additionally has an expandable **Controls** section with **brightness**, **colour‑temperature** and **RGB colour** sliders, shown according to the light's `supported_color_modes`.

## Themes included

- `Transformers Dark (G1)`
- `Transformers Dark (Movie)`
- `Transformers Light (G1)`
- `Transformers Light (Movie)`
- `Transformers Silver (G1)`
- `Transformers Silver (Movie)`
- `Transformers Dirty Metal (G1)`
- `Transformers Dirty Metal (Movie)`
- `Transformers (G1 - TELETRAAN-I)` — G1 styling that paints the bundled backdrop image across the whole view, framed in red (see [Full-page backdrop](#full-page-backdrop))

### Theme Examples
#### Dark theme (movie font), but showing a card using the G1 font override
<img width="1261" height="606" alt="image" src="https://github.com/user-attachments/assets/183df6de-a53a-4f1b-a3c1-381e26917454" />

#### Silver theme (G1 font), but showing a card using the movie font override
<img width="1092" height="598" alt="image" src="https://github.com/user-attachments/assets/7f0580b4-6494-42eb-8d54-997999fe4e72" />
<br><br>

More theme examples can be found in on the [theme examples](THEME-EXAMPLES.md) page.
<br><br>

## Included cards

All cards are G1 styled, regardless of theme choice. You can override the font for each card to use the movie or theme font, but the overall appearance of the cards is G1.

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

All cards are registered for the card picker and support preview tiles in the Community cards list. The light, picture and weather cards also appear as **entity suggestions** when you add a card for a matching entity.

## Full-page backdrop

To get a full-page Transformers backdrop, set a view's theme to **`Transformers (G1 - TELETRAAN-I)`** — the bundled backdrop image is then painted across the whole view, framed in red, with your cards on top. No extra setup.

The backdrop image is also installed standalone for your own use:

- In the media browser: `/media/transformers_allspark_ui/transformers-background.png`
- Direct URL: `/transformers_allspark_ui_static/backgrounds/transformers-background.png`

### Card Examples
<img width="1607" height="740" alt="image" src="https://github.com/user-attachments/assets/2ea247f4-35f6-4eb9-a600-dfd889a1a18f" />
<img width="1605" height="846" alt="image" src="https://github.com/user-attachments/assets/ee6ef213-60c6-442a-a473-42b0e80d98b0" />
<img width="495" height="397" alt="image" src="https://github.com/user-attachments/assets/9a7377d1-fc11-43f8-87ac-15918ae22ea2" />
<br><br>

More card examples can be found in on the [card examples](CARD-EXAMPLES.md) page.
<br><br>

# Development Approach
<img width="256" height="256" alt="image" src="https://github.com/user-attachments/assets/9fcad42c-9f94-4684-ac45-d6ca029d9ec7" />
