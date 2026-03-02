import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { pillCounterStyles } from './pill-counter.styles.js';

export type PillCounterSize = 'md' | 'sm' | 'xs';

/**
 * Mini*S Pill Counter Component
 *
 * Displays a numeric badge. Used as a sub-component inside `<minis-button>`,
 * and can also be used standalone (e.g. behind labels or list items).
 *
 * Size context:
 * - `md`  — default, general use cases
 * - `sm`  — for use inside icon + label buttons
 * - `xs`  — for use inside icon-only buttons
 *
 * @example
 * ```html
 * <minis-pill-counter>3</minis-pill-counter>
 * <minis-pill-counter size="sm">12</minis-pill-counter>
 * <minis-pill-counter size="xs">5</minis-pill-counter>
 * ```
 */
@customElement('minis-pill-counter')
export class MinisPillCounter extends LitElement {
  static styles = pillCounterStyles;

  @property({ type: String, reflect: true })
  size: PillCounterSize = 'md';

  @property({ type: String, attribute: 'bg-color' })
  bgColor: string = '';

  @property({ type: String, attribute: 'text-color' })
  textColor: string = '';

  render() {
    const style = [
      this.bgColor ? `--pill-counter-bg: ${this.bgColor}` : '',
      this.textColor ? `--pill-counter-color: ${this.textColor}` : '',
    ]
      .filter(Boolean)
      .join('; ');

    return html`
      <span class="pill" style=${style || nothing}><slot></slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-pill-counter': MinisPillCounter;
  }
}
