import { html, css } from 'lit';
import { TransformersBaseCard, baseStyles, isAvailableEntity, pickStubEntity } from './base-card.js';

class TransformersLightCard extends TransformersBaseCard {
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
          /* The container is font-size:3em, so an em-based icon size compounds
             to ~9x ("far too big"). Use px for a sane fixed size. */
          --mdc-icon-size: 48px;
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

        .brightness-control {
          margin-top: 16px;
        }

        .brightness-label {
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
        }

        .brightness-slider {
          width: 100%;
          height: 8px;
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          border: 1px solid var(--transformers-border-color);
        }

        .brightness-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: var(--transformers-border-color);
          cursor: pointer;
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
          box-shadow: 0 0 8px var(--transformers-glow-color);
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

    const isOn = String(entity.state).toLowerCase() === 'on';
    const brightness = entity.attributes.brightness || 0;
    const brightnessPercent = Math.round((brightness / 255) * 100);
    const supportsBrightness = entity.attributes.brightness !== undefined || ((entity.attributes.supported_features || 0) & 1) !== 0;
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
            <button class="toggle-button ${isOn ? 'on' : ''}" @click=${() => this._toggleLight()}>
              ${isOn ? 'TURN OFF' : 'TURN ON'}
            </button>
            ${isOn && supportsBrightness
              ? html`
                  <div class="brightness-control">
                    <div class="brightness-label">
                      <span>BRIGHTNESS</span>
                      <span>${brightnessPercent}%</span>
                    </div>
                    <input
                      type="range"
                      class="brightness-slider"
                      min="0"
                      max="100"
                      .value=${String(brightnessPercent)}
                      @input=${(event) => this._setBrightness(event.target.value)}
                    />
                  </div>
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

  _setBrightness(value) {
    const brightness = Math.round((Number(value) / 100) * 255);
    this._callService('light.turn_on', {
      entity_id: this.config.entity,
      brightness,
    });
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