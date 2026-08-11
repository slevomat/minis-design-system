import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { topbarStyles } from './topbar.styles.js';

export type TopbarVariant = 'web' | 'vibe-apps';

/**
 * Mini*S Topbar component (Figma: **TopBar**).
 *
 * Meant to be used at the top of any Slevomat web page or vibe-coded app —
 * both purposes have their own variant. Sits above `<minis-navigation>` and
 * `<minis-page-header>`.
 *
 * - `web` (default) — the Slevomat website header: logo, optional search,
 *   and action buttons (shortcuts, account, cart) on the right.
 * - `vibe-apps` — the header for vibe-coded apps and prototypes: logo on the
 *   left with the app's own name (`app-name`) directly beside it, and nothing
 *   else — this variant carries no search and no actions.
 *
 * The topbar is layout-neutral: it has no background and no max-width of its
 * own, so place it inside `<minis-container>` (or your own full-bleed band) to
 * get the page's 1240px measure and responsive padding.
 *
 * @slot logo    - Brand logo (left) — typically an `<img>` or `<svg>`, max-height 30px.
 * @slot search  - Optional search field, `web` variant only. The design system has no
 *                 input component yet, so nothing is rendered for you — slot your own.
 * @slot actions - Right-side action buttons — several `<minis-button>` elements.
 *                 `web` variant only; `vibe-apps` renders no actions.
 *
 * @example
 * ```html
 * <minis-topbar>
 *   <img slot="logo" src="/logo.svg" alt="Slevomat" />
 *   <minis-button slot="actions" variant="cta-buy">
 *     <minis-icon slot="icon" name="cart-fill"></minis-icon>
 *     Košík
 *   </minis-button>
 * </minis-topbar>
 *
 * <minis-topbar variant="vibe-apps" app-name="My app">
 *   <img slot="logo" src="/logo.svg" alt="Slevomat" />
 * </minis-topbar>
 * ```
 */
@customElement('minis-topbar')
export class MinisTopbar extends LitElement {
  static styles = topbarStyles;

  /** Where the header is used — the Slevomat website (`web`) or a vibe-coded app (`vibe-apps`). */
  @property({ type: String, reflect: true })
  variant: TopbarVariant = 'web';

  /** App name shown next to the logo. `vibe-apps` variant only — ignored in `web`. */
  @property({ type: String, attribute: 'app-name' })
  appName = '';

  /** Whether anything is slotted into `search` — an empty slot must not reserve width. */
  @state()
  private _hasSearch = false;

  private _onSearchSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this._hasSearch = slot.assignedNodes({ flatten: true }).length > 0;
  };

  render() {
    // `vibe-apps` is the whole bar: logo + app name, nothing else. It has no
    // search and no actions, so neither slot is rendered — anything passed to
    // them stays unassigned and is not displayed.
    if (this.variant === 'vibe-apps') {
      return html`
        <div class="topbar" part="topbar">
          <div class="logo" part="logo">
            <slot name="logo"></slot>
          </div>

          ${this.appName
            ? html`<span class="app-name" part="app-name">${this.appName}</span>`
            : nothing}
        </div>
      `;
    }

    return html`
      <div class="topbar" part="topbar">
        <div class="logo" part="logo">
          <slot name="logo"></slot>
        </div>

        <div class="search" part="search" ?hidden=${!this._hasSearch}>
          <slot name="search" @slotchange=${this._onSearchSlotChange}></slot>
        </div>

        <div class="actions" part="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-topbar': MinisTopbar;
  }
}
