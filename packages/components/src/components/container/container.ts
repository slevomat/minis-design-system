import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { containerStyles } from './container.styles.js';

export type ContainerVariant = 'default' | 'narrow';

/**
 * Mini*S Container Component
 *
 * Responsive layout wrapper that applies `--container-*` tokens
 * for max-width, horizontal padding, and auto centering.
 *
 * @example
 * ```html
 * <minis-container>Full-width content</minis-container>
 * <minis-container variant="narrow">Narrow content</minis-container>
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
