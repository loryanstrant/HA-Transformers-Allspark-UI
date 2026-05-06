import { html, css } from 'lit';
import { TransformersBaseCard, baseStyles, isAvailableEntity, pickStubEntities } from './base-card.js';

class TransformersGlanceCard extends TransformersBaseCard {
  static get styles() {
    return [
      baseStyles,
      css`
        .glance-grid {
          display: grid;
          gap: 16px;
        }

        .glance-grid.columns-2 { grid-template-columns: repeat(2, 1fr); }
        .glance-grid.columns-3 { grid-template-columns: repeat(3, 1fr); }
        .glance-grid.columns-4 { grid-template-columns: repeat(4, 1fr); }
        .glance-grid.columns-5 { grid-template-columns: repeat(5, 1fr); }

        .glance-item {
          text-align: center;
          padding: 16px;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.1) 0%, rgba(30, 58, 138, 0.05) 100%);
          border: 1px solid var(--transformers-border-color);
          clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .glance-item:hover {
          box-shadow: 0 0 10px var(--transformers-glow-color);
        }

        .glance-icon {
          margin-bottom: 8px;
          font-size: 1.8em;
        }

        .glance-icon ha-icon {
          --mdc-icon-size: 1.8em;
        }

        .glance-name {
          font-size: 0.75em;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
          opacity: 0.8;
        }

        .glance-state {
          font-size: 1.05em;
          font-weight: bold;
          font-family: var(--transformers-resolved-font-family);
          margin-top: 8px;
        }
      `,
    ];
  }

  render() {
    if (!this.config) {
      return html``;
    }

    const entities = this.config.entities || [];
    const columns = Math.min(Math.max(this.config.columns || Math.min(Math.max(entities.length, 2), 4), 2), 5);

    return html`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${this.config.title || 'SYSTEM GLANCE'}</div>
          <div class="glance-grid columns-${columns}">
            ${entities.map((entityConfig) => this._renderEntity(entityConfig))}
          </div>
        </div>
      </div>
    `;
  }

  _renderEntity(entityConfig) {
    const normalized = this._normalizeEntityConfig(entityConfig);
    const entity = this._getEntity(normalized.entity);

    if (!entity) {
      return html`
        <div class="glance-item">
          <div class="glance-state">N/A</div>
          ${this.config.show_name !== false ? html`<div class="glance-name">${normalized.entity || 'UNKNOWN'}</div>` : ''}
        </div>
      `;
    }

    const icon = this._resolveIcon(entity, normalized.icon);
    return html`
      <div class="glance-item" @click=${() => this._openMoreInfo(normalized.entity)}>
        <div class="glance-icon ${this._getSeverityClass(entity)}">${this._renderIcon(icon, 'glance-icon')}</div>
        <div class="glance-state">${this._getEntityStateText(entity)}</div>
        ${this.config.show_name !== false
          ? html`<div class="glance-name">${this._getEntityName(entity, normalized.name)}</div>`
          : ''}
      </div>
    `;
  }

  static getStubConfig(hass, entities = [], entitiesFallback = []) {
    const selectedEntities = pickStubEntities(hass, entities, entitiesFallback, {
      count: 4,
      domains: ['sensor', 'binary_sensor', 'light', 'switch', 'lock', 'device_tracker', 'person', 'weather'],
      filter: isAvailableEntity,
    });

    return {
      type: 'custom:transformers-glance-card',
      title: 'SYSTEM OVERVIEW',
      entities: selectedEntities.length
        ? selectedEntities
        : ['sensor.temperature', 'sensor.humidity', 'light.living_room', 'binary_sensor.motion'],
      columns: Math.min(Math.max(selectedEntities.length || 2, 2), 4),
      show_name: true,
      font_style: 'theme',
    };
  }
}

customElements.define('transformers-glance-card', TransformersGlanceCard);