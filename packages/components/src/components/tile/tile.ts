import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tileStyles } from './tile.styles.js';

/**
 * Mini*S Tile Component
 *
 * A vertical, icon-based navigation tile used for primary navigation shortcuts.
 * Typically arranged in a grid layout (e.g. 4-column homepage shortcut grid).
 *
 * Always renders an icon (required via the `icon` slot) and a label (default slot).
 * Optionally shows an inline counter pill next to the label.
 *
 * Renders as `<a>` when `href` is set, `<button>` otherwise.
 *
 * @slot        - Label text (required)
 * @slot icon   - Navigation icon (required, 24×24px). Use `<minis-icon slot="icon">` or `<svg slot="icon">`.
 *
 * @example
 * ```html
 * <!-- Basic tile (button) -->
 * <minis-tile>
 *   <minis-icon slot="icon" name="voucher-outline"></minis-icon>
 *   Moje nákupy
 * </minis-tile>
 *
 * <!-- Tile as link -->
 * <minis-tile href="/moje-nakupy">
 *   <minis-icon slot="icon" name="voucher-outline"></minis-icon>
 *   Moje nákupy
 * </minis-tile>
 *
 * <!-- Tile with counter -->
 * <minis-tile counter="5">
 *   <minis-icon slot="icon" name="voucher-outline"></minis-icon>
 *   Moje nákupy
 * </minis-tile>
 *
 * <!-- Disabled tile -->
 * <minis-tile disabled>
 *   <minis-icon slot="icon" name="voucher-outline"></minis-icon>
 *   Moje nákupy
 * </minis-tile>
 * ```
 */
@customElement('minis-tile')
export class MinisTile extends LitElement {
  static styles = tileStyles;

  /** Destination URL. When set, renders as `<a href>`. Omit to render as `<button>`. */
  @property({ type: String, reflect: true })
  href = '';

  /**
   * Counter value shown inline after the label as a pill badge.
   * Omit or pass `""` to hide the pill.
   */
  @property({ type: String })
  counter?: string;

  /** Prevents interaction and reduces opacity. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _onClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  private get _showCounter() {
    return this.counter != null && this.counter !== '';
  }

  private _renderCounter() {
    if (!this._showCounter) return nothing;
    return html`<span class="counter" aria-label="(${this.counter})">${this.counter}</span>`;
  }

  private _renderContent() {
    return html`
      <slot name="icon" class="icon"></slot>
      <span class="label-row">
        <span class="label"><slot></slot></span>
        ${this._renderCounter()}
      </span>
    `;
  }

  render() {
    if (this.href && !this.disabled) {
      return html`
        <a class="tile" href=${this.href} @click=${this._onClick}>
          ${this._renderContent()}
        </a>
      `;
    }

    return html`
      <button
        class="tile"
        type="button"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        @click=${this._onClick}
      >
        ${this._renderContent()}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-tile': MinisTile;
  }
}
