import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { headerStyles } from './header.styles.js';

/**
 * Mini*S Header Component
 *
 * Main brand bar that sits above `<minis-navigation>`.
 * Contains a logo slot on the left and an actions slot on the right.
 *
 * @example
 * ```html
 * <minis-header>
 *   <img slot="logo" src="/logo.svg" alt="Slevomat" />
 *   <minis-button slot="actions" variant="tertiary" size="sm">
 *     <minis-icon slot="icon" name="heart-fill" size="16"></minis-icon>
 *     Oblibene
 *   </minis-button>
 *   <minis-button slot="actions" variant="cta-buy">
 *     <minis-icon slot="icon" name="cart-fill"></minis-icon>
 *     Kosik
 *   </minis-button>
 * </minis-header>
 * ```
 */
@customElement('minis-header')
export class MinisHeader extends LitElement {
  static styles = headerStyles;

  render() {
    return html`
      <div class="header">
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
    'minis-header': MinisHeader;
  }
}
