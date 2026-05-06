import { html, css } from 'lit';
import { TransformersBaseCard, baseStyles, isNumericEntity, pickStubEntity } from './base-card.js';

class TransformersGaugeCard extends TransformersBaseCard {
  static get styles() {
    return [
      baseStyles,
      css`
        .gauge-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        .gauge-svg {
          width: 200px;
          height: 200px;
        }

        .gauge-background {
          fill: none;
          stroke: rgba(255, 255, 255, 0.1);
          stroke-width: 12;
        }

        .gauge-progress {
          fill: none;
          stroke: var(--transformers-border-color);
          stroke-width: 12;
          stroke-linecap: round;
          filter: drop-shadow(0 0 8px var(--transformers-glow-color));
          transition: stroke-dashoffset 0.5s ease;
        }

        .gauge-progress.severity-yellow {
          stroke: var(--transformers-accent-color);
        }

        .gauge-progress.severity-red {
          stroke: #dc2626;
        }

        .gauge-value {
          font-size: 2.5em;
          font-weight: bold;
          font-family: var(--transformers-resolved-font-family);
          text-shadow: 0 0 10px var(--transformers-glow-color);
          margin-top: 16px;
        }

        .gauge-unit {
          font-size: 0.4em;
          margin-left: 4px;
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
            <div class="card-header">${this.config.name || 'GAUGE ERROR'}</div>
            <div class="gauge-container"><div class="gauge-value">N/A</div></div>
          </div>
        </div>
      `;
    }

    const name = this._getEntityName(entity, this.config.name);
    const value = Number(entity.state);
    const safeValue = Number.isNaN(value) ? 0 : value;
    const unit = this.config.unit || entity.attributes.unit_of_measurement || '';
    const min = Number(this.config.min ?? 0);
    const max = Number(this.config.max ?? 100);
    const decimals = this.config.decimals !== undefined ? this.config.decimals : 1;
    const gaugeRadius = 80;
    const percentage = max > min ? Math.min(Math.max((safeValue - min) / (max - min), 0), 1) : 0;
    const circumference = 2 * Math.PI * gaugeRadius;
    const strokeDashoffset = circumference * (1 - percentage);

    let severityClass = '';
    if (this.config.severity) {
      if (this.config.severity.red && safeValue >= this.config.severity.red) {
        severityClass = 'severity-red';
      } else if (this.config.severity.yellow && safeValue >= this.config.severity.yellow) {
        severityClass = 'severity-yellow';
      }
    }

    return html`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${name}</div>
          <div class="gauge-container">
            <svg class="gauge-svg" viewBox="0 0 200 200">
              <circle class="gauge-background" cx="100" cy="100" r="${gaugeRadius}"></circle>
              <circle
                class="gauge-progress ${severityClass}"
                cx="100"
                cy="100"
                r="${gaugeRadius}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${strokeDashoffset}"
                transform="rotate(-90 100 100)"
              ></circle>
            </svg>
            <div class="gauge-value">${safeValue.toFixed(decimals)}${unit ? html`<span class="gauge-unit">${unit}</span>` : ''}</div>
          </div>
        </div>
      </div>
    `;
  }

  static getStubConfig(hass, entities = [], entitiesFallback = []) {
    const isPreviewNumericEntity = (stateObj) => isNumericEntity(stateObj) && Number(stateObj.state) >= 0;
    const entity =
      pickStubEntity(hass, entities, entitiesFallback, {
        domains: ['sensor', 'number', 'input_number'],
        filter: isPreviewNumericEntity,
      }) || pickStubEntity(hass, entities, entitiesFallback, { filter: isPreviewNumericEntity });

    const stateObj = entity ? hass?.states?.[entity] : undefined;
    const unit = stateObj?.attributes?.unit_of_measurement || '';
    const value = Number(stateObj?.state);
    const max = unit === '%' ? 100 : unit.includes('°') ? 50 : !Number.isNaN(value) ? Math.max(100, Math.ceil(value / 10) * 20) : 100;

    return {
      type: 'custom:transformers-gauge-card',
      ...(entity ? { entity } : { entity: 'sensor.cpu_usage', name: 'CPU LOAD' }),
      min: 0,
      max,
      decimals: 1,
      severity: {
        yellow: Math.round(max * 0.7),
        red: Math.round(max * 0.9),
      },
      font_style: 'theme',
    };
  }
}

customElements.define('transformers-gauge-card', TransformersGaugeCard);