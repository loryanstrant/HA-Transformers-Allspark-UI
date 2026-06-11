import { html } from 'lit';
import { TransformersBaseCard } from './base-card.js';

/**
 * A full-area Transformers-styled backdrop. Renders only the card frame
 * (gradient, border, grid, glow) plus an optional title — nothing else — so it
 * can sit behind other cards. Give it a `height` (and/or `width`) to fill the
 * area, then place transparent-background cards over the top with a layout card
 * (e.g. custom:layout-card / stack-in-card / card_mod positioning).
 */
class TransformersBackgroundCard extends TransformersBaseCard {
  render() {
    if (!this.config) {
      return html``;
    }
    const title = this.config.title;
    return html`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          ${title ? html`<div class="card-header">${title}</div>` : ''}
        </div>
      </div>
    `;
  }

  getCardSize() {
    const raw = this.config && this.config.height;
    if (raw) {
      const px = Number(String(raw).replace(/[^0-9.]/g, ''));
      if (!Number.isNaN(px) && px > 0) {
        return Math.max(1, Math.round(px / 50));
      }
    }
    return 8;
  }

  static getStubConfig() {
    return {
      type: 'custom:transformers-background-card',
      title: '',
      height: 400,
      font_style: 'theme',
    };
  }
}

customElements.define('transformers-background-card', TransformersBackgroundCard);
