import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { pageHeaderStyles } from './page-header.styles.js';
import '../badge/badge.js';
import '@minis/icons';
import type { BadgeColor } from '../badge/badge.js';

export type PageHeaderTheme = 'brand' | 'blue' | 'yellow' | 'pink' | 'green' | 'summer';

/**
 * `default` — the original hero: image right, vertically centred; stacked and
 * centred on mobile. Not in Figma any more; kept until the Simple / Centered
 * simple layouts land.
 * `inspirations` — Figma `Layout=Inspirations` ("With Controls"): left-aligned
 * content, photo cropped into the top-right corner, optional controls row.
 * `content-left` — Figma `Layout=Content left`: Inspirations without controls.
 * From 768px the photo is vertically centred, cropped top and bottom when the
 * content is shorter, and it holds its position while `more` is expanded.
 * `centric` — Figma `Layout=Centric`: no photo, everything centred. Controls
 * (category filters) wrap on desktop and become a swipeable row on mobile.
 */
export type PageHeaderLayout = 'default' | 'inspirations' | 'content-left' | 'centric';

/**
 * Badge seal colour per theme — each pairing is taken straight from Figma and
 * chosen so the seal reads against its own theme surface rather than blending
 * into it.
 */
const BADGE_COLOR_BY_THEME: Record<PageHeaderTheme, BadgeColor> = {
  brand: 'pink',
  yellow: 'pink',
  summer: 'green',
  pink: 'brand',
  green: 'summer',
  blue: 'brand',
};

/**
 * Mini*S Page Header component.
 *
 * Also known as a *hero*. A full-width branded banner in one of the brand colour
 * themes, used as the **first content element** of a page — placed directly under
 * the Slevomat header (`<minis-topbar>`) and the main navigation
 * (`<minis-navigation>`), typically on category and campaign pages.
 * Switches between horizontal (desktop) and stacked (mobile) layout automatically.
 *
 * @slot           - Heading content — supports rich HTML including `<br>` for line breaks.
 *                   Keep it inline-level: the Brand/Badge seal flows inline after the
 *                   last line of this content, so a block-level child would push it
 *                   onto a line of its own.
 * @slot button    - Optional CTA button (`<minis-button variant="transparent" size="xl">`).
 * @slot image     - Decorative photo (not rendered with `layout="centric"`). Provide a PNG with transparent blob-shaped background
 *                   for the signature organic look; any `<img>` works and will be cropped
 *                   to the container bounds.
 * @slot message   - Optional "Message on product" banner above the tag (draft markup,
 *                   see the message docs). Designed for `layout="inspirations"`.
 * @slot more      - Extra content revealed by the "Více informací" toggle. The toggle
 *                   only renders when this slot has content.
 * @slot controls  - Controls row below the content, e.g. a search input + button.
 *                   Stacks full-width on mobile, a row up to 600px wide on desktop
 *                   (buttons hug, everything else grows). Designed for `layout="inspirations"`;
 *                   not rendered at all with `layout="content-left"` (a console warning
 *                   flags it). The only place for search and filters in the header.
 *                   With `layout="centric"`: a centred row (e.g. category tags) that
 *                   wraps on desktop and scrolls sideways with edge fades on mobile.
 *
 * @fires location-click - The location switcher (`location` attribute) was clicked.
 * @fires more-toggle    - The "more" toggle was clicked; `detail.expanded` is the new state.
 *
 * @example
 * ```html
 * <minis-page-header theme="brand" description="Dnešní 30% sleva navíc vám nesmí uniknout.">
 *   Ušetřete za pobyt<br>v italském Rimini
 *   <img slot="image" src="photo.png" alt="">
 *   <minis-button slot="button" variant="transparent" size="xl">Zjistit více</minis-button>
 * </minis-page-header>
 *
 * <!-- Inspirations ("With Controls") -->
 * <minis-page-header layout="inspirations" theme="brand" description="…">
 *   Ušetřete za pobyt<br>v italském Rimini
 *   <img slot="image" src="blob-photo.png" alt="">
 *   <input slot="controls" type="search" placeholder="Kam chcete vyrazit?">
 *   <minis-button slot="controls" variant="transparent" size="lg" full-width>Vyhledat</minis-button>
 * </minis-page-header>
 *
 * <!-- Content left -->
 * <minis-page-header layout="content-left" theme="brand" description="…">
 *   Ušetřete za pobyt<br>v italském Rimini
 *   <img slot="image" src="blob-photo.png" alt="">
 *   <p slot="more">…</p>
 * </minis-page-header>
 * ```
 */
