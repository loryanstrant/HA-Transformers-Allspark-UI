import { LitElement, css, html } from 'lit';

const DEFAULT_DOMAIN_ICONS = {
  alarm_control_panel: 'mdi:shield-lock',
  binary_sensor: 'mdi:radiobox-marked',
  camera: 'mdi:cctv',
  climate: 'mdi:thermostat',
  cover: 'mdi:garage',
  device_tracker: 'mdi:map-marker',
  fan: 'mdi:fan',
  light: 'mdi:lightbulb',
  lock: 'mdi:lock',
  media_player: 'mdi:play-box-multiple',
  person: 'mdi:account',
  sensor: 'mdi:gauge',
  switch: 'mdi:toggle-switch-variant',
  sun: 'mdi:white-balance-sunny',
  weather: 'mdi:weather-partly-cloudy',
};

const WEATHER_CONDITION_ICONS = {
  'clear-night': 'mdi:weather-night',
  cloudy: 'mdi:weather-cloudy',
  exceptional: 'mdi:alert-octagon',
  fog: 'mdi:weather-fog',
  hail: 'mdi:weather-hail',
  lightning: 'mdi:weather-lightning',
  'lightning-rainy': 'mdi:weather-lightning-rainy',
  partlycloudy: 'mdi:weather-partly-cloudy',
  pouring: 'mdi:weather-pouring',
  rainy: 'mdi:weather-rainy',
  snowy: 'mdi:weather-snowy',
  'snowy-rainy': 'mdi:weather-snowy-rainy',
  sunny: 'mdi:weather-sunny',
  windy: 'mdi:weather-windy',
  'windy-variant': 'mdi:weather-windy-variant',
};

const ALARM_STATE_ICONS = {
  armed_away: 'mdi:shield-lock',
  armed_custom_bypass: 'mdi:shield-edit',
  armed_home: 'mdi:shield-home',
  armed_night: 'mdi:shield-moon',
  armed_vacation: 'mdi:shield-airplane',
  arming: 'mdi:shield-sync',
  disarmed: 'mdi:shield-off',
  pending: 'mdi:shield-alert',
  triggered: 'mdi:shield-alert',
};

const FRIENDLY_STATE_TEXT = {
  armed_away: 'ARMED AWAY',
  armed_custom_bypass: 'ARMED CUSTOM',
  armed_home: 'ARMED HOME',
  armed_night: 'ARMED NIGHT',
  armed_vacation: 'ARMED VACATION',
  clear_night: 'CLEAR NIGHT',
  'clear-night': 'CLEAR NIGHT',
  closed: 'CLOSED',
  disarmed: 'DISARMED',
  home: 'HOME',
  idle: 'IDLE',
  inactive: 'INACTIVE',
  locked: 'LOCKED',
  not_home: 'AWAY',
  off: 'OFF',
  on: 'ON',
  open: 'OPEN',
  pending: 'PENDING',
  playing: 'PLAYING',
  triggered: 'TRIGGERED',
  unavailable: 'UNAVAILABLE',
  unknown: 'UNKNOWN',
  unlocked: 'UNLOCKED',
};

const UNAVAILABLE_STATES = new Set(['unavailable', 'unknown']);

const uniqueValues = (values) => [...new Set(values.filter(Boolean))];

const escapeSvgText = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const getStubCandidates = (hass, entities = [], entitiesFallback = []) => {
  const stateKeys = hass?.states ? Object.keys(hass.states) : [];
  return uniqueValues([...entities, ...entitiesFallback, ...stateKeys]);
};

export const isAvailableEntity = (stateObj) =>
  Boolean(stateObj && !UNAVAILABLE_STATES.has(String(stateObj.state ?? '').toLowerCase()));

export const isNumericEntity = (stateObj) =>
  isAvailableEntity(stateObj) && String(stateObj.state ?? '').trim() !== '' && !Number.isNaN(Number(stateObj.state));

export const pickStubEntity = (
  hass,
  entities = [],
  entitiesFallback = [],
  { domains = [], filter } = {}
) => {
  if (!hass?.states) {
    return undefined;
  }

  for (const entityId of getStubCandidates(hass, entities, entitiesFallback)) {
    const stateObj = hass.states[entityId];
    if (!stateObj) {
      continue;
    }

    const [domain] = entityId.split('.');
    if (domains.length && !domains.includes(domain)) {
      continue;
    }

    if (filter && !filter(stateObj)) {
      continue;
    }

    return entityId;
  }

  return undefined;
};

