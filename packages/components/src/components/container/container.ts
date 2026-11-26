import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { containerStyles } from './container.styles.js';

export type ContainerVariant = 'default' | 'medium' | 'narrow';

/**
 * Mini*S Container Component
 *
 * Responsive layout wrapper that applies `--container-*` tokens
 * for max-width, horizontal padding, and auto centering.
 *
 * Three width levels (plan 030):
 * - `default` — wide, max 1240px: browsing pages (homepage, listings, deal detail)
 * - `medium`  — max 1008px from 1008px: task pages (cart, login, checkout)
 * - `narrow`  — max 752px from 768px: reading / form column
 *
 * @example
 * ```html
 * <minis-container>Wide content</minis-container>
 * <minis-container variant="medium">Task page</minis-container>
 * <minis-container variant="narrow">Text or a form</minis-container>
 * ```
 */
@customElement('minis-container')
export class MinisContainer extends LitElement {
  static styles = containerStyles;

  @property({ type: String, reflect: true })
  variant: ContainerVariant = 'default';

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-container': MinisContainer;
  }
}
