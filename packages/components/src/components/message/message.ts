import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { messageStyles } from './message.styles.js';
import '../button/button.js';

export type MessageLayout = 'vertical' | 'horizontal';

// Close icon — circle-close-fill (matches Figma)
function iconClose() {
  return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="24" height="24">
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
  </svg>`;
}

/**
 * Mini*S Message Component
 *
 * A notification card that shows a title, optional description, optional visual thumbnail,
 * and an optional close/dismiss button.
 *
 * @slot visual   - Thumbnail image or icon (shown when the `visual` attribute is set)
 * @slot title    - The main message headline
 * @slot          - (default) Supplementary description text
 *
 * @fires close   - Dispatched when the close button is clicked
 *
 * @example
 * ```html
 * <!-- Vertical (default) -->
 * <minis-message>
 *   <img slot="visual" src="thumb.jpg" alt="" />
 *   <span slot="title">Pokračovat v posledním hledání</span>
 *   Dotaz, který může být dost komplexní.
 * </minis-message>
 *
 * <!-- Horizontal, no close button -->
 * <minis-message layout="horizontal" closable="false">
 *   <img slot="visual" src="thumb.jpg" alt="" />
 *   <span slot="title">Pokračovat v posledním hledání</span>
 *   Dotaz, který může být dost komplexní.
 * </minis-message>
 *
 * <!-- Without visual -->
 * <minis-message visual="false">
 *   <span slot="title">System maintenance tonight</span>
 *   We'll be down for 30 minutes at midnight.
 * </minis-message>
 * ```
 */
@customElement('minis-message')
export class MinisMessage extends LitElement {
  static styles = messageStyles;

  /** Card layout direction */
  @property({ type: String, reflect: true })
  layout: MessageLayout = 'vertical';

  /** Show the visual (thumbnail) slot */
  @property({ type: Boolean, reflect: true })
  visual = true;

  /** Show the close / dismiss button */
  @property({ type: Boolean, reflect: true })
  closable = true;

  private _handleClose() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="message">
        <div class="container">
          ${this.visual ? html`
            <div class="visual">
              <slot name="visual"></slot>
            </div>
          ` : ''}
          <div class="content">
            <slot name="title" class="title"></slot>
            <slot class="description"></slot>
          </div>
        </div>
        ${this.closable ? html`
          <div class="close">
            <minis-button
              variant="tertiary"
              size="md"
              icon-only
              aria-label="Close"
              @click=${this._handleClose}
            >
              <span slot="icon">${iconClose()}</span>
            </minis-button>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-message': MinisMessage;
  }
}
