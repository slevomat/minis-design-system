import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { checkboxStyles } from './checkbox.styles.js';

/**
 * Mini*S Checkbox
 *
 * Binary selection input — unchecked / checked / indeterminate, with hover state.
 *
 * @slot - Optional label text
 * @fires change - Fires when the state changes. `detail: { checked: boolean, indeterminate: boolean }`
 *
 * @example
 * ```html
 * <minis-checkbox checked>Accept terms</minis-checkbox>
 * <minis-checkbox indeterminate>Select all</minis-checkbox>
 * ```
 */
@customElement('minis-checkbox')
export class MinisCheckbox extends LitElement {
  static styles = checkboxStyles;

  /** Checked state */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** Indeterminate state — shown as a dash; clicking resolves to checked */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /** Disabled state */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Form field name (when used inside a form) */
  @property({ type: String })
  name?: string;

  /** Form field value (default "on") */
  @property({ type: String })
  value = 'on';

  @state()
  private _hasLabel = false;

  @query('input')
  private _input?: HTMLInputElement;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'checkbox');
    this.tabIndex = this.disabled ? -1 : 0;
    this.addEventListener('keydown', this._onKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeydown);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('checked') || changed.has('indeterminate')) {
      this.setAttribute('aria-checked', this.indeterminate ? 'mixed' : String(this.checked));
      if (this._input) this._input.indeterminate = this.indeterminate;
    }
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
      this.tabIndex = this.disabled ? -1 : 0;
    }
  }

  private _onKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._toggle();
    }
  };

  private _onHostClick = (e: MouseEvent) => {
    if (this.disabled) return;
    // Avoid double toggle when the native input is the click target
    if (e.target instanceof HTMLInputElement) return;
    this._toggle();
  };

  private _onInputChange = (e: Event) => {
    e.stopPropagation();
    this.indeterminate = false;
    this.checked = (e.target as HTMLInputElement).checked;
    this._emit();
  };

  private _toggle() {
    if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true;
    } else {
      this.checked = !this.checked;
    }
    this._emit();
  }

  private _emit() {
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { checked: this.checked, indeterminate: this.indeterminate },
    }));
  }

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasLabel = slot.assignedNodes({ flatten: true })
      .some(n => (n.nodeType === Node.TEXT_NODE ? !!n.textContent?.trim() : true));
    this.classList.toggle('has-label', this._hasLabel);
  }

  render() {
    return html`
      <span @click=${this._onHostClick} style="display:inline-flex;align-items:center;gap:inherit;">
        <input
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name ?? ''}
          .value=${this.value}
          tabindex="-1"
          aria-hidden="true"
          @change=${this._onInputChange}
        />
        <span class="box" part="box">
          <svg class="check" viewBox="0 0 10 8" fill="none" aria-hidden="true">
            <path
              d="M1 4.2L3.8 7 9 1.5"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg class="dash" viewBox="0 0 10 2" fill="none" aria-hidden="true">
            <line x1="0.5" y1="1" x2="9.5" y2="1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </span>
        ${this._hasLabel ? html`<span class="label"><slot @slotchange=${this._onSlotChange}></slot></span>`
          : html`<slot @slotchange=${this._onSlotChange}></slot>`}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-checkbox': MinisCheckbox;
  }
}
