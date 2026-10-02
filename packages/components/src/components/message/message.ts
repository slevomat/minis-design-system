import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { messageStyles } from './message.styles.js';
import '../button/button.js';
import '@minis/icons';

export type MessageLayout = 'vertical' | 'horizontal';

/**
 * Mini*S Message Component
 *
 * A notification card that shows a title, optional description, optional visual thumbnail,
 * and an optional close/dismiss button.
 *
 * @slot visual   - Thumbnail image or icon (omitted entirely with `no-visual`)
 * @slot title    - The main message headline
 * @slot          - (default) Supplementary description text
 *
 * @fires close   - Dispatched when the close button is clicked. Cancelable: unless a listener
 *                  calls `event.preventDefault()`, the message hides itself (sets `hidden`).
 *                  Remove the `hidden` attribute to show it again.
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
 * <minis-message layout="horizontal" no-close>
 *   <img slot="visual" src="thumb.jpg" alt="" />
 *   <span slot="title">Pokračovat v posledním hledání</span>
 *   Dotaz, který může být dost komplexní.
 * </minis-message>
 *
 * <!-- Without visual -->
 * <minis-message no-visual>
 *   <span slot="title">System maintenance tonight</span>
 *   We'll be down for 30 minutes at midnight.
 * </minis-message>
 *
 * <!-- Take over dismissal (e.g. to animate or persist it) -->
 * <script>
 *   msg.addEventListener('close', (e) => {
 *     e.preventDefault();
 *     msg.animate({ opacity: [1, 0] }, 150).finished.then(() => msg.remove());
 *   });
 * </script>
 * ```
 */
@customElement('minis-message')
export class MinisMessage extends LitElement {
  static styles = messageStyles;

  /** Card layout direction */
  @property({ type: String, reflect: true })
  layout: MessageLayout = 'vertical';

  /** Hide the visual (thumbnail) slot — no space is reserved for it */
  @property({ type: Boolean, attribute: 'no-visual', reflect: true })
  noVisual = false;

  /** Hide the close / dismiss button — no space is reserved for it */
  @property({ type: Boolean, attribute: 'no-close', reflect: true })
  noClose = false;

  private _handleClose() {
    const proceed = this.dispatchEvent(
      new CustomEvent('close', { bubbles: true, composed: true, cancelable: true }),
    );
    if (proceed) this.hidden = true;
  }

  render() {
    const closeButton = this.noClose ? '' : html`
      <div class="close">
        <minis-button
          variant="tertiary"
          size="md"
          icon-only
          aria-label="Close"
          @click=${this._handleClose}
        >
          <minis-icon slot="icon" name="circle-close-fill"></minis-icon>
        </minis-button>
      </div>
    `;

    if (this.layout === 'vertical') {
      return html`
        <div class="message">
          ${this.noVisual ? '' : html`
            <div class="visual">
              <slot name="visual"></slot>
            </div>
          `}
          <div class="body">
            <div class="header">
              <slot name="title" class="title"></slot>
              ${closeButton}
            </div>
            <slot class="description"></slot>
          </div>
        </div>
      `;
    }

    return html`
      <div class="message">
        <div class="container">
          ${this.noVisual ? '' : html`
            <div class="visual">
              <slot name="visual"></slot>
            </div>
          `}
          <div class="content">
            <slot name="title" class="title"></slot>
            <slot class="description"></slot>
          </div>
        </div>
        ${closeButton}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-message': MinisMessage;
  }
}
