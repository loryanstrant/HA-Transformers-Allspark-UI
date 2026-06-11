import { html, css } from 'lit';
import { TransformersBaseCard, baseStyles } from './base-card.js';

/**
 * A full-area Transformers-styled backdrop. Renders only the card frame
 * (gradient, border, grid, glow) plus an optional title header — no body
 * content — and fills the viewport height by default, so it can sit behind
 * other cards. Override the height with the `height` option; place transparent
 * cards over the top with a layout card (custom:layout-card / stack-in-card /
 * card_mod positioning).
 */
class TransformersBackgroundCard extends TransformersBaseCard {
  static get styles() {
    return [
      baseStyles,
      css`
        :host {
          display: block;
        }
        /* Fill the whole page by default; override with the height option. */
        .card {
          min-height: var(--tfx-card-height, 100vh);
        }
        .card-content {
          min-height: inherit;
        }
      `,
    ];
  }

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
    return 12; // full-page default
  }

  static getStubConfig() {
    // No height -> fills the viewport (full-page backdrop). Add a height to
    // make it a fixed size instead.
    return {
      type: 'custom:transformers-background-card',
      title: '',
      font_style: 'theme',
    };
  }
}

customElements.define('transformers-background-card', TransformersBackgroundCard);
