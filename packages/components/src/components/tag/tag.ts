import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tagStyles } from './tag.styles.js';

export type TagVariant = 'static' | 'clickable' | 'dismissible';

function iconClose() {
  return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="16" height="16">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>`;
}

/**
 * Mini*S Tag Component
 *
 * A compact label used to display metadata, applied filters, or lightweight
 * interactive states. Three variants cover the main use cases:
 *
 * - **static** — read-only label, no interaction
 * - **clickable** — fires a `click` event; supports `pressed` toggle state
 *   (e.g. favourite/save icon switching outline ↔ filled).
 *   Use only for lightweight actions like opening a modal or toggling a filter.
 *   Do NOT use as a form submit button.
 * - **dismissible** — has a built-in ✕ button; fires a `dismiss` event
 *
 * @slot        - Label text
 * @slot icon   - Leading icon (use `<minis-icon slot="icon">` or an `<svg>`)
 *
 * @fires dismiss - Dismissed by the ✕ button (dismissible variant only)
 * @fires toggle  - Pressed state changed (clickable variant only),
 *                  detail: `{ pressed: boolean }`
 *
 * @example
 * ```html
 * <!-- Static tag with icon -->
 * <minis-tag>
 *   <minis-icon slot="icon" name="credit-card"></minis-icon>
 *   Platba na zálohu
 * </minis-tag>
 *
 * <!-- Dismissible tag -->
 * <minis-tag variant="dismissible">Platba na zálohu</minis-tag>
 *
 * <!-- Clickable tag with toggle (e.g. favourite) -->
 * <minis-tag variant="clickable" id="fav">
 *   <minis-icon slot="icon" name="heart"></minis-icon>
 *   Oblíbené
 * </minis-tag>
 * <script>
 *   document.querySelector('#fav').addEventListener('toggle', (e) => {
 *     const icon = e.target.querySelector('[slot="icon"]');
 *     icon.name = e.detail.pressed ? 'heart-fill' : 'heart';
 *   });
 * </script>
 * ```
 */
@customElement('minis-tag')
export class MinisTag extends LitElement {
  static styles = tagStyles;

  /** Visual variant */
  @property({ type: String, reflect: true })
  variant: TagVariant = 'static';

  /**
   * Toggle / selected state. Only relevant for the `clickable` variant.
   * Sets `aria-pressed` on the inner button.
   */
  @property({ type: Boolean, reflect: true })
  pressed = false;

  /** Disabled state. Only meaningful on the `clickable` variant. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state()
  private _hasIcon = false;

  private _onIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _handleClick() {
    if (this.variant !== 'clickable' || this.disabled) return;
    this.pressed = !this.pressed;
    this.dispatchEvent(new CustomEvent('toggle', {
      bubbles: true,
      composed: true,
      detail: { pressed: this.pressed },
    }));
  }

  private _handleDismiss(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
  }

  render() {
    const iconSlot = html`<slot
      name="icon"
      class=${this._hasIcon ? 'icon' : ''}
      @slotchange=${this._onIconSlotChange}
    ></slot>`;

    if (this.variant === 'clickable') {
      return html`
        <button
          class="tag"
          type="button"
          ?disabled=${this.disabled}
          aria-pressed=${this.pressed ? 'true' : 'false'}
          @click=${this._handleClick}
        >
          ${iconSlot}
          <span class="label"><slot></slot></span>
        </button>
      `;
    }

    if (this.variant === 'dismissible') {
      return html`
        <div class="tag" role="group">
          ${iconSlot}
          <span class="label"><slot></slot></span>
          <button
            class="dismiss"
            type="button"
            aria-label="Remove"
            @click=${this._handleDismiss}
          >${iconClose()}</button>
        </div>
      `;
    }

    // static (default)
    return html`
      <div class="tag">
        ${iconSlot}
        <span class="label"><slot></slot></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-tag': MinisTag;
  }
}
