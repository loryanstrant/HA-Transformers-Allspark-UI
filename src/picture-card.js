import { html, css } from 'lit';
import {
  TransformersBaseCard,
  baseStyles,
  createPreviewImageDataUri,
  isAvailableEntity,
  pickStubEntity,
} from './base-card.js';

class TransformersPictureCard extends TransformersBaseCard {
  static get styles() {
    return [
      baseStyles,
      css`
        .picture-container {
          position: relative;
          overflow: hidden;
        }

        .picture-image {
          width: 100%;
          height: auto;
          display: block;
          filter: contrast(1.2) brightness(0.9) sepia(0.1) hue-rotate(-10deg);
          border: 2px solid var(--transformers-border-color);
        }

        .picture-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.1) 0%, rgba(30, 58, 138, 0.1) 100%);
          pointer-events: none;
        }

        .picture-caption {
          margin-top: 12px;
          padding: 8px;
          background: rgba(0, 0, 0, 0.5);
          border-left: 3px solid var(--transformers-border-color);
          font-family: var(--transformers-resolved-font-family);
          font-size: 0.9em;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .picture-timestamp {
          margin-top: 8px;
          font-size: 0.75em;
          opacity: 0.7;
          text-align: right;
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this._syncRefreshTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopRefresh();
  }

  updated(changedProperties) {
    super.updated?.(changedProperties);
    if (changedProperties.has('config')) {
      this._syncRefreshTimer();
    }
  }

  _syncRefreshTimer() {
    this._stopRefresh();
    if (this.config?.camera_refresh_interval) {
      this._refreshInterval = setInterval(() => this.requestUpdate(), this.config.camera_refresh_interval * 1000);
    }
  }

  _stopRefresh() {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
      this._refreshInterval = undefined;
    }
  }

  render() {
    if (!this.config) {
      return html``;
    }

    const title = this.config.title || 'VISUAL FEED';
    const caption = this.config.caption || '';
    const showTimestamp = this.config.show_timestamp || false;
    const imageUrl = this._getImageUrl();
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return html`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${title}</div>
          <div class="picture-container">
            ${imageUrl
              ? html`
                  <img class="picture-image" src="${imageUrl}" alt="${caption || title}" />
                  <div class="picture-overlay"></div>
                `
              : html`<div style="padding: 40px; text-align: center; opacity: 0.5;">NO IMAGE SOURCE</div>`}
          </div>
          ${caption ? html`<div class="picture-caption">> ${caption}</div>` : ''}
          ${showTimestamp ? html`<div class="picture-timestamp">CAPTURED: ${timestamp}</div>` : ''}
        </div>
      </div>
    `;
  }

  _getImageUrl() {
    if (this.config.entity) {
      const entity = this._getEntity(this.config.entity);
      if (entity?.attributes?.entity_picture) {
        const imageUrl = entity.attributes.entity_picture;
        if (this.config.camera_refresh_interval) {
          return `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
        }
        return imageUrl;
      }
    }

    return this.config.image || '';
  }

  static getStubConfig(hass, entities = [], entitiesFallback = []) {
    const entity = pickStubEntity(hass, entities, entitiesFallback, {
      domains: ['camera'],
      filter: (stateObj) => isAvailableEntity(stateObj) && Boolean(stateObj.attributes?.entity_picture),
    });

    const friendlyName = entity ? hass?.states?.[entity]?.attributes?.friendly_name : undefined;

    return {
      type: 'custom:transformers-picture-card',
      title: 'VISUAL FEED',
      ...(entity
        ? {
            entity,
            caption: friendlyName || 'SURVEILLANCE CAMERA 01',
          }
        : {
            image: createPreviewImageDataUri({
              title: 'ALLSPARK FEED',
              subtitle: 'SURVEILLANCE CAMERA',
            }),
            caption: 'SURVEILLANCE CAMERA 01',
          }),
      show_timestamp: true,
      font_style: 'theme',
    };
  }
}

customElements.define('transformers-picture-card', TransformersPictureCard);