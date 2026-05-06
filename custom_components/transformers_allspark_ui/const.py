"""Constants for Transformers Allspark UI."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Final

DOMAIN: Final = "transformers_allspark_ui"
NAME: Final = "Transformers Allspark UI"

MANIFEST_PATH: Final = Path(__file__).parent / "manifest.json"
INTEGRATION_VERSION: Final = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))["version"]

STATIC_DIRECTORY_NAME: Final = "www"
STATIC_URL_BASE: Final = "/transformers_allspark_ui_static"

CARD_BUNDLE_FILENAME: Final = "transformers-cards.js"
FONT_STYLESHEET_FILENAME: Final = "transformers-fonts.css"
THEME_SOURCE_FILENAME: Final = "transformers-themes.yaml"
THEME_INSTALL_FILENAME: Final = "transformers-allspark-ui.yaml"

RESOURCE_VERSION_QUERY: Final = f"v={INTEGRATION_VERSION}"
RESOURCE_TYPE_MODULE: Final = "module"
RESOURCE_TYPE_STYLESHEET: Final = "css"

RESOURCE_DEFINITIONS: Final = (
    {
        "filename": CARD_BUNDLE_FILENAME,
        "resource_type": RESOURCE_TYPE_MODULE,
        "register": True,
    },
    {
        "filename": FONT_STYLESHEET_FILENAME,
        "resource_type": RESOURCE_TYPE_STYLESHEET,
        "register": True,
    },
)

LEGACY_RESOURCE_PATHS: Final = (
    "/transformers_ui_static/transformers-cards.js",
)

CONF_DEFAULT_FONT_STYLE: Final = "default_font_style"
CONF_MANAGE_LOVELACE_RESOURCES: Final = "manage_lovelace_resources"
CONF_MANAGE_THEMES: Final = "manage_themes"

FONT_STYLE_THEME: Final = "theme"
FONT_STYLE_G1: Final = "g1"
FONT_STYLE_MOVIE: Final = "movie"
FONT_STYLE_OPTIONS: Final = (
    FONT_STYLE_THEME,
    FONT_STYLE_G1,
    FONT_STYLE_MOVIE,
)

DEFAULT_ENTRY_DATA: Final = {
    CONF_DEFAULT_FONT_STYLE: FONT_STYLE_THEME,
    CONF_MANAGE_LOVELACE_RESOURCES: True,
    CONF_MANAGE_THEMES: True,
}

THEME_NAMES: Final = (
    "Transformers Dark (G1)",
    "Transformers Dark (Movie)",
    "Transformers Light (G1)",
    "Transformers Light (Movie)",
    "Transformers Silver (G1)",
    "Transformers Silver (Movie)",
    "Transformers Dirty Metal (G1)",
    "Transformers Dirty Metal (Movie)",
)
