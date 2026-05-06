import { html, css } from 'lit';
import { TransformersBaseCard, baseStyles, isNumericEntity, pickStubEntity } from './base-card.js';

class TransformersSensorCard extends TransformersBaseCard {
  static get styles() {
    return [
      baseStyles,
      css`
        .sensor-display {
          text-align: center;
          padding: 20px;
        }

        .sensor-value {
          font-size: 3em;
          font-weight: bold;
          font-family: var(--transformers-resolved-font-family);
          text-shadow: 0 0 10px var(--transformers-glow-color);
          margin: 16px 0;
        }

        .sensor-unit {
          font-size: 0.38em;
          margin-left: 8px;
          opacity: 0.82;
        }

        .progress-container {
          margin-top: 20px;
          background: rgba(0, 0, 0, 0.4);
          height: 24px;
          border: 1px solid var(--transformers-border-color);
          position: relative;
          overflow: hidden;
          clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--transformers-border-color), var(--transformers-accent-color));
          transition: width 0.3s ease;
          box-shadow: 0 0 10px var(--transformers-glow-color);
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
            <div class="card-header">${this.config.name || 'SENSOR ERROR'}</div>
            <div class="sensor-display">
              <div class="sensor-value">UNAVAILABLE</div>
            </div>
          </div>
        </div>
      `;
    }

    const name = this._getEntityName(entity, this.config.name);
    const numericValue = Number(entity.state);
    const unit = this.config.unit || entity.attributes.unit_of_measurement || '';
    const showGraph = this.config.show_graph !== false;
    const max = Number(this.config.max || 100);
    const percentage = !Number.isNaN(numericValue) && max > 0
      ? Math.max(0, Math.min((numericValue / max) * 100, 100))
      : 0;

    return html`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${name}</div>
          <div class="sensor-display">
            <div class="sensor-value">
              ${entity.state}
              ${unit ? html`<span class="sensor-unit">${unit}</span>` : ''}
            </div>
            ${showGraph
              ? html`
                  <div class="progress-container">
                    <div class="progress-bar" style="width: ${percentage}%"></div>
                  </div>
                `
              : ''}
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
      type: 'custom:transformers-sensor-card',
      ...(entity ? { entity } : { entity: 'sensor.cpu_temperature', name: 'CORE TEMPERATURE' }),
      show_graph: true,
      max,
      font_style: 'theme',
    };
  }
}

customElements.define('transformers-sensor-card', TransformersSensorCard);