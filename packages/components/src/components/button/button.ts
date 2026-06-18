import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonStyles } from './button.styles.js';
import '../pill-counter/pill-counter.js';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'cta-buy' | 'transparent';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

const VALID_SIZES: ButtonSize[] = ['sm', 'md', 'lg', 'xl'];

/**
 * Mini*S Button Component
 *
 * @slot - Button label text
 * @slot icon - Icon to display inside the button (before the label). Use `<minis-icon slot="icon" name="…">`.
 * @csspart button - The native button element
 *
 * @example
 * ```html
 * <!-- Label only -->
 * <minis-button variant="primary">Buy now</minis-button>
 *
 * <!-- Icon + Label -->
 * <minis-button variant="cta-buy">
 *   <minis-icon slot="icon" name="cart-fill"></minis-icon>
 *   Buy now
 * </minis-button>
 *
 * <!-- Icon only (aria-label required) -->
 * <minis-button variant="primary" icon-only aria-label="Add to favourites">
 *   <minis-icon slot="icon" name="star"></minis-icon>
 * </minis-button>
 *
 * <!-- With counter pill -->
 * <minis-button variant="cta-buy" counter="3">
 *   <minis-icon slot="icon" name="cart-fill"></minis-icon>
 *   Cart
 * </minis-button>
 * ```
 */
@customElement('minis-button')
export class MinisButton extends LitElement {
  static styles = buttonStyles;

  @property({ type: String })
  variant: ButtonVariant = 'primary';

  @property({ type: String, reflect: true })
  get size(): ButtonSize { return this._size; }
  set size(value: ButtonSize) {
    this._size = VALID_SIZES.includes(value) ? value : 'md';
  }
  private _size: ButtonSize = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Render only the icon slot, no label. Adjusts padding accordingly. */
  @property({ type: Boolean, attribute: 'icon-only', reflect: true })
  iconOnly = false;

  /** Show a counter pill badge. Set to a number string, e.g. counter="3" */
  @property({ type: String, reflect: true })
  counter: string | null = null;

  /**
   * Stretch the button to fill its container's width (Figma "Fill container"
   * sizing). By default the button hugs its content; set this for stacked,
   * full-width layouts such as the xs breakpoint or a mobile sheet.
   */
  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Delegate ARIA attributes from the host element to the inner <button>.
   * This ensures screen readers announce the correct accessible name/description
   * even though the focusable element is inside Shadow DOM.
   */
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'none');
  }

  render() {
    const hasCounter = !!this.counter;

    // Delegate ARIA attributes to the inner <button> so screen readers
    // compute the accessible name from the host's aria-label/aria-labelledby/aria-describedby.
    const ariaLabel = this.getAttribute('aria-label');
    const ariaLabelledby = this.getAttribute('aria-labelledby');
    const ariaDescribedby = this.getAttribute('aria-describedby');

    return html`
      <button
        part="button"
        type=${this.type}
        ?disabled=${this.disabled}
        aria-label=${ariaLabel || nothing}
        aria-labelledby=${ariaLabelledby || nothing}
        aria-describedby=${ariaDescribedby || nothing}
      >
        <slot name="icon"></slot>
        <span class=${this.iconOnly ? 'visually-hidden' : ''}><slot></slot></span>
        ${hasCounter && !this.iconOnly
          ? html`
              <span class="pill-wrapper">
                <minis-pill-counter size=${this.size === 'sm' ? 'sm' : 'md'}>${this.counter}</minis-pill-counter>
              </span>`
          : ''}
        ${hasCounter && this.iconOnly
          ? html`
              <span class="pill-wrapper pill-wrapper--floating">
                <minis-pill-counter size=${this.size === 'sm' ? 'xs' : 'sm'}>${this.counter}</minis-pill-counter>
              </span>`
          : ''}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-button': MinisButton;
  }
}
