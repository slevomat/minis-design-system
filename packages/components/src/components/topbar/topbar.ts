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
 *   left, the app's own name on the right (`app-name`).
 *
 * The topbar is layout-neutral: it has no background and no max-width of its
 * own, so place it inside `<minis-container>` (or your own full-bleed band) to
 * get the page's 1240px measure and responsive padding.
 *
 * @slot logo    - Brand logo (left) — typically an `<img>` or `<svg>`, max-height 30px.
 * @slot search  - Optional search field, `web` variant only. The design system has no
 *                 input component yet, so nothing is rendered for you — slot your own.
 * @slot actions - Right-side action buttons — several `<minis-button>` elements.
 *                 Available in both variants; in `vibe-apps` they render after the app name.
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

  /** App name shown on the right. `vibe-apps` variant only — ignored in `web`. */
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
    const isVibeApps = this.variant === 'vibe-apps';

    return html`
      <div class="topbar" part="topbar">
        <div class="logo" part="logo">
          <slot name="logo"></slot>
        </div>

        ${isVibeApps
          ? nothing
          : html`
              <div class="search" part="search" ?hidden=${!this._hasSearch}>
                <slot name="search" @slotchange=${this._onSearchSlotChange}></slot>
              </div>
            `}

        <div class="actions" part="actions">
          ${isVibeApps && this.appName
            ? html`<span class="app-name" part="app-name">${this.appName}</span>`
            : nothing}
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