@customElement('minis-page-header')
export class MinisPageHeader extends LitElement {
  static styles = pageHeaderStyles;

  /** Color theme — sets background and text colors. */
  @property({ type: String, reflect: true })
  theme: PageHeaderTheme = 'brand';

  /** Layout — matches the Figma `Layout` variant. */
  @property({ type: String, reflect: true })
  layout: PageHeaderLayout = 'default';

  /** Optional body text shown below the heading. */
  @property({ type: String })
  description = '';

  /** Optional countdown/label pill shown above the heading. */
  @property({ type: String })
  tag = '';

  /** Hide the Brand/Badge checkmark seal next to the heading (shown by default). */
  @property({ type: Boolean, attribute: 'no-badge', reflect: true })
  noBadge = false;

  /** Optional location switcher under the heading (underlined, with a dropdown chevron). */
  @property({ type: String })
  location = '';

  /** Whether the `more` slot is revealed. */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /** Label of the toggle that reveals the `more` slot. */
  @property({ type: String, attribute: 'more-label' })
  moreLabel = 'Více informací';

  @state() private _hasMore = false;
  @state() private _hasControls = false;

  /** Badge seal colour for the current theme. */
  private get _badgeColor(): BadgeColor {
    return BADGE_COLOR_BY_THEME[this.theme] ?? BADGE_COLOR_BY_THEME.brand;
  }

  private _resizeObserver?: ResizeObserver;

  /** (Re)observe the boxes whose size drives `_positionVisual` and the swipe fades. */
  private _observe() {
    if (typeof ResizeObserver === 'undefined') return;
    this._resizeObserver ??= new ResizeObserver(() => {
      this._positionVisual();
      this._updateSwipeFades();
    });
    this._resizeObserver.disconnect();
    for (const sel of ['.container', '.more', '.controls-row']) {
      const el = this.renderRoot.querySelector(sel);
      if (el) this._resizeObserver.observe(el);
    }
  }

  firstUpdated() {
    this._measureSpace();
    // The brand face (Kensington, or the Bebas Neue fallback) usually resolves
    // after first paint — re-measure once whichever one lands.
    document.fonts?.ready.then(() => this._measureSpace());
  }

