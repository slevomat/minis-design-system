import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { navigationItemStyles } from './navigation-item.styles.js';

export type NavigationItemColor = 'default' | 'positive';

/**
 * Mini*S Navigation Item Component
 *
 * A single navigational link inside `<minis-navigation>`. Renders as an `<a>`
 * when `href` is provided, or as a `<button>` otherwise.
 *
 * - Set `active` to mark the currently selected item (adds underline + bold).
 * - Set `color="positive"` for green accent text (uses `--color-text-accent-positive`).
 * - Use the `icon` slot for a leading icon (20×20px).
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
    `;

    if (this.href) {
      return html`<a class="item" href=${this.href}>${content}</a>`;
    }

    return html`<button class="item" type="button">${content}</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-navigation-item': MinisNavigationItem;
  }
}
