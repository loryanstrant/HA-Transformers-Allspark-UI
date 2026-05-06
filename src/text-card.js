import { html, css } from 'lit';
import { TransformersBaseCard, baseStyles, isAvailableEntity, pickStubEntity } from './base-card.js';

class TransformersTextCard extends TransformersBaseCard {
  static get styles() {
    return [
      baseStyles,
      css`
        .text-content {
          padding: 12px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--transformers-secondary-color);
          font-family: var(--transformers-resolved-font-family);
          line-height: 1.8;
        }

        .text-content.size-small { font-size: 0.85em; }
        .text-content.size-medium { font-size: 1em; }
        .text-content.size-large { font-size: 1.2em; }

        .text-content.align-left { text-align: left; }
        .text-content.align-center { text-align: center; }
        .text-content.align-right { text-align: right; }

        .text-prompt {
          color: var(--transformers-accent-color);
          margin-right: 8px;
        }

        .text-line {
          margin: 4px 0;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 2s steps(40);
        }
      `,
    ];
  }

  render() {
    if (!this.config) {
      return html``;
    }

    const title = this.config.title || 'MESSAGE';
    const size = this.config.size || 'medium';
    const align = this.config.align || 'left';
    const showPrompt = this.config.show_prompt !== false;
    const typingEffect = this.config.typing_effect || false;
    const content = this._resolveContent();
    const lines = content.split('\n');

    return html`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${title}</div>
          <div class="text-content size-${size} align-${align} ${typingEffect ? 'typing-effect' : ''}">
            ${lines.map(
              (line) => html`
                <div class="text-line">
                  ${showPrompt && line.trim() ? html`<span class="text-prompt">></span>` : ''}
                  ${line}
                </div>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }

  _resolveContent() {
    let content = this.config.content || '';
    const entity = this._getEntity(this.config.entity);

    if (entity && this.config.state_content) {
      content = this.config.state_content[entity.state] || this.config.state_content.default || content;
    }

    if (!entity || !content) {
      return content;
    }

    let resolved = content
      .replace(/\{\{state\}\}/g, entity.state)
      .replace(/\{\{friendly_name\}\}/g, entity.attributes.friendly_name || this.config.entity)
      .replace(/\{\{unit\}\}/g, entity.attributes.unit_of_measurement || '');

    const attrMatches = Array.from(resolved.matchAll(/\{\{attribute\.([^}]+)\}\}/g));
    for (const match of attrMatches) {
      const attrName = match[1];
      const attrValue = entity.attributes[attrName] ?? '';
      resolved = resolved.replace(match[0], String(attrValue));
    }

    return resolved;
  }

  static getStubConfig(hass, entities = [], entitiesFallback = []) {
    const entity = pickStubEntity(hass, entities, entitiesFallback, {
      domains: ['sensor', 'weather', 'binary_sensor', 'light', 'alarm_control_panel'],
      filter: isAvailableEntity,
    });

    return {
      type: 'custom:transformers-text-card',
      title: 'SYSTEM NOTICE',
      ...(entity
        ? {
            entity,
            content: '{{friendly_name}} :: {{state}} {{unit}}',
          }
        : {
            content: 'ATTENTION: ALL AUTOBOTS\nMISSION BRIEFING AT 0800 HOURS',
          }),
      size: 'medium',
      align: 'left',
      show_prompt: true,
      typing_effect: false,
      font_style: 'theme',
    };
  }
}

customElements.define('transformers-text-card', TransformersTextCard);