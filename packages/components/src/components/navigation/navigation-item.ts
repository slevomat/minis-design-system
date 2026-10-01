import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { navigationItemStyles } from './navigation-item.styles.js';
import '../pill-counter/pill-counter.js';

export type NavigationItemColor = 'default' | 'positive';

/**
 * Mini*S Navigation Item Component
 *
 * A single navigational link inside `<minis-navigation>`. Renders as an `<a>`
 * when `href` is provided, or as a `<button>` otherwise.
 *
 * - Set `active` to mark the currently selected item (adds underline + bold).
 * - Set `color="positive"` for green accent text (uses `--color-text-accent-positive`).
 * - Use the `icon` slot for a leading icon (24×24px).
 * - Set `counter` to show a trailing `<minis-pill-counter size="lg">` (e.g. unread / result count).
 *
 * @slot        - Label text
 * @slot icon   - Leading icon (use `<minis-icon slot="icon" size="20">` or `<svg slot="icon">`)
 *
 * @example
 * ```html
 * <!-- Default item -->
 * <minis-navigation-item>Cestování</minis-navigation-item>
 *
 * <!-- Active item -->
 * <minis-navigation-item active>Zboží</minis-navigation-item>
 *
 * <!-- Green accent (e.g. eco/sustainability tab) -->
 * <minis-navigation-item color="positive">Pro přírodu</minis-navigation-item>
 *
 * <!-- Green accent + active -->
 * <minis-navigation-item color="positive" active>Pro přírodu</minis-navigation-item>
 *
 * <!-- With a counter pill on the right -->
 * <minis-navigation-item counter="3">Oblíbené</minis-navigation-item>
 * ```
 */
@customElement('minis-navigation-item')
export class MinisNavigationItem extends LitElement {
  static styles = navigationItemStyles;

  /** Destination URL. When set, renders as `<a href>`. Omit to render as `<button>`. */
  @property({ type: String, reflect: true })
  href = '';

  /** Marks this item as the currently active/selected one. */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Colour accent for the item text and underline.
   * - `default` — blue link colour (`--color-text-accent-link`)
   * - `positive` — green accent (`--color-text-accent-positive`), e.g. eco/sustainability tab
   */
  @property({ type: String, reflect: true })
  color: NavigationItemColor = 'default';

  /**
   * Optional counter pill shown after the label. Set to a number string, e.g. `counter="3"`.
   * The pill follows the item state: dark at rest and on hover, blue when `active`,
   * green when `active` + `color="positive"`. Omit or leave empty to hide it.
   */
  @property({ type: String, reflect: true })
  counter = '';

  /**
   * Set by `<minis-menu>` on the items it holds — you never write it yourself.
   * Switches the item from a nav-row tab (fixed box, underline) to a panel row
   * (full width, left-aligned, hover surface).
   */
  @property({ type: Boolean, reflect: true, attribute: 'in-menu' })
  inMenu = false;

  @state()
  private _hasIcon = false;

  private _onIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _syncLabelSizer() {
    const label = this.shadowRoot?.querySelector('.label') as HTMLElement | null;
    if (!label) return;
    const slot = label.querySelector('slot') as HTMLSlotElement | null;
    const text = slot
      ? slot.assignedNodes({ flatten: true }).map((n) => n.textContent ?? '').join('').trim()
      : this.textContent?.trim() ?? '';
    label.dataset.label = text;
  }

  private _onLabelSlotChange() {
    this._syncLabelSizer();
  }

  protected override updated() {
    this._syncLabelSizer();
  }

  render() {
    const iconSlot = html`<slot
      name="icon"
      class=${this._hasIcon ? 'icon' : ''}
      @slotchange=${this._onIconSlotChange}
    ></slot>`;

    const content = html`
      ${iconSlot}
      <span class="label"><slot @slotchange=${this._onLabelSlotChange}></slot></span>
      ${this.counter
        ? html`<minis-pill-counter class="counter" size="lg">${this.counter}</minis-pill-counter>`
        : nothing}
    `;

    // The menu appearance rides on a class inside the shadow tree rather than a
    // `:host([in-menu])` rule. WebKit has long-standing style-invalidation bugs
    // with :host() attribute selectors that change after first render — which is
    // exactly what happens here, since the menu stamps `in-menu` at runtime.
    // Attribute → property → class re-render goes through
    // attributeChangedCallback, which every engine gets right.
    const itemClass = this.inMenu ? 'item in-menu' : 'item';

    if (this.href) {
      return html`<a class=${itemClass} href=${this.href}>${content}</a>`;
    }

    return html`<button class=${itemClass} type="button">${content}</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-navigation-item': MinisNavigationItem;
  }
}
