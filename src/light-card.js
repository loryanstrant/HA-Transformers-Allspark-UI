import { html, css } from 'lit';
import { TransformersBaseCard, baseStyles, isAvailableEntity, pickStubEntity } from './base-card.js';

const COLOR_MODES = ['rgb', 'rgbw', 'rgbww', 'hs', 'xy'];

class TransformersLightCard extends TransformersBaseCard {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _expanded: { state: true },
    };
  }

  constructor() {
    super();
    this._expanded = false;
  }

  static get styles() {
    return [
      baseStyles,
      css`
        .light-container {
          padding: 16px;
        }

        .light-status {
          text-align: center;
          margin-bottom: 20px;
        }

        .light-icon {
          font-size: 3em;
          margin-bottom: 12px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .light-icon ha-icon {
          /* Fixed px (em would compound on the 3em container); icon_size wins. */
          --mdc-icon-size: var(--tfx-icon-size, 48px);
        }

        .light-icon.on {
          filter: drop-shadow(0 0 15px var(--transformers-accent-color));
          color: var(--transformers-accent-color);
        }

        .light-name {
          font-size: 1.1em;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .light-state {
          font-size: 0.9em;
          opacity: 0.8;
        }

        .toggle-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.3) 0%, rgba(30, 58, 138, 0.2) 100%);
          border: 2px solid var(--transformers-border-color);
          color: var(--transformers-text-color);
          font-family: var(--transformers-resolved-font-family);
          font-size: 1em;
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }

        .toggle-button.on {
          background: linear-gradient(135deg, var(--transformers-border-color) 0%, var(--transformers-secondary-color) 100%);
        }

        .expand-toggle {
          width: 100%;
          margin-top: 12px;
          padding: 8px;
          background: transparent;
          border: 1px solid var(--transformers-border-color);
          color: var(--transformers-text-color);
          font-family: var(--transformers-resolved-font-family);
          font-size: 0.8em;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
        }

        .controls {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .control-label {
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
        }

        .tfx-slider {
          width: 100%;
          height: 8px;
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          border: 1px solid var(--transformers-border-color);
        }

        .tfx-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: var(--transformers-border-color);
          cursor: pointer;
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
          box-shadow: 0 0 8px var(--transformers-glow-color);
        }

        .temp-slider {
          background: linear-gradient(90deg, #ff8b29 0%, #ffd9a0 40%, #ffffff 60%, #cfe0ff 100%);
        }

        .color-swatch {
          width: 100%;
          height: 40px;
          border: 1px solid var(--transformers-border-color);
          background: transparent;
          cursor: pointer;
          padding: 0;
        }
      `,
    ];
  }

  render() {
    if (!this.config) {
      return html``;
    }

    const entity = this._getEntity(this.config.entity);
    if (!entity) {
      return html`
        <div class="${this._cardClasses()}">
          <div class="card-content">
            <div class="card-header">${this.config.name || 'LIGHT ERROR'}</div>
            <div class="light-container"><div class="light-status">UNAVAILABLE</div></div>
          </div>
        </div>
      `;
    }

    const attrs = entity.attributes || {};
    const isOn = String(entity.state).toLowerCase() === 'on';
    const modes = attrs.supported_color_modes || [];
    const brightnessPercent = Math.round(((attrs.brightness || 0) / 255) * 100);
    const supportsBrightness =
      attrs.brightness !== undefined ||
      modes.some((m) => m !== 'onoff') ||
      ((attrs.supported_features || 0) & 1) !== 0;
    const supportsColorTemp = modes.includes('color_temp');
    const supportsColor = modes.some((m) => COLOR_MODES.includes(m));
    const minK = attrs.min_color_temp_kelvin || 2000;
    const maxK = attrs.max_color_temp_kelvin || 6535;
    const curK = attrs.color_temp_kelvin || maxK;
    const hex = this._rgbToHex(attrs.rgb_color || [255, 255, 255]);
    const hasControls = supportsBrightness || supportsColorTemp || supportsColor;
    const icon = this._resolveIcon(entity, this.config.icon);
    const name = this._getEntityName(entity, this.config.name);

    return html`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${name}</div>
          <div class="light-container">
            <div class="light-status">
              <div class="light-icon ${isOn ? 'on' : ''}">${this._renderIcon(icon, 'light-icon')}</div>
              <div class="light-name">${name}</div>
              <div class="light-state">${this._getEntityStateText(entity, { includeUnit: false })}</div>
            </div>
            <button type="button" class="toggle-button ${isOn ? 'on' : ''}" @click=${() => this._toggleLight()}>
              ${isOn ? 'TURN OFF' : 'TURN ON'}
            </button>
            ${isOn && hasControls
              ? html`
                  <button type="button" class="expand-toggle" @click=${() => this._toggleExpand()}>
                    ${this._expanded ? '▲ Hide controls' : '▼ Controls'}
                  </button>
                  ${this._expanded
                    ? html`
                        <div class="controls">
                          ${supportsBrightness
                            ? html`
                                <div>
                                  <div class="control-label">
                                    <span>Brightness</span><span>${brightnessPercent}%</span>
                                  </div>
                                  <input
                                    type="range"
                                    class="tfx-slider"
                                    min="1"
                                    max="100"
                                    .value=${String(brightnessPercent)}
                                    @input=${(e) => this._setBrightness(e.target.value)}
                                  />
                                </div>
                              `
                            : ''}
                          ${supportsColorTemp
                            ? html`
                                <div>
                                  <div class="control-label">
                                    <span>Colour temperature</span><span>${curK}K</span>
                                  </div>
                                  <input
                                    type="range"
                                    class="tfx-slider temp-slider"
                                    min=${minK}
                                    max=${maxK}
                                    step="50"
                                    .value=${String(curK)}
                                    @input=${(e) => this._setColorTemp(e.target.value)}
                                  />
                                </div>
                              `
                            : ''}
                          ${supportsColor
                            ? html`
                                <div>
                                  <div class="control-label"><span>Colour</span></div>
                                  <input
                                    type="color"
                                    class="color-swatch"
                                    .value=${hex}
                                    @input=${(e) => this._setRgb(e.target.value)}
                                  />
                                </div>
                              `
                            : ''}
                        </div>
                      `
                    : ''}
                `
              : ''}
          </div>
        </div>
      </div>
    `;
  }

  _toggleLight() {
    this._callService('light.toggle', { entity_id: this.config.entity });
  }

  _toggleExpand() {
    this._expanded = !this._expanded;
    this.requestUpdate();
  }

  _setBrightness(value) {
    this._callService('light.turn_on', {
      entity_id: this.config.entity,
      brightness_pct: Number(value),
    });
  }

  _setColorTemp(value) {
    this._callService('light.turn_on', {
      entity_id: this.config.entity,
      color_temp_kelvin: Number(value),
    });
  }

  _setRgb(hex) {
    this._callService('light.turn_on', {
      entity_id: this.config.entity,
      rgb_color: this._hexToRgb(hex),
    });
  }

  _rgbToHex(rgb) {
    const h = (n) => Math.max(0, Math.min(255, Number(n) || 0)).toString(16).padStart(2, '0');
    return `#${h(rgb[0])}${h(rgb[1])}${h(rgb[2])}`;
  }

  _hexToRgb(hex) {
    const m = String(hex).replace('#', '');
    return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
  }

  static getStubConfig(hass, entities = [], entitiesFallback = []) {
    const entity = pickStubEntity(hass, entities, entitiesFallback, {
      domains: ['light'],
      filter: isAvailableEntity,
    });

    return {
      type: 'custom:transformers-light-card',
      ...(entity ? { entity } : { entity: 'light.living_room', name: 'MAIN ILLUMINATION' }),
      font_style: 'theme',
    };
  }
}

customElements.define('transformers-light-card', TransformersLightCard);
