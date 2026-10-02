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
 */
export type PageHeaderLayout = 'default' | 'inspirations';

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
 * @slot image     - Decorative photo. Provide a PNG with transparent blob-shaped background
 *                   for the signature organic look; any `<img>` works and will be cropped
 *                   to the container bounds.
 * @slot message   - Optional "Message on product" banner above the tag (draft markup,
 *                   see the message docs). Designed for `layout="inspirations"`.
 * @slot more      - Extra content revealed by the "Více informací" toggle. The toggle
 *                   only renders when this slot has content.
 * @slot controls  - Controls row below the content, e.g. a search input + button.
 *                   Stacks full-width on mobile, a row up to 600px wide on desktop
 *                   (buttons hug, everything else grows). Designed for `layout="inspirations"`.
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
   * makes the visible gap land on `--page-header-badge-gap` instead of
   * `--page-header-badge-gap` plus an arbitrary space.
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

  private _onMoreSlotChange(e: Event) {
    this._hasMore = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

  private _onControlsSlotChange(e: Event) {
    this._hasControls = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

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

          <div class="image-area" part="image-area">
            <slot name="image"></slot>
          </div>

          <div class="controls" part="controls" ?hidden="${!this._hasControls}">
            <slot name="controls" @slotchange="${this._onControlsSlotChange}"></slot>
          </div>

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
