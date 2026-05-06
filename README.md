# Transformers Allspark UI

Transformers Allspark UI is a HACS-ready Home Assistant custom integration that bundles:

- 11 G1-themed custom cards
- 2 Fonts (G1 & Movie)
- 8 Theme styles

It is designed as an **integration-first** package under `custom_components/transformers_allspark_ui/`, so users can install one thing and get cards, themes, and fonts working together.

I previously had two separate custom components to do this job, and still required some manual work for the fonts.

https://github.com/loryanstrant/ha-transformers-theme

https://github.com/loryanstrant/ha-transformers-cards

This supercedes both of them.


## Features

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

## Themes included

- `Transformers Dark (G1)`
- `Transformers Dark (Movie)`
- `Transformers Light (G1)`
- `Transformers Light (Movie)`
- `Transformers Silver (G1)`
- `Transformers Silver (Movie)`
- `Transformers Dirty Metal (G1)`
- `Transformers Dirty Metal (Movie)`

### Theme Examples
#### Dark theme (movie font), but showing a card using the G1 font override
<img width="1261" height="606" alt="image" src="https://github.com/user-attachments/assets/183df6de-a53a-4f1b-a3c1-381e26917454" />

#### Silver theme (G1 font), but showing a card using the movie font override
<img width="1092" height="598" alt="image" src="https://github.com/user-attachments/assets/7f0580b4-6494-42eb-8d54-997999fe4e72" />



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

### Card Examples
<img width="1607" height="740" alt="image" src="https://github.com/user-attachments/assets/2ea247f4-35f6-4eb9-a600-dfd889a1a18f" />
<img width="1605" height="846" alt="image" src="https://github.com/user-attachments/assets/ee6ef213-60c6-442a-a473-42b0e80d98b0" />
<img width="495" height="397" alt="image" src="https://github.com/user-attachments/assets/9a7377d1-fc11-43f8-87ac-15918ae22ea2" />


# Development Approach
<img width="256" height="256" alt="image" src="https://github.com/user-attachments/assets/9fcad42c-9f94-4684-ac45-d6ca029d9ec7" />


