import { html, css } from 'lit';
import { TransformersBaseCard, baseStyles, isAvailableEntity, pickStubEntities } from './base-card.js';

class TransformersButtonCard extends TransformersBaseCard {
  static get styles() {
    return [
      baseStyles,
      css`
        .buttons-container {
          display: grid;
          gap: 12px;
        }

        .buttons-container.columns-1 { grid-template-columns: 1fr; }
        .buttons-container.columns-2 { grid-template-columns: repeat(2, 1fr); }
        .buttons-container.columns-3 { grid-template-columns: repeat(3, 1fr); }

        .button {
          padding: 16px;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.3) 0%, rgba(30, 58, 138, 0.2) 100%);
          border: 2px solid var(--transformers-border-color);
          color: var(--transformers-text-color);
          font-family: var(--transformers-resolved-font-family);
          font-size: 0.9em;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }

        .button:hover {
          box-shadow: 0 0 15px var(--transformers-glow-color);
          transform: translateY(-2px);
        }

        .button.active {
          background: linear-gradient(135deg, var(--transformers-border-color) 0%, var(--transformers-secondary-color) 100%);
          box-shadow: 0 0 20px var(--transformers-glow-color);
        }

        .button.status-warning {
          border-color: var(--transformers-accent-color);
        }

        .button.status-error {
          border-color: var(--transformers-primary-color);
        }

        .button-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          font-size: 1.2em;
        }

        .button-icon ha-icon {
          --mdc-icon-size: 1.2em;
        }

        .button-state {
          display: block;
          font-size: 0.75em;
          margin-top: 6px;
          opacity: 0.8;
          letter-spacing: 1px;
        }
      `,
    ];
  }

  render() {
    if (!this.config) {
      return html``;
    }

    const title = this.config.title || 'CONTROL PANEL';
    const columns = Math.min(Math.max(this.config.columns || 1, 1), 3);
    const buttons = this.config.buttons || [];

    return html`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${title}</div>
          <div class="buttons-container columns-${columns}">
            ${buttons.map((buttonConfig) => this._renderButton(buttonConfig))}
          </div>
        </div>
      </div>
    `;
  }

  _renderButton(buttonConfig) {
    const entity = this._getEntity(buttonConfig.entity);
    const icon = this._resolveIcon(entity, buttonConfig.icon);
    const stateText = entity ? this._getEntityStateText(entity) : '';
    const statusClass = entity ? this._getSeverityClass(entity) : 'status-inactive';
    const isActive = entity ? this._isActiveState(entity) : false;

    return html`
      <button class="button ${statusClass} ${isActive ? 'active' : ''}" @click=${() => this._handleButtonClick(buttonConfig)}>
        ${icon ? html`<span class="button-icon">${this._renderIcon(icon, 'button-icon')}</span>` : ''}
        ${buttonConfig.name || this._getEntityName(entity, 'BUTTON')}
        ${buttonConfig.show_state && stateText ? html`<span class="button-state">${stateText}</span>` : ''}
      </button>
    `;
  }

  _handleButtonClick(buttonConfig) {
    if (buttonConfig.tap_action) {
      this._handleTapAction(buttonConfig.tap_action, buttonConfig);
      return;
    }

    if (buttonConfig.service) {
      this._callService(buttonConfig.service, buttonConfig.service_data || {});
      return;
    }

    if (!buttonConfig.entity) {
      return;
    }

    const action = buttonConfig.action || 'toggle';
    if (action === 'toggle') {
      this._callService('homeassistant.toggle', { entity_id: buttonConfig.entity });
    } else if (action === 'turn_on') {
      this._callService('homeassistant.turn_on', { entity_id: buttonConfig.entity });
    } else if (action === 'turn_off') {
      this._callService('homeassistant.turn_off', { entity_id: buttonConfig.entity });
    } else if (action === 'more-info') {
      this._openMoreInfo(buttonConfig.entity);
    }
  }

  _handleTapAction(action, buttonConfig) {
    if (action.action === 'navigate') {
      this._navigate(action.navigation_path);
    } else if (action.action === 'url') {
      window.open(action.url_path, '_blank', 'noopener');
    } else if (action.action === 'more-info' && buttonConfig.entity) {
      this._openMoreInfo(buttonConfig.entity);
    } else if (action.action === 'call-service') {
      this._callService(action.service, action.service_data || {});
    } else if (action.action === 'toggle' && buttonConfig.entity) {
      this._callService('homeassistant.toggle', { entity_id: buttonConfig.entity });
    }
  }

  static getStubConfig(hass, entities = [], entitiesFallback = []) {
    const selectedEntities = pickStubEntities(hass, entities, entitiesFallback, {
      count: 2,
      domains: ['light', 'switch', 'fan', 'cover', 'lock', 'media_player', 'input_boolean', 'climate'],
      filter: isAvailableEntity,
    });

    const buttons = selectedEntities.length
      ? selectedEntities.map((entityId) => ({ entity: entityId, show_state: true }))
      : [
          { name: 'ILLUMINATION', show_state: true },
          { name: 'BEVERAGE SYS', show_state: true },
        ];

    return {
      type: 'custom:transformers-button-card',
      title: 'CONTROL PANEL',
      columns: Math.min(Math.max(buttons.length, 1), 2),
      buttons,
      font_style: 'theme',
    };
  }
}

customElements.define('transformers-button-card', TransformersButtonCard);