// Shared visual editor for all Transformers Allspark UI cards.
// Each card type maps to an ha-form schema; complex keys not in a schema
// (e.g. button `buttons`, gauge `severity`) are preserved untouched so they
// can still be edited in YAML.

const num = { number: { mode: 'box' } };
const bool = { boolean: {} };
const text = { text: {} };
const ent = (domain) => ({ entity: domain ? { domain } : {} });
const entMulti = (domain) => ({ entity: { multiple: true, ...(domain ? { domain } : {}) } });
const sel = (...opts) => ({ select: { mode: 'dropdown', options: opts } });

// Appearance options shared by every card type (font, hide title, sizing).
const APPEARANCE = [
  { name: 'font_style', selector: sel('theme', 'g1', 'movie') },
  { name: 'hide_title', selector: bool },
  { type: 'grid', name: '', schema: [
    { name: 'width', selector: text },
    { name: 'height', selector: num },
    { name: 'font_size', selector: num },
    { name: 'icon_size', selector: num },
  ] },
];

const withAppearance = (fields) => [...fields, ...APPEARANCE];

const SCHEMAS = {
  'transformers-status-card': withAppearance([
    { name: 'title', selector: text },
    { name: 'entities', selector: entMulti() },
    { name: 'message', selector: text },
    { name: 'show_message', selector: bool },
    { name: 'theme', selector: text },
  ]),
  'transformers-sensor-card': withAppearance([
    { name: 'entity', selector: ent('sensor') },
    { name: 'name', selector: text },
    { name: 'unit', selector: text },
    { name: 'max', selector: num },
    { name: 'show_graph', selector: bool },
  ]),
  'transformers-button-card': withAppearance([
    { name: 'title', selector: text },
    { name: 'columns', selector: num },
  ]),
  'transformers-text-card': withAppearance([
    { name: 'title', selector: text },
    { name: 'content', selector: text },
    { name: 'entity', selector: ent() },
    { name: 'state_content', selector: bool },
    { name: 'align', selector: sel('left', 'center', 'right') },
    { name: 'size', selector: sel('small', 'medium', 'large') },
    { name: 'typing_effect', selector: bool },
    { name: 'show_prompt', selector: bool },
  ]),
  'transformers-gauge-card': withAppearance([
    { name: 'entity', selector: ent('sensor') },
    { name: 'name', selector: text },
    { name: 'unit', selector: text },
    { type: 'grid', name: '', schema: [
      { name: 'min', selector: num },
      { name: 'max', selector: num },
      { name: 'decimals', selector: num },
    ] },
  ]),
  'transformers-clock-card': withAppearance([
    { name: 'title', selector: text },
    { name: 'format_', selector: sel('12h', '24h') },
    { name: 'show_seconds', selector: bool },
    { name: 'show_date', selector: bool },
    { name: 'show_timezone', selector: bool },
  ]),
  'transformers-glance-card': withAppearance([
    { name: 'title', selector: text },
    { name: 'entities', selector: entMulti() },
    { name: 'columns', selector: num },
    { name: 'show_name', selector: bool },
  ]),
  'transformers-light-card': withAppearance([
    { name: 'entity', selector: ent('light') },
    { name: 'name', selector: text },
    { name: 'icon', selector: { icon: {} } },
  ]),
  'transformers-picture-card': withAppearance([
    { name: 'title', selector: text },
    { name: 'entity', selector: ent('camera') },
    { name: 'image', selector: text },
    { name: 'caption', selector: text },
    { name: 'show_timestamp', selector: bool },
    { name: 'camera_refresh_interval', selector: num },
  ]),
  'transformers-weather-card': withAppearance([
    { name: 'entity', selector: ent('weather') },
    { name: 'name', selector: text },
    { name: 'show_forecast', selector: bool },
    { name: 'forecast_days', selector: num },
  ]),
  'transformers-alarm-card': withAppearance([
    { name: 'title', selector: text },
    { name: 'entity', selector: ent('alarm_control_panel') },
    { name: 'show_keypad', selector: bool },
  ]),
  'transformers-background-card': withAppearance([
    { name: 'title', selector: text },
  ]),
};

const LABELS = {
  format_: 'Time format',
  show_graph: 'Show graph',
  show_message: 'Show message',
  show_forecast: 'Show forecast',
  forecast_days: 'Forecast days',
  show_timestamp: 'Show timestamp',
  camera_refresh_interval: 'Camera refresh (seconds)',
  show_keypad: 'Show keypad',
  show_name: 'Show name',
  show_seconds: 'Show seconds',
  show_date: 'Show date',
  show_timezone: 'Show timezone',
  state_content: 'Show entity state',
  typing_effect: 'Typing effect',
  show_prompt: 'Show prompt',
  font_style: 'Font',
  hide_title: 'Hide card title',
  width: 'Width (px or CSS, e.g. 100%)',
  height: 'Height (px)',
  font_size: 'Font size (px)',
  icon_size: 'Icon size (px)',
};

class TransformersCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.computeLabel = (schema) =>
        LABELS[schema.name] ||
        (schema.name.charAt(0).toUpperCase() + schema.name.slice(1)).replace(/_/g, ' ');
      this._form.addEventListener('value-changed', (ev) => {
        ev.stopPropagation();
        const config = { ...this._config, ...ev.detail.value };
        this.dispatchEvent(
          new CustomEvent('config-changed', {
            detail: { config },
            bubbles: true,
            composed: true,
          })
        );
      });
      this.appendChild(this._form);
    }
    const type = String(this._config.type || '').replace(/^custom:/, '');
    this._form.hass = this._hass;
    this._form.schema = SCHEMAS[type] || [{ name: 'title', selector: text }];
    this._form.data = this._config;
  }
}

if (!customElements.get('transformers-card-editor')) {
  customElements.define('transformers-card-editor', TransformersCardEditor);
}

export { TransformersCardEditor };
