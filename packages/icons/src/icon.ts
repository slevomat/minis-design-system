import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconStyles } from './icon.styles.js';
import { iconRegistry } from './registry.js';

export type IconName = keyof typeof iconRegistry;

/**
 * Mini*S Icon Component
 *
 * Renders a named icon from the Slevomat icon library.
 * Inherits color via `currentColor` — no extra styling needed.
 *
 * @example
 * ```html
 * <!-- Decorative (aria-hidden, default) -->
 * <minis-icon name="cart-fill"></minis-icon>
 *
 * <!-- Custom size -->
 * <minis-icon name="star" size="16"></minis-icon>
 *
 * <!-- Labelled (semantic) -->
 * <minis-icon name="close" label="Close dialog"></minis-icon>
 *
 * <!-- In button icon slot -->
 * <minis-button variant="primary">
 *   <minis-icon slot="icon" name="cart-fill"></minis-icon>
 *   Add to cart
 * </minis-button>
 * ```
 */
@customElement('minis-icon')
export class MinisIcon extends LitElement {
  static styles = iconStyles;

  /** Icon name — matches Figma `Icon/{name}` without the prefix. */
  @property({ type: String })
  name: IconName = 'close';

  /** Width and height in px. Defaults to 24. */
  @property({ type: Number })
  size: number = 24;

  /**
   * Accessible label. When set, renders `role="img" aria-label`.
   * When absent, the icon is decorative (`aria-hidden="true"`).
   */
  @property({ type: String })
  label: string | undefined = undefined;

  render() {
    const paths = iconRegistry[this.name];

    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 18"
        fill="currentColor"
        style="width:${this.size}px;height:${this.size}px"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label ?? nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        ${paths}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-icon': MinisIcon;
  }
}
