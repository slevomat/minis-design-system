import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { checkboxStyles } from './checkbox.styles.js';

/**
 * Mini*S Checkbox
 *
 * Binary selection input — unchecked / checked / indeterminate, with hover state.
 *
 * Form-associated via ElementInternals: when placed inside a `<form>` with a
 * `name` attribute, it submits `value` (default `"on"`) while checked, exactly
 * like a native checkbox. Participates in form reset and `<fieldset disabled>`.
 *
 * @slot - Optional label text
 * @fires change - Fires when the state changes. `detail: { checked: boolean, indeterminate: boolean }`
 *
 * @example
 * ```html
 * <minis-checkbox checked>Accept terms</minis-checkbox>
 * <minis-checkbox indeterminate>Select all</minis-checkbox>
 * <form>
 *   <minis-checkbox name="newsletter" value="yes">Subscribe</minis-checkbox>
 * </form>
 * ```
 */
@customElement('minis-checkbox')
export class MinisCheckbox extends LitElement {
  static styles = checkboxStyles;
  static formAssociated = true;

  /** Checked state */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** Indeterminate state — shown as a dash; clicking resolves to checked */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /** Disabled state */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Form field name (must be set as an attribute for form submission) */
  @property({ type: String, reflect: true })
  name?: string;

  /** Form field value submitted while checked (default "on") */
  @property({ type: String })
  value = 'on';

  @state()
  private _hasLabel = false;

  private _internals = this.attachInternals();

  /** Initial checked state, restored on form reset */
  private _defaultChecked = false;

  connectedCallback() {
    super.connectedCallback();
    this._defaultChecked = this.checked;
    this.setAttribute('role', 'checkbox');
    this.tabIndex = this.disabled ? -1 : 0;
    this.addEventListener('keydown', this._onKeydown);
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeydown);
    this.removeEventListener('click', this._onClick);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('checked') || changed.has('indeterminate')) {
      this.setAttribute('aria-checked', this.indeterminate ? 'mixed' : String(this.checked));
    }
    if (changed.has('checked') || changed.has('value')) {
      this._internals.setFormValue(this.checked ? this.value : null);
    }
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
      this.tabIndex = this.disabled ? -1 : 0;
    }
  }

  /** Called by the browser on `form.reset()` */
  formResetCallback() {
    this.checked = this._defaultChecked;
    this.indeterminate = false;
  }

  /** Called by the browser when an ancestor `<fieldset>` is (un)disabled */
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  private _onKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._toggle();
    }
  };

  private _onClick = () => {
    if (this.disabled) return;
    this._toggle();
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-checkbox': MinisCheckbox;
  }
}
