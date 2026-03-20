import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { topbarStyles } from './topbar.styles.js';

/**
 * Mini*S Topbar Component
 *
 * Brand identity bar that sits above `<minis-navigation>`.
 * Contains a logo slot on the left and an actions slot on the right
 * (search, shortcuts, cart button, etc.).
 *
 * @example
 * ```html
 * <minis-topbar>
 *   <img slot="logo" src="/logo.svg" alt="Slevomat" />
 *   <minis-button slot="actions" variant="tertiary" size="sm">
 *     <minis-icon slot="icon" name="heart-fill" size="16"></minis-icon>
 *     Oblibene
 *   </minis-button>
 *   <minis-button slot="actions" variant="cta-buy">
 *     <minis-icon slot="icon" name="cart-fill"></minis-icon>
 *     Kosik
 *   </minis-button>
 * </minis-topbar>
 * ```
 */
@customElement('minis-topbar')
export class MinisTopbar extends LitElement {
  static styles = topbarStyles;

  render() {
    return html`
      <div class="topbar">
        <div class="logo">
          <slot name="logo"></slot>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-topbar': MinisTopbar;
  }
}
