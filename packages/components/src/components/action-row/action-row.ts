import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { actionRowStyles } from './action-row.styles.js';
import '../checkbox/checkbox.js';
import '../pill-counter/pill-counter.js';

export type ActionRowVariant = 'none' | 'icon' | 'checkbox';
export type ActionRowState = 'default' | 'hover' | 'active';

/**
 * Mini*S ActionRow
 *
 * Interactive list-style row used in vertical menus, filters and similar option
 * lists. Always clickable. Supports an optional leading icon OR checkbox
 * (mutually exclusive) and an optional trailing counter pill that always sits
 * after the label.
 *
 * @slot         - Label text
 * @slot icon    - Leading icon (use with `variant="icon"`)
 *
 * @fires change - Fires when the checkbox is toggled (only for `variant="checkbox"`). detail: `{ checked: boolean }`
 *
 * @example
 * ```html
 * <minis-action-row>Label only</minis-action-row>
 *
 * <minis-action-row variant="icon" counter="3">
 *   <minis-icon slot="icon" name="settings"></minis-icon>
 *   Settings
 * </minis-action-row>
 *
 * <minis-action-row variant="checkbox" checked>Filter option</minis-action-row>
 * ```
 */
@customElement('minis-action-row')
export class MinisActionRow extends LitElement {
  static styles = actionRowStyles;

  /** Leading content variant. Only one of `icon` / `checkbox` is allowed. */
  @property({ type: String, reflect: true })
  variant: ActionRowVariant = 'none';

  /** Force a visual state (useful for documentation / hover preview). */
  @property({ type: String, reflect: true })
  state?: ActionRowState;

  /** Marks the row as the currently selected / active item (persistent highlight). */
  @property({ type: Boolean, reflect: true })
  active = false;

  /** Checked state. Only meaningful for `variant="checkbox"`. */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** Disabled state. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Counter value. When set (non-empty), a `<minis-pill-counter>` is rendered
   * directly after the label. Omit or pass `""` to hide.
   */
  @property({ type: String })
  counter?: string;

  private _onClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (this.variant === 'checkbox') {
      const fromCheckbox = e.composedPath().some(
        (n) => n instanceof HTMLElement && n.tagName === 'MINIS-CHECKBOX'
      );
      if (!fromCheckbox) {
        this.checked = !this.checked;
        this._emitChange();
      }
    }
  };

  private _onCheckboxChange = (e: Event) => {
    e.stopPropagation();
    const detail = (e as CustomEvent).detail as { checked: boolean } | undefined;
    if (detail) this.checked = detail.checked;
    this._emitChange();
  };

  private _emitChange() {
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked },
      })
    );
  }

  private _onKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.shadowRoot?.querySelector<HTMLElement>('.row')?.click();
    }
  };

  render() {
    const showCounter = this.counter != null && this.counter !== '';
    const isCheckbox = this.variant === 'checkbox';
    const isIcon = this.variant === 'icon';

    return html`
      <div
        class="row"
        role="button"
        tabindex=${this.disabled ? -1 : 0}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-pressed=${this.active ? 'true' : 'false'}
        @click=${this._onClick}
        @keydown=${this._onKeydown}
      >
        ${isCheckbox
          ? html`<minis-checkbox
              ?checked=${this.checked}
              ?disabled=${this.disabled}
              tabindex="-1"
              @change=${this._onCheckboxChange}
            ></minis-checkbox>`
          : nothing}
        ${isIcon
          ? html`<slot name="icon"></slot>`
          : nothing}
        <span class="content">
          <span class="label"><slot></slot></span>
          ${showCounter
            ? html`<minis-pill-counter
                size="lg"
                bg-color="var(--color-surface-primary, #fff)"
                text-color="var(--color-text-primary, #000)"
              >${this.counter}</minis-pill-counter>`
            : nothing}
        </span>
      </div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'minis-action-row': MinisActionRow;
  }
}
