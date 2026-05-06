import { html, css } from 'lit';
import { TransformersBaseCard, baseStyles, isAvailableEntity, pickStubEntity } from './base-card.js';

class TransformersAlarmCard extends TransformersBaseCard {
  static get styles() {
    return [
      baseStyles,
      css`
        .alarm-container {
          padding: 16px;
        }

        .alarm-status {
          text-align: center;
          padding: 20px;
          margin-bottom: 20px;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.2) 0%, rgba(30, 58, 138, 0.1) 100%);
          border: 2px solid var(--transformers-border-color);
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }

        .alarm-status.armed {
          border-color: #dc2626;
        }

        .alarm-status.pending {
          border-color: #fbbf24;
        }

        .alarm-status.triggered {
          border-color: #dc2626;
          animation: alarm-flash 1s infinite;
        }

        @keyframes alarm-flash {
          0%, 50% { opacity: 1; }
          25%, 75% { opacity: 0.5; }
        }

        .alarm-state {
          font-size: 2em;
          font-weight: bold;
          font-family: var(--transformers-resolved-header-font);
          text-transform: uppercase;
          letter-spacing: 3px;
          text-shadow: 0 0 10px var(--transformers-glow-color);
        }

        .code-display {
          margin: 16px 0;
          padding: 12px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid var(--transformers-border-color);
          text-align: center;
          font-family: var(--transformers-resolved-font-family);
          font-size: 1.5em;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .keypad {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 16px;
        }

        .key,
        .action-button {
          padding: 14px;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.2) 0%, rgba(30, 58, 138, 0.1) 100%);
          border: 2px solid var(--transformers-border-color);
          color: var(--transformers-text-color);
          font-family: var(--transformers-resolved-font-family);
          font-weight: bold;
          cursor: pointer;
          clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
        }

        .key {
          font-size: 1.3em;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 16px;
        }
      `,
    ];
  }

  constructor() {
    super();
    this._code = '';
  }

  render() {
    if (!this.config) {
      return html``;
    }

    const entity = this._getEntity(this.config.entity);
    const title = this.config.title || 'SECURITY SYSTEM';

    if (!entity) {
      return html`
        <div class="${this._cardClasses()}">
          <div class="card-content">
            <div class="card-header">${title}</div>
            <div class="alarm-container"><div class="alarm-status"><div class="alarm-state">UNAVAILABLE</div></div></div>
          </div>
        </div>
      `;
    }

    const showKeypad = this.config.show_keypad !== false;
    const stateClass = this._getAlarmClass(entity.state);

    return html`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${title}</div>
          <div class="alarm-container">
            <div class="alarm-status ${stateClass}">
              <div class="alarm-state">${this._getFriendlyStateText(entity.state)}</div>
            </div>

            ${showKeypad
              ? html`
                  <div class="code-display">${this._code ? '•'.repeat(this._code.length) : 'ENTER CODE'}</div>
                  <div class="keypad">
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'CLR', 0, 'OK'].map(
                      (key) => html`<button class="key" @click=${() => this._handleKeyPress(key)}>${key}</button>`
                    )}
                  </div>
                `
              : ''}

            <div class="action-buttons">
              ${entity.state === 'disarmed'
                ? html`
                    <button class="action-button" @click=${() => this._armAway()}>ARM AWAY</button>
                    <button class="action-button" @click=${() => this._armHome()}>ARM HOME</button>
                  `
                : html`<button class="action-button" @click=${() => this._disarm()}>DISARM</button>`}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _getAlarmClass(state) {
    if (state === 'triggered') {
      return 'triggered';
    }
    if (String(state).includes('pending') || String(state).includes('arming')) {
      return 'pending';
    }
    if (String(state).includes('armed')) {
      return 'armed';
    }
    return '';
  }

  _handleKeyPress(key) {
    if (key === 'CLR') {
      this._code = '';
    } else if (key !== 'OK') {
      this._code += key.toString();
    }
    this.requestUpdate();
  }

  _armAway() {
    this._callService('alarm_control_panel.alarm_arm_away', {
      entity_id: this.config.entity,
      code: this._code || undefined,
    });
    this._code = '';
    this.requestUpdate();
  }

  _armHome() {
    this._callService('alarm_control_panel.alarm_arm_home', {
      entity_id: this.config.entity,
      code: this._code || undefined,
    });
    this._code = '';
    this.requestUpdate();
  }

  _disarm() {
    this._callService('alarm_control_panel.alarm_disarm', {
      entity_id: this.config.entity,
      code: this._code || undefined,
    });
    this._code = '';
    this.requestUpdate();
  }

  static getStubConfig(hass, entities = [], entitiesFallback = []) {
    const entity = pickStubEntity(hass, entities, entitiesFallback, {
      domains: ['alarm_control_panel'],
      filter: isAvailableEntity,
    });

    return {
      type: 'custom:transformers-alarm-card',
      title: 'SECURITY SYSTEM',
      entity: entity || 'alarm_control_panel.home',
      show_keypad: true,
      font_style: 'theme',
    };
  }
}

customElements.define('transformers-alarm-card', TransformersAlarmCard);