export const pickStubEntities = (
  hass,
  entities = [],
  entitiesFallback = [],
  { count = 1, domains = [], filter } = {}
) => {
  if (!hass?.states || count < 1) {
    return [];
  }

  const selected = [];
  for (const entityId of getStubCandidates(hass, entities, entitiesFallback)) {
    const stateObj = hass.states[entityId];
    if (!stateObj) {
      continue;
    }

    const [domain] = entityId.split('.');
    if (domains.length && !domains.includes(domain)) {
      continue;
    }

    if (filter && !filter(stateObj)) {
      continue;
    }

    selected.push(entityId);
    if (selected.length >= count) {
      break;
    }
  }

  return selected;
};

export const createPreviewImageDataUri = ({
  title = 'ALLSPARK FEED',
  subtitle = 'SURVEILLANCE CAMERA',
  accent = '#e31e24',
  secondary = '#1e3a8a',
} = {}) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#060914"/>
        <stop offset="100%" stop-color="#121d3a"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${accent}"/>
        <stop offset="100%" stop-color="${secondary}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="450" fill="url(#bg)"/>
    <g opacity="0.18" stroke="${accent}" stroke-width="1">
      <path d="M0 112h800"/>
      <path d="M0 225h800"/>
      <path d="M0 338h800"/>
      <path d="M200 0v450"/>
      <path d="M400 0v450"/>
      <path d="M600 0v450"/>
    </g>
    <rect x="32" y="32" width="736" height="386" rx="18" fill="none" stroke="${accent}" stroke-width="6"/>
    <polygon points="96,96 228,96 266,134 266,246 228,284 96,284 58,246 58,134" fill="url(#accent)" opacity="0.94"/>
    <text x="162" y="208" fill="#ffffff" font-family="Arial, sans-serif" font-size="84" font-weight="800" text-anchor="middle">TF</text>
    <text x="320" y="178" fill="#ffffff" font-family="Arial, sans-serif" font-size="54" font-weight="800">${escapeSvgText(title)}</text>
    <text x="320" y="236" fill="#d8deed" font-family="Arial, sans-serif" font-size="28" letter-spacing="4">${escapeSvgText(subtitle)}</text>
    <text x="320" y="302" fill="#8ea0c5" font-family="Arial, sans-serif" font-size="20" letter-spacing="3">TRANSFORMERS ALLSPARK UI</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const baseStyles = css`
  :host {
    --transformers-primary-color: #e31e24;
    --transformers-secondary-color: #1e3a8a;
    --transformers-accent-color: #fbbf24;
    --transformers-background-color: #0a0e27;
    --transformers-panel-color: #1a1f3a;
    --transformers-border-color: #e31e24;
    --transformers-text-color: #ffffff;
    --transformers-muted-text-color: rgba(255, 255, 255, 0.78);
    --transformers-glow-color: rgba(227, 30, 36, 0.6);
    --transformers-font-g1: 'Transformers G1', 'Arial Black', sans-serif;
    --transformers-font-movie: 'Transformers Movie', 'Arial Black', sans-serif;
    --transformers-theme-font-family: var(--transformers-card-font-family, var(--transformers-font-movie));
    --transformers-theme-header-font: var(--transformers-header-font-family, var(--transformers-theme-font-family));
    --transformers-resolved-font-family: var(--transformers-theme-font-family);
    --transformers-resolved-header-font: var(--transformers-theme-header-font);
    --transformers-grid-opacity: 0.15;
    display: block;
  }

  .card {
    background: linear-gradient(135deg, var(--transformers-background-color) 0%, #0f1632 100%);
    color: var(--transformers-text-color);
    border: 3px solid var(--transformers-border-color);
    border-left: 6px solid var(--transformers-border-color);
    box-shadow:
      0 0 20px var(--transformers-glow-color),
      inset 0 0 30px rgba(227, 30, 36, 0.1),
      inset 4px 0 8px rgba(30, 58, 138, 0.3);
    padding: 20px;
    position: relative;
    overflow: hidden;
    clip-path: polygon(
      0 0,
      calc(100% - 12px) 0,
      100% 12px,
      100% 100%,
      12px 100%,
      0 calc(100% - 12px)
    );
  }

  .card.font-g1 {
    --transformers-resolved-font-family: var(--transformers-font-g1);
    --transformers-resolved-header-font: var(--transformers-font-g1);
  }

  .card.font-movie {
    --transformers-resolved-font-family: var(--transformers-font-movie);
    --transformers-resolved-header-font: var(--transformers-font-movie);
  }

  .card.font-theme {
    --transformers-resolved-font-family: var(--transformers-theme-font-family);
    --transformers-resolved-header-font: var(--transformers-theme-header-font);
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      linear-gradient(90deg, var(--transformers-border-color) 1px, transparent 1px),
      linear-gradient(0deg, var(--transformers-border-color) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: var(--transformers-grid-opacity);
    pointer-events: none;
    z-index: 1;
  }

  .card::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(30, 58, 138, 0.3),
      rgba(30, 58, 138, 0.2)
    );
    pointer-events: none;
    z-index: 1;
  }

  .card-content {
    position: relative;
    z-index: 2;
    font-family: var(--transformers-resolved-font-family);
  }

  .card-header {
    font-family: var(--transformers-resolved-header-font);
    font-size: 1.1em;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--transformers-border-color);
    font-weight: bold;
    text-shadow:
      0 0 10px var(--transformers-glow-color),
      2px 2px 4px rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
  }

  .card-header::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 8px solid var(--transformers-border-color);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    filter: drop-shadow(0 0 4px var(--transformers-glow-color));
  }

  .card-header::after {
    content: '';
    position: absolute;
    right: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, var(--transformers-accent-color), transparent);
  }

  .status-indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 8px;
    position: relative;
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  }

  .status-indicator::before {
    content: '';
    position: absolute;
    inset: 0;
    background: currentColor;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .status-ok {
    color: #10b981;
    filter: drop-shadow(0 0 4px #10b981);
  }

  .status-warning {
    color: var(--transformers-accent-color);
    filter: drop-shadow(0 0 4px var(--transformers-accent-color));
  }

  .status-error {
    color: var(--transformers-primary-color);
    filter: drop-shadow(0 0 4px var(--transformers-primary-color));
  }

  .status-inactive {
    color: rgba(255, 255, 255, 0.55);
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.2));
  }

  .card.theme-decepticon {
    --transformers-primary-color: #7c3aed;
    --transformers-secondary-color: #4c1d95;
    --transformers-accent-color: #a78bfa;
    --transformers-border-color: #7c3aed;
    --transformers-glow-color: rgba(124, 58, 237, 0.6);
  }

  .card.theme-autobot {
    --transformers-primary-color: #e31e24;
    --transformers-secondary-color: #1e3a8a;
    --transformers-border-color: #e31e24;
    --transformers-glow-color: rgba(227, 30, 36, 0.6);
  }

  .transformers-icon,
  .transformers-icon-text {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    filter: drop-shadow(0 0 2px var(--transformers-glow-color));
  }

  .transformers-icon ha-icon,
  .transformers-inline-icon ha-icon {
    --mdc-icon-size: 1em;
    width: 1em;
    height: 1em;
  }

  .blinking-cursor {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .tech-divider {
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--transformers-border-color),
      var(--transformers-accent-color),
      var(--transformers-border-color),
      transparent
    );
    margin: 16px 0;
    position: relative;
  }

  .tech-divider::before,
  .tech-divider::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--transformers-accent-color);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    top: -2px;
  }

  .tech-divider::before {
    left: 0;
  }

  .tech-divider::after {
    right: 0;
  }
`;

export class TransformersBaseCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  // All cards share one visual editor (transformers-card-editor), which picks
  // its form schema from the card type. Defined in editor.js.
  static getConfigElement() {
    return document.createElement('transformers-card-editor');
  }

  setConfig(config) {
    if (!config || typeof config !== 'object') {
      throw new Error('Invalid configuration');
    }
    this.config = config;
  }

  getCardSize() {
    return 3;
  }

  _hasStates() {
    return Boolean(this.hass && this.hass.states);
  }

  _normalizeEntityConfig(entityConfig) {
    if (typeof entityConfig === 'string') {
      return { entity: entityConfig };
    }
    return entityConfig || {};
  }

  _getEntity(entityId) {
    if (!entityId || !this._hasStates()) {
      return undefined;
    }
    return this.hass.states[entityId];
  }

  _getFontStyle(config = this.config) {
    const fontStyle = String(config?.font_style || 'theme').toLowerCase();
    return ['theme', 'g1', 'movie'].includes(fontStyle) ? fontStyle : 'theme';
  }

  _cardClasses(extraClasses = []) {
    const classes = ['card', `font-${this._getFontStyle()}`, ...extraClasses.filter(Boolean)];
    return classes.join(' ');
  }

  _getEntityName(entity, fallbackName = '') {
    return fallbackName || entity?.attributes?.friendly_name || entity?.entity_id || 'UNKNOWN';
  }

  _getFriendlyStateText(state) {
    if (state == null) {
      return 'UNKNOWN';
    }

    const raw = String(state);
    return FRIENDLY_STATE_TEXT[raw] || raw.replace(/[_-]+/g, ' ').toUpperCase();
  }

  _getEntityStateText(entity, { includeUnit = true } = {}) {
    if (!entity) {
      return 'UNAVAILABLE';
    }

    const state = entity.state;
    const unit = includeUnit ? entity.attributes?.unit_of_measurement || '' : '';

    if (state == null || state === '') {
      return 'UNKNOWN';
    }

    const numericValue = Number(state);
    if (!Number.isNaN(numericValue) && String(state).trim() !== '') {
      return `${state}${unit ? ` ${unit}` : ''}`.trim();
    }

    const friendly = this._getFriendlyStateText(state);
    return unit ? `${friendly} ${unit}`.trim() : friendly;
  }

  _getSeverityClass(entity) {
    if (!entity) {
      return 'status-error';
    }

    const state = String(entity.state || '').toLowerCase();
    if (state === 'unavailable' || state === 'unknown' || state === 'problem' || state === 'triggered') {
      return 'status-error';
    }
    if (state.includes('pending') || state.includes('arming') || state.includes('warning') || state === 'low') {
      return 'status-warning';
    }
    if (
      [
        'on',
        'open',
        'active',
        'home',
        'playing',
        'locked',
        'armed_away',
        'armed_home',
        'armed_night',
        'armed_custom_bypass',
        'armed_vacation',
      ].includes(state)
    ) {
      return 'status-ok';
    }
    if (['off', 'closed', 'inactive', 'idle', 'disarmed', 'not_home', 'unlocked'].includes(state)) {
      return 'status-inactive';
    }
    return 'status-ok';
  }

  _isActiveState(entity) {
    return this._getSeverityClass(entity) === 'status-ok';
  }

  _getWeatherIcon(condition) {
    return WEATHER_CONDITION_ICONS[condition] || 'mdi:weather-partly-cloudy';
  }

  _getDefaultIcon(entity) {
    if (!entity?.entity_id) {
      return 'mdi:flash';
    }

    const [domain] = entity.entity_id.split('.');
    const state = String(entity.state || '').toLowerCase();

    if (domain === 'weather') {
      return this._getWeatherIcon(state);
    }

    if (domain === 'alarm_control_panel') {
      return ALARM_STATE_ICONS[state] || DEFAULT_DOMAIN_ICONS[domain];
    }

    if (domain === 'light') {
      return state === 'on' ? 'mdi:lightbulb-on' : 'mdi:lightbulb';
    }

    if (domain === 'binary_sensor') {
      if (state === 'on') {
        return entity.attributes?.device_class === 'motion' ? 'mdi:motion-sensor' : 'mdi:check-circle';
      }
      return entity.attributes?.device_class === 'door' ? 'mdi:door-closed' : 'mdi:radiobox-blank';
    }

    if (domain === 'lock') {
      return state === 'unlocked' ? 'mdi:lock-open-variant' : 'mdi:lock';
    }

    return DEFAULT_DOMAIN_ICONS[domain] || 'mdi:flash';
  }

  _resolveIcon(entity, explicitIcon) {
    if (explicitIcon) {
      return explicitIcon;
    }

    if (entity?.attributes?.icon) {
      return entity.attributes.icon;
    }

    return this._getDefaultIcon(entity);
  }

  _renderIcon(icon, className = 'transformers-icon') {
    if (!icon) {
      return html``;
    }

    if (typeof icon === 'string' && icon.startsWith('mdi:')) {
      return html`<span class="${className} transformers-inline-icon"><ha-icon .icon=${icon}></ha-icon></span>`;
    }

    return html`<span class="${className} transformers-icon-text">${icon}</span>`;
  }

  _openMoreInfo(entityId) {
    if (!entityId) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        bubbles: true,
        composed: true,
        detail: { entityId },
      })
    );
  }

  _callService(service, serviceData = {}) {
    if (!service || !this.hass) {
      return;
    }

    const [domain, serviceName] = service.split('.');
    if (!domain || !serviceName) {
      return;
    }

    this.hass.callService(domain, serviceName, serviceData);
  }

  _navigate(path) {
    if (!path) {
      return;
    }

    window.history.pushState(null, '', path);
    window.dispatchEvent(new CustomEvent('location-changed'));
  }
}