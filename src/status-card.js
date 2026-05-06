import { html, css } from 'lit';
import { TransformersBaseCard, baseStyles, isAvailableEntity, pickStubEntities } from './base-card.js';

class TransformersStatusCard extends TransformersBaseCard {
  static get styles() {
    return [
      baseStyles,
      css`
        .status-grid {
          display: grid;
          gap: 12px;
        }

        .status-item {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          background: linear-gradient(
            90deg,
            rgba(227, 30, 36, 0.1) 0%,
            rgba(30, 58, 138, 0.05) 100%
          );
          border-left: 3px solid var(--transformers-border-color);
          position: relative;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
        }

        .status-label {
          flex: 1;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 0.85em;
          letter-spacing: 1.5px;
          font-family: var(--transformers-resolved-font-family);
        }

        .status-value {
          font-family: var(--transformers-resolved-font-family);
          font-size: 1.05em;
          margin-left: 8px;
          text-align: right;
        }

        .system-status {
          margin-top: 16px;
          padding: 14px;
          border: 2px solid var(--transformers-secondary-color);
          background: linear-gradient(
            135deg,
            rgba(30, 58, 138, 0.2) 0%,
            rgba(227, 30, 36, 0.1) 100%
          );
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }

        .system-status-header {
          font-size: 0.75em;
          margin-bottom: 8px;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .system-message {
          font-family: var(--transformers-resolved-font-family);
          line-height: 1.6;
          font-weight: bold;
        }

        .card.theme-red {
          --transformers-primary-color: #dc2626;
          --transformers-border-color: #dc2626;
          --transformers-glow-color: rgba(220, 38, 38, 0.6);
        }

        .card.theme-yellow {
          --transformers-primary-color: #fbbf24;
          --transformers-border-color: #fbbf24;
          --transformers-glow-color: rgba(251, 191, 36, 0.6);
        }
      `,
    ];
  }

  render() {
    if (!this.config) {
      return html``;
    }

    const entities = this.config.entities || [];
    const title = this.config.title || 'SYSTEM STATUS';
    const message = this.config.message || 'ALL SYSTEMS OPERATIONAL';
    const showMessage = this.config.show_message !== false;
    const theme = this.config.theme || 'autobot';

    return html`
      <div class="${this._cardClasses([`theme-${theme}`])}">
        <div class="card-content">
          <div class="card-header">${title}</div>
          <div class="status-grid">
            ${entities.map((entityConfig) => this._renderEntity(entityConfig))}
          </div>
          ${showMessage
            ? html`
                <div class="system-status">
                  <div class="system-status-header">SYSTEM MESSAGE</div>
                  <div class="system-message">> ${message}</div>
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }

  _renderEntity(entityConfig) {
    const normalized = this._normalizeEntityConfig(entityConfig);
    const entityId = normalized.entity;
    const entity = this._getEntity(entityId);

    if (!entity) {
      return html`
        <div class="status-item">
          <span class="status-indicator status-error"></span>
          <span class="status-label">${entityId || 'UNKNOWN'}</span>
          <span class="status-value">UNAVAILABLE</span>
        </div>
      `;
    }

    return html`
      <div class="status-item" @click=${() => this._openMoreInfo(entityId)}>
        <span class="status-indicator ${this._getSeverityClass(entity)}"></span>
        <span class="status-label">${this._getEntityName(entity, normalized.name)}</span>
        <span class="status-value">${this._getEntityStateText(entity)}</span>
      </div>
    `;
  }

  static getStubConfig(hass, entities = [], entitiesFallback = []) {
    const selectedEntities = pickStubEntities(hass, entities, entitiesFallback, {
      count: 3,
      domains: ['binary_sensor', 'sensor', 'number', 'input_number', 'light', 'switch', 'lock', 'alarm_control_panel'],
      filter: isAvailableEntity,
    });

    return {
      type: 'custom:transformers-status-card',
      title: 'SYSTEM STATUS',
      entities: selectedEntities.length
        ? selectedEntities
        : [
            { entity: 'binary_sensor.front_door', name: 'MAIN ENTRANCE' },
            { entity: 'sensor.temperature_living_room', name: 'AMBIENT TEMP' },
          ],
      message: 'ALL SYSTEMS OPERATIONAL',
      show_message: true,
      theme: 'autobot',
      font_style: 'theme',
    };
  }
}

customElements.define('transformers-status-card', TransformersStatusCard);