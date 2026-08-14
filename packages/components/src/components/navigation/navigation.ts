import { LitElement, html, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { navigationStyles } from './navigation.styles.js';
import './navigation-item.js';
import '../menu/menu.js';

export type NavigationVariant = 'main-nav' | 'tabs';

/** Names from the `--breakpoint-*` scale in tokens.css. */
export type NavigationBreakpoint =
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl';

/** Pre-2026-08-14 name for `main-nav`, still accepted on the attribute. */
const LEGACY_VARIANTS: Record<string, NavigationVariant> = {
  horizontal: 'main-nav',
};

/**
 * Mirrors the `--breakpoint-*` tokens. Custom properties cannot be read from a
 * `@media`/`@container` condition, and this comparison happens in JS anyway —
 * keep these numbers in step with `packages/tokens/src/tokens.css`.
 */
const BREAKPOINTS: Record<NavigationBreakpoint, number> = {
  '2xs': 360,
  xs: 408,
  sm: 600,
  md: 768,
  lg: 1008,
  xl: 1256,
  '2xl': 1480,
  '3xl': 1920,
  '4xl': 2560,
};

/**
 * Mini*S Navigation Component
 *
 * A horizontal navigation bar. Place `<minis-navigation-item>` elements in the
 * default slot.
 *
 * Two variants match the two patterns from slevomat.cz:
 * - **main-nav** — the site's main category navigation. It appears **once per page**,
 *   directly under `<minis-topbar>`; together they are mandatory on every Slevomat
 *   web page. Items are distributed across the full container width.
 * - **tabs** — contextual tab bar inside a page (e.g. product detail). May appear more
 *   than once, never at the top of the page. Items are left-aligned with a 24px gap.
 *
 * ### Too many items to fit (main-nav only)
 *
 * `main-nav` has two ways of coping, split by `breakpoint` (measured against the
 * component's own width, not the viewport):
 *
 * - **at or below the breakpoint** — the bar scrolls horizontally, thumb-friendly
 *   and with every item reachable by swiping.
 * - **above it** — items that don't fit collapse into a trailing `<minis-menu>`
 *   labelled by `overflow-label` ("Další"), which drops them down as a menu.
 *
 * The active item is never hidden in that menu: if it would overflow, it is kept
 * in the row and the last item that fits is pushed into the menu instead.
 *
 * `tabs` never collapses — a tab bar scrolls at every width, so no tab is ever
 * hidden behind a menu. `breakpoint` and `overflow-label` are ignored there.
 *
 * Use the `actions` slot for elements that sit at the far right (e.g. a favourite button).
 *
 * @slot         - Navigation items (`<minis-navigation-item>`)
 * @slot actions - Right-aligned actions (e.g. a button)
 *
 * @csspart nav - The inner `<nav>` element
 *
 * @example
 * ```html
 * <!-- Main navigation (once per page, under the topbar) -->
 * <minis-navigation variant="main-nav" breakpoint="md">
 *   <minis-navigation-item href="/cestovani" active>Cestování</minis-navigation-item>
 *   <minis-navigation-item href="/zbozi">Zboží</minis-navigation-item>
 *   <minis-navigation-item href="/potraviny">Potraviny</minis-navigation-item>
 * </minis-navigation>
 *
 * <!-- Product detail tabs -->
 * <minis-navigation variant="tabs">
 *   <minis-navigation-item href="#nabidka" active>Nabídka</minis-navigation-item>
 *   <minis-navigation-item href="#hodnoceni">Hodnocení</minis-navigation-item>
 *   <minis-button slot="actions" variant="secondary" size="sm">Uložit</minis-button>
 * </minis-navigation>
 * ```
 */
@customElement('minis-navigation')
export class MinisNavigation extends LitElement {
  static styles = navigationStyles;

  /**
   * Visual variant.
   * - `main-nav` — the site's main category navigation (once per page, under the topbar)
   * - `tabs` — in-page contextual tab switcher
   *
   * The legacy value `horizontal` is silently normalised to `main-nav`.
   */
  @property({ type: String, reflect: true })
  variant: NavigationVariant = 'main-nav';

  /**
   * Width at which the bar stops scrolling and starts collapsing overflowing
   * items into the "Další" menu. Compared against the component's **own width**,
   * so a nav in a narrow column behaves like a nav on a narrow screen.
   *
   * At or below this width the bar scrolls; above it, it collapses.
   *
   * `main-nav` only — `tabs` always scrolls, so this is ignored there.
   */
  @property({ type: String, reflect: true })
  breakpoint: NavigationBreakpoint = 'md';

  /** Label of the menu that holds the items which did not fit (`main-nav` only). */
  @property({ type: String, attribute: 'overflow-label' })
  overflowLabel = 'Další';

  /**
   * Accessible label for the `<nav>` element (passed to `aria-label`).
   * Defaults to `"Navigation"`.
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel = 'Navigation';

  @state()
  private _hasActions = false;

  /** True while the bar is collapsing overflow into the menu. */
  @state()
  private _collapsed = false;

  /** True when at least one item currently sits in the menu. */
  @state()
  private _hasOverflow = false;

  @query('nav')
  private _nav!: HTMLElement;

  @query('.overflow')
  private _overflowMenu!: HTMLElement;

  @query('.actions')
  private _actionsSlot!: HTMLElement;

  private _resizeObserver?: ResizeObserver;

  /** Set while we reshuffle items, so our own writes don't re-trigger a measure. */
  private _measuring = false;

  private _measureQueued = false;

  override connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver(() => this._queueMeasure());
    this._resizeObserver.observe(this);
  }

  override disconnectedCallback() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    super.disconnectedCallback();
  }

  protected override willUpdate(changed: PropertyValues) {
    if (changed.has('variant')) {
      const mapped = LEGACY_VARIANTS[this.variant as string];
      if (mapped) this.variant = mapped;
    }
  }

  protected override firstUpdated() {
    this._queueMeasure();
    // Item widths change once the real webfont replaces the fallback.
    document.fonts?.ready.then(() => this._queueMeasure());
  }

  protected override updated(changed: PropertyValues) {
    if (changed.has('breakpoint') || changed.has('variant') || changed.has('overflowLabel')) {
      this._queueMeasure();
    }
  }

  /** Coalesce bursts of resize/slot events into one measure per frame. */
  private _queueMeasure() {
    if (this._measuring || this._measureQueued) return;
    this._measureQueued = true;
    requestAnimationFrame(() => {
      this._measureQueued = false;
      this._updateOverflow();
    });
  }

  /** Navigation items in the default and overflow slots, in source order. */
  private get _items(): HTMLElement[] {
    return Array.from(this.children).filter(
      (el) => el.slot !== 'actions'
    ) as HTMLElement[];
  }

  /** Put an item back in the row, clearing everything the menu stamped on it. */
  private _restoreToRow(item: HTMLElement) {
    item.removeAttribute('slot');
    item.removeAttribute('in-menu');
    item.removeAttribute('role');
    item.removeAttribute('tabindex');
  }

  /**
   * Move an item into the menu panel.
   *
   * The menu stamps these too, from its own side. We do it here as well because
   * we already know exactly which items moved, so the panel styling never has to
   * wait on slot resolution or a slotchange that some engines skip for forwarded
   * slots.
   */
  private _moveToMenu(item: HTMLElement) {
    item.setAttribute('slot', 'overflow');
    item.setAttribute('in-menu', '');
    item.setAttribute('role', 'menuitem');
    item.setAttribute('tabindex', '-1');
  }

  /**
   * Decide which items fit and move the rest into the menu.
   *
   * Everything here runs in one synchronous block: items are put back in the row,
   * measured at their natural width, and reassigned before the browser paints —
   * so the reshuffle is never visible.
   */
  private _updateOverflow() {
    if (!this.isConnected || !this._nav) return;

    const items = this._items;
    if (!items.length) return;

    const hostWidth = this.getBoundingClientRect().width;
    // Zero width means we are not laid out yet (hidden tab, detached subtree).
    if (hostWidth === 0) return;

    this._measuring = true;

    try {
      // Scroll mode: everything back in the row, no menu. Either the bar is too
      // narrow to collapse, or it is a tab bar — tabs always scroll, they never
      // hide a tab behind a menu.
      if (this.variant !== 'main-nav' || hostWidth <= BREAKPOINTS[this.breakpoint]) {
        items.forEach((item) => this._restoreToRow(item));
        this._collapsed = false;
        this._hasOverflow = false;
        return;
      }

      // Collapse mode. Measure from a clean row with the menu visible, so the
      // trigger's own width is part of the budget.
      items.forEach((item) => this._restoreToRow(item));
      this._collapsed = true;
      this._hasOverflow = true;
      this.performUpdate();

      const gap = parseFloat(getComputedStyle(this._nav).columnGap) || 0;
      const widths = items.map((item) => item.getBoundingClientRect().width);
      const triggerWidth = this._overflowMenu?.getBoundingClientRect().width ?? 0;
      const actionsWidth = this._hasActions
        ? (this._actionsSlot?.getBoundingClientRect().width ?? 0) + gap
        : 0;

      const available = this._nav.clientWidth - actionsWidth;
      const total = widths.reduce((sum, w) => sum + w, 0) + gap * (items.length - 1);

      // Everything fits — no menu at all.
      if (total <= available) {
        this._hasOverflow = false;
        return;
      }

      // Greedily fill the row, always leaving room for the trigger.
      const budget = available - triggerWidth - gap;
      const visible: number[] = [];
      let used = 0;
      for (let i = 0; i < items.length; i++) {
        const next = used + widths[i] + (visible.length ? gap : 0);
        if (next > budget) break;
        visible.push(i);
        used = next;
      }

      // The current page must stay in sight: if the active item did not make the
      // cut, drop trailing visible items until it fits, then put it back.
      const activeIndex = items.findIndex((item) => item.hasAttribute('active'));
      if (activeIndex >= 0 && !visible.includes(activeIndex)) {
        used += widths[activeIndex] + (visible.length ? gap : 0);
        while (visible.length && used > budget) {
          const dropped = visible.pop() as number;
          used -= widths[dropped] + gap;
        }
        visible.push(activeIndex);
      }

      const keep = new Set(visible);
      items.forEach((item, i) => {
        if (keep.has(i)) this._restoreToRow(item);
        else this._moveToMenu(item);
      });

      this._hasOverflow = keep.size < items.length;
      // The menu stamps role/tabindex/in-menu on what it holds; slotchange does
      // not fire for it when items move through the forwarding slot.
      (this._overflowMenu as { syncItems?: () => void })?.syncItems?.();
    } finally {
      this._measuring = false;
    }
  }

  /**
   * The actions slot is a flex item with `margin-inline-start: auto`. While it is
   * empty that auto margin eats all the free space, which would leave `main-nav`
   * nothing to distribute — so an empty slot is taken out of the layout entirely.
   */
  private _onActionsSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasActions = slot.assignedNodes({ flatten: true }).length > 0;
    this._queueMeasure();
  }

  private _onSlotChange() {
    if (this._measuring) return;
    this._queueMeasure();
  }

  render() {
    return html`
      <nav
        part="nav"
        class=${classMap({ collapsed: this._collapsed })}
        aria-label=${this.ariaLabel}
      >
        <slot @slotchange=${this._onSlotChange}></slot>

        <minis-menu
          class="overflow"
          label=${this.overflowLabel}
          placement="end"
          ?hidden=${!this._hasOverflow}
        >
          <slot name="overflow"></slot>
        </minis-menu>

        <slot
          name="actions"
          class="actions"
          ?hidden=${!this._hasActions}
          @slotchange=${this._onActionsSlotChange}
        ></slot>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-navigation': MinisNavigation;
  }
}
