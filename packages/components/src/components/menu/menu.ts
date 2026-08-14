import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { menuStyles } from './menu.styles.js';
import '@minis/icons';

let uid = 0;

/** Which edge of the trigger the panel aligns to. */
export type MenuPlacement = 'start' | 'end';

/**
 * Mini*S Menu Component
 *
 * A labelled trigger that opens a panel of items below it. Built for the
 * navigation overflow ("Další"), and usable anywhere a small dropdown of links
 * or buttons is needed.
 *
 * Slotted children are treated as menu items: they get `role="menuitem"` and a
 * roving tabindex, and arrow keys move between them. Give them `href` (or make
 * them buttons) so they stay operable when scripting is unavailable.
 *
 * @slot      - Menu items (links, buttons, `<minis-navigation-item>`)
 * @slot icon - Optional leading icon in the trigger
 *
 * @fires toggle - Fires after the menu opens or closes. detail: `{ open: boolean }`
 *
 * @csspart trigger - The button that opens the panel
 * @csspart panel   - The dropdown panel
 *
 * @example
 * ```html
 * <minis-menu label="Další">
 *   <a href="/darky">Dárky</a>
 *   <a href="/benefity">Benefity</a>
 * </minis-menu>
 * ```
 */
@customElement('minis-menu')
export class MinisMenu extends LitElement {
  static styles = menuStyles;

  /** Trigger label. */
  @property({ type: String })
  label = '';

  /** Open state. Reflected, so `:host([open])` can style the trigger. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Which edge of the trigger the panel lines up with.
   * Use `end` when the trigger sits near the right edge of its container,
   * so the panel opens inwards instead of overflowing the viewport.
   */
  @property({ type: String, reflect: true })
  placement: MenuPlacement = 'start';

  @query('.trigger')
  private _trigger!: HTMLButtonElement;

  @query('slot:not([name])')
  private _slot!: HTMLSlotElement;

  private readonly _id = `minis-menu-${++uid}`;

  /**
   * Assigned children, resolving nested slots by hand.
   *
   * `<minis-navigation>` forwards its overflow items through its own
   * `<slot name="overflow">`, so what is *directly* assigned here is that slot
   * element, not the items. `assignedElements({ flatten: true })` is supposed to
   * see through that, but WebKit's flattening across nested slots is not
   * dependable — walking it explicitly behaves the same everywhere.
   */
  private get _items(): HTMLElement[] {
    const items: HTMLElement[] = [];

    const collect = (slot: HTMLSlotElement) => {
      for (const node of slot.assignedNodes()) {
        if (node instanceof HTMLSlotElement) collect(node);
        else if (node instanceof HTMLElement) items.push(node);
      }
    };

    if (this._slot) collect(this._slot);
    return items;
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocumentClick, true);
  }

  override disconnectedCallback() {
    document.removeEventListener('click', this._onDocumentClick, true);
    document.removeEventListener('keydown', this._onDocumentKeyDown, true);
    super.disconnectedCallback();
  }

  /**
   * Escape has to work while the panel is open even when focus never made it
   * inside — opened programmatically, or a click that left focus on the page.
   * Only bound while open, so it never competes with anything else.
   */
  private _onDocumentKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape' || !this.open) return;
    e.stopPropagation();
    this._close(true);
  };

  /** A click anywhere outside the component closes the panel. */
  private _onDocumentClick = (e: Event) => {
    if (!this.open) return;
    if (e.composedPath().includes(this)) return;
    this._close(false);
  };

  /**
   * Menu semantics live on the light-DOM children, so they have to be set
   * imperatively — a menu is only a menu if its items say so. `in-menu` is the
   * styling hook components use to render themselves as a panel row rather than
   * whatever they look like in place (see navigation-item).
   *
   * Public because `<minis-navigation>` moves items in and out of the panel
   * after its own measure pass, when no slotchange fires on this slot.
   */
  syncItems() {
    this._items.forEach((item) => {
      item.setAttribute('role', 'menuitem');
      item.setAttribute('in-menu', '');
      item.tabIndex = -1;
    });
  }

  private _onSlotChange() {
    this.syncItems();
  }

  private _toggle() {
    this.open ? this._close(true) : this._openMenu();
  }

  private _openMenu() {
    this.open = true;
    document.addEventListener('keydown', this._onDocumentKeyDown, true);
    this._emit();
    // Wait for the panel to render before moving focus into it. Re-sync first:
    // the item set may have changed since the last slotchange.
    this.updateComplete.then(() => {
      this.syncItems();
      this._focusItem(0);
    });
  }

  private _close(returnFocus: boolean) {
    if (!this.open) return;
    this.open = false;
    document.removeEventListener('keydown', this._onDocumentKeyDown, true);
    this._emit();
    if (returnFocus) this._trigger?.focus();
  }

  private _emit() {
    this.dispatchEvent(
      new CustomEvent('toggle', {
        bubbles: true,
        composed: true,
        detail: { open: this.open },
      })
    );
  }

  private _focusItem(index: number) {
    const items = this._items;
    if (!items.length) return;
    const i = (index + items.length) % items.length;
    items[i].focus();
  }

  private _focusedIndex(): number {
    const active = this.shadowRoot?.activeElement ?? document.activeElement;
    return this._items.findIndex((item) => item === active || item.contains(active as Node));
  }

  private _onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        // Usually handled by the document listener; this covers a menu opened
        // by setting `open` directly rather than through the trigger.
        if (this.open) {
          e.stopPropagation();
          this._close(true);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this.open) this._openMenu();
        else this._focusItem(this._focusedIndex() + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!this.open) this._openMenu();
        else this._focusItem(this._focusedIndex() - 1);
        break;
      case 'Home':
        if (this.open) {
          e.preventDefault();
          this._focusItem(0);
        }
        break;
      case 'End':
        if (this.open) {
          e.preventDefault();
          this._focusItem(this._items.length - 1);
        }
        break;
      case 'Tab':
        // Let focus leave naturally, but don't leave an orphaned panel open.
        this._close(false);
        break;
    }
  };

  render() {
    const panelId = `${this._id}-panel`;
    const triggerId = `${this._id}-trigger`;

    return html`
      <button
        part="trigger"
        class="trigger"
        id=${triggerId}
        type="button"
        aria-haspopup="menu"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-controls=${panelId}
        @click=${this._toggle}
        @keydown=${this._onKeyDown}
      >
        <slot name="icon"></slot>
        ${this.label}
        <minis-icon class="chevron" name="arrow-down" size="20"></minis-icon>
      </button>

      <div
        part="panel"
        class="panel"
        id=${panelId}
        role="menu"
        aria-labelledby=${triggerId}
        ?hidden=${!this.open}
        @keydown=${this._onKeyDown}
      >
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-menu': MinisMenu;
  }
}