  /**
   * The badge sits inline after the heading text, separated by exactly one word
   * space (the template emits one; any trailing space in the slotted markup
   * collapses into it). CSS cannot know that space's advance, so measure it in
   * the heading's own font and let the badge's margin subtract it — that is what
   * makes the visible gap land on the badge gap instead of the gap plus an
   * arbitrary space.
   */
  private _measureSpace = () => {
    const heading = this.renderRoot?.querySelector('.heading') as HTMLElement | null;
    if (!heading) return;

    const probe = document.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;pointer-events:none';
    heading.append(probe);
    probe.textContent = 'x x';
    const withSpace = probe.getBoundingClientRect().width;
    probe.textContent = 'xx';
    const withoutSpace = probe.getBoundingClientRect().width;
    probe.remove();

    const fontSize = parseFloat(getComputedStyle(heading).fontSize);
    if (!fontSize) return;
    // Store as a ratio of the font size so it survives the responsive size step.
    heading.style.setProperty('--_space-advance', `${(withSpace - withoutSpace) / fontSize}`);
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    // Re-attach after a DOM move (disconnectedCallback dropped the observer).
    if (this.hasUpdated) this._observe();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('layout')) this._observe();
    if (changed.has('layout') || changed.has('expanded')) this._positionVisual();
    if (changed.has('layout')) this._updateSwipeFades();
    if (changed.has('layout') && this.layout === 'content-left' && this.querySelector(':scope > [slot="controls"]')) {
      // Search and filters belong in the `controls` slot of `inspirations` / `centric` only.
      console.warn(
        '<minis-page-header layout="content-left"> has no controls area — slot="controls" content is not rendered. Use layout="inspirations" (search) or layout="centric" (category tags).',
        this,
      );
    }
  }

  /**
   * `content-left`: the photo is centred on the banner as it would be with
   * `more` collapsed, so opening it grows the banner without moving the photo.
   * CSS alone can't do it — `more` sits mid-column (toggle and button follow
   * it), so there is no box that spans everything except `more`. Instead,
   * subtract the open `more` block and its gap from the container height.
   * Collapsed, this equals 50%, which is also the CSS fallback.
   */
  private _positionVisual = () => {
    const container = this.renderRoot?.querySelector('.container') as HTMLElement | null;
    if (!container) return;
    if (this.layout !== 'content-left') {
      container.style.removeProperty('--_visual-center');
      return;
    }

    let height = container.getBoundingClientRect().height;
    const more = this.renderRoot.querySelector('.more') as HTMLElement | null;
    if (more && !more.hidden) {
      const content = this.renderRoot.querySelector('.content') as HTMLElement;
      height -= more.getBoundingClientRect().height + (parseFloat(getComputedStyle(content).rowGap) || 0);
    }
    container.style.setProperty('--_visual-center', `${height / 2}px`);
  };

  private _onMoreSlotChange(e: Event) {
    this._hasMore = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

  private _onControlsSlotChange(e: Event) {
    this._hasControls = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
    this._updateSwipeFades();
  }

  /**
   * `centric` on mobile: the controls row scrolls sideways. A fade at each edge
   * signals more content that way — shown only while there is something left to
   * scroll to, so the first and last items are never dimmed at rest.
   */
  private _updateSwipeFades = () => {
    const controls = this.renderRoot?.querySelector('.controls') as HTMLElement | null;
    const row = this.renderRoot?.querySelector('.controls-row') as HTMLElement | null;
    if (!controls || !row) return;
    const max = row.scrollWidth - row.clientWidth;
    const scrollable = this.layout === 'centric' && max > 1;
    // scrollLeft is negative in RTL; compare magnitudes.
    const pos = Math.abs(row.scrollLeft);
    controls.toggleAttribute('data-fade-start', scrollable && pos > 1);
    controls.toggleAttribute('data-fade-end', scrollable && pos < max - 1);
  };

  private _toggleMore() {
    this.expanded = !this.expanded;
    this.dispatchEvent(
      new CustomEvent('more-toggle', {
        detail: { expanded: this.expanded },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onLocationClick() {
    this.dispatchEvent(new CustomEvent('location-click', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="root" part="root">
        <div class="container" part="container">

          <div class="content" part="content">
            <slot name="message" class="message-slot"></slot>

            ${this.tag ? html`
              <span class="tag" part="tag">${this.tag}</span>
            ` : nothing}

            <div class="heading-row" part="heading-row">
              <h1 class="heading" part="heading">
                <slot @slotchange="${this._measureSpace}"></slot>${!this.noBadge ? html` <span
                  class="badge-anchor"
                  part="badge-anchor"
                  ><minis-badge class="badge" part="badge" color="${this._badgeColor}"></minis-badge
                ></span>` : nothing}
              </h1>
              ${this.location ? html`
                <button class="location" part="location" type="button" @click="${this._onLocationClick}">
                  <span class="location-label">${this.location}</span>
                  <minis-icon class="location-icon" name="expand" size="16"></minis-icon>
                </button>
              ` : nothing}
            </div>

            ${this.description ? html`
              <p class="description" part="description">${this.description}</p>
            ` : nothing}

            <div class="more" part="more" id="more" ?hidden="${!this.expanded}">
              <slot name="more" @slotchange="${this._onMoreSlotChange}"></slot>
            </div>
            ${this._hasMore ? html`
              <button
                class="more-toggle"
                part="more-toggle"
                type="button"
                aria-controls="more"
                aria-expanded="${this.expanded ? 'true' : 'false'}"
                @click="${this._toggleMore}"
              >${this.moreLabel}</button>
            ` : nothing}

            <slot name="button" class="button-slot"></slot>
          </div>

          ${this.layout !== 'centric' ? html`
            <div class="image-area" part="image-area">
              <slot name="image"></slot>
            </div>
          ` : nothing}

          ${this.layout !== 'content-left' ? html`
            <div class="controls" part="controls" ?hidden="${!this._hasControls}">
              <slot
                name="controls"
                class="controls-row"
                @slotchange="${this._onControlsSlotChange}"
                @scroll="${this._updateSwipeFades}"
              ></slot>
            </div>
          ` : nothing}

        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-page-header': MinisPageHeader;
  }
}
