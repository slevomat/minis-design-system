import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { actionRowStyles } from './action-row.styles.js';
import '../checkbox/checkbox.js';
import '../pill-counter/pill-counter.js';
import '@minis/icons';

export type ActionRowVariant = 'none' | 'icon' | 'checkbox';
export type ActionRowState = 'default' | 'hover' | 'active';
export type ActionRowBreakpoint = 'desktop' | 'xs';

/**
 * Mini*S ActionRow
 *
 * Interactive list-style row used in vertical menus, filters and similar option
 * lists. Always clickable. Supports an optional leading icon, an optional
 * checkbox and an optional counter pill that always sits after the label.
 *
 * Two breakpoint layouts, matching the Figma `Breakpoint` variant:
 *
 * - `desktop` (default) — 32px row, everything packed to the left:
 *   `[checkbox] [icon] label [counter]`
 * - `xs` — 56px row with a trailing action pinned right:
 *   `[icon] label [counter] … [chevron | checkbox]`
 *   The trailing action is a checkbox for `variant="checkbox"` and an
 *   `arrow-right` chevron otherwise.
 *
 * @slot         - Label text
 * @slot icon    - Leading icon (24×24). Renders in every variant when slotted.
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
 * <minis-action-row breakpoint="xs" variant="checkbox" checked>
 *   <minis-icon slot="icon" name="bell"></minis-icon>
 *   Filter option
 * </minis-action-row>
 * ```
 */
@customElement('minis-action-row')
export class MinisActionRow extends LitElement {
  static styles = actionRowStyles;

  /** Leading content variant. `checkbox` renders a checkbox in addition to any slotted icon. */
  @property({ type: String, reflect: true })
  variant: ActionRowVariant = 'none';

  /** Layout breakpoint. `xs` is the 56px mobile row with a trailing action. */
  @property({ type: String, reflect: true })
  breakpoint: ActionRowBreakpoint = 'desktop';

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

  @state()
  private _hasIcon = false;

  private _onIconSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
  };

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

  private _renderCheckbox() {
    return html`<minis-checkbox
      ?checked=${this.checked}
      ?disabled=${this.disabled}
      tabindex="-1"
      @change=${this._onCheckboxChange}
    ></minis-checkbox>`;
  }

  render() {
    const showCounter = this.counter != null && this.counter !== '';
    const isCheckbox = this.variant === 'checkbox';
    const isXs = this.breakpoint === 'xs';

    return html`
      <div
        class="row ${this._hasIcon ? 'has-icon' : ''}"
        role=${isCheckbox ? 'checkbox' : 'button'}
        tabindex=${this.disabled ? -1 : 0}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-checked=${isCheckbox ? String(this.checked) : nothing}
        aria-pressed=${isCheckbox ? nothing : String(this.active)}
        @click=${this._onClick}
        @keydown=${this._onKeydown}
      >
        ${isCheckbox && !isXs ? this._renderCheckbox() : nothing}
        <span class="icon"
          ><slot name="icon" @slotchange=${this._onIconSlotChange}></slot
        ></span>
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
        ${isXs
          ? html`<span class="action" part="action">
              ${isCheckbox
                ? this._renderCheckbox()
                : html`<minis-icon name="arrow-right" size="24"></minis-icon>`}
            </span>`
          : nothing}
      </div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'minis-action-row': MinisActionRow;
  }
}
