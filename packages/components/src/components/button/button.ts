import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonStyles } from './button.styles.js';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'cta-buy';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Mini*S Button Component
 * 
 * 
 * @slot - Button content
 * @csspart button - The button element
 * 
 * @example
 * ```html
 * <minis-button variant="primary" size="md">Click me</minis-button>
 * ```
 */
@customElement('minis-button')
export class MinisButton extends LitElement {
  static styles = buttonStyles;

  @property({ type: String })
  variant: ButtonVariant = 'primary';

  @property({ type: String })
  size: ButtonSize = 'md';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  loading = false;

  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  render() {
    return html`
      <button
        part="button"
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading}
      >
        ${this.loading ? html`<span class="spinner"></span>` : ''}
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-button': MinisButton;
  }
}
