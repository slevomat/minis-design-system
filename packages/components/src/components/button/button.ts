import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonStyles } from './button.styles.js';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'cta-buy' | 'transparent';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Mini*S Button Component
 *
 * @slot - Button label text
 * @slot icon - Icon to display inside the button (before the label)
 * @csspart button - The native button element
 *
 * @example
 * ```html
 * <!-- Label only -->
 * <minis-button variant="primary">Buy now</minis-button>
 *
 * <!-- Icon + Label -->
 * <minis-button variant="cta-buy">
 *   <svg slot="icon" ...></svg>
 *   Buy now
 * </minis-button>
 *
 * <!-- Icon only -->
 * <minis-button variant="primary" icon-only>
 *   <svg slot="icon" ...></svg>
 * </minis-button>
 *
 * <!-- With counter pill -->
 * <minis-button variant="cta-buy" counter="3">
 *   <svg slot="icon" ...></svg>
 *   Cart
 * </minis-button>
 * ```
 */
@customElement('minis-button')
export class MinisButton extends LitElement {
  static styles = buttonStyles;

  @property({ type: String })
  variant: ButtonVariant = 'primary';

  @property({ type: String })
  size: ButtonSize = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Render only the icon slot, no label. Adjusts padding accordingly. */
  @property({ type: Boolean, attribute: 'icon-only', reflect: true })
  iconOnly = false;

  /** Show a counter pill badge. Set to a number string, e.g. counter="3" */
  @property({ type: String })
  counter: string | null = null;

  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  render() {
    const hasCounter = this.counter !== null && this.counter !== undefined;

    return html`
      <button
        part="button"
        type=${this.type}
        ?disabled=${this.disabled}
      >
        <slot name="icon"></slot>
        ${!this.iconOnly ? html`<slot></slot>` : ''}
        ${hasCounter && !this.iconOnly
          ? html`<span class="pill-wrapper"><span class="pill">${this.counter}</span></span>`
          : ''}
        ${hasCounter && this.iconOnly
          ? html`<span class="pill-wrapper pill-wrapper--floating"><span class="pill">${this.counter}</span></span>`
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
