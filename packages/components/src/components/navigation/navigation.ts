import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navigationStyles } from './navigation.styles.js';
import './navigation-item.js';

export type NavigationVariant = 'horizontal' | 'tabs';

/**
 * Mini*S Navigation Component
 *
 * A horizontal scrollable navigation bar. Place `<minis-navigation-item>` elements
 * in the default slot.
 *
 * Two variants match the two patterns from slevomat.cz:
 * - **horizontal** — top-level category nav (homepage `horizontal-nav__section`)
 * - **tabs** — product detail tab bar (`navigation__links`)
 *
 * Use the `actions` slot for elements that sit at the far right (e.g. a favourite button).
 *
 * @slot         - Navigation items (`<minis-navigation-item>`)
 * @slot actions - Right-aligned actions (e.g. a button)
 *
 * @example
 * ```html
 * <!-- Horizontal category nav -->
 * <minis-navigation variant="horizontal">
 *   <minis-navigation-item href="/cestovani" active>Cestování</minis-navigation-item>
 *   <minis-navigation-item href="/zbozi">Zboží</minis-navigation-item>
 *   <minis-navigation-item href="/potraviny">Potraviny</minis-navigation-item>
 * </minis-navigation>
 *
 * <!-- Product detail tabs -->
 * <minis-navigation variant="tabs">
 *   <minis-navigation-item href="#nabidka" active>Nabídka</minis-navigation-item>
 *   <minis-navigation-item href="#hodnoceni">Hodnocení</minis-navigation-item>
 *   <minis-navigation-item href="#o-hotelu">O hotelu</minis-navigation-item>
 *   <minis-button slot="actions" variant="secondary" size="small">Uložit</minis-button>
 * </minis-navigation>
 * ```
 */
@customElement('minis-navigation')
export class MinisNavigation extends LitElement {
  static styles = navigationStyles;

  /**
   * Visual variant.
   * - `horizontal` — top-level category navigation bar
   * - `tabs` — product detail tab switcher
   */
  @property({ type: String, reflect: true })
  variant: NavigationVariant = 'horizontal';

  /**
   * Accessible label for the `<nav>` element (passed to `aria-label`).
   * Defaults to `"Navigation"`.
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel = 'Navigation';

  render() {
    return html`
      <nav aria-label=${this.ariaLabel}>
        <slot></slot>
        <slot name="actions" class="actions"></slot>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-navigation': MinisNavigation;
  }
}
