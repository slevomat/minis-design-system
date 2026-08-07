import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { pageHeaderStyles } from './page-header.styles.js';
import '../badge/badge.js';
import type { BadgeColor } from '../badge/badge.js';

export type PageHeaderTheme = 'brand' | 'blue' | 'yellow' | 'pink' | 'green' | 'summer';

/**
 * Badge seal colour per theme — each pairing is taken straight from Figma and
 * chosen so the seal reads against its own theme surface rather than blending
 * into it. Note the `green` theme also recolours the checkmark (see the styles).
 */
const BADGE_COLOR_BY_THEME: Record<PageHeaderTheme, BadgeColor> = {
  brand: 'pink',
  blue: 'brand',
  yellow: 'summer',
  pink: 'blue',
  green: 'yellow',
  summer: 'green',
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
 *
 * @example
 * ```html
 * <minis-page-header theme="brand" description="Dnešní 30% sleva navíc vám nesmí uniknout.">
 *   Ušetřete za pobyt<br>v italském Rimini
 *   <img slot="image" src="photo.png" alt="">
 *   <minis-button slot="button" variant="transparent" size="xl">Zjistit více</minis-button>
 * </minis-page-header>
 * ```
 */
@customElement('minis-page-header')
export class MinisPageHeader extends LitElement {
  static styles = pageHeaderStyles;

  /** Color theme — sets background and text colors. */
  @property({ type: String, reflect: true })
  theme: PageHeaderTheme = 'brand';

  /** Optional body text shown below the heading. */
  @property({ type: String })
  description = '';

  /** Optional countdown/label pill shown above the heading. */
  @property({ type: String })
  tag = '';

  /** Hide the Brand/Badge checkmark seal next to the heading (shown by default). */
  @property({ type: Boolean, attribute: 'no-badge', reflect: true })
  noBadge = false;

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

  render() {
    return html`
      <div class="root" part="root">
        <div class="container" part="container">

          <div class="content" part="content">
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
            </div>

            ${this.description ? html`
              <p class="description" part="description">${this.description}</p>
            ` : nothing}

            <slot name="button" class="button-slot"></slot>
          </div>

          <div class="image-area" part="image-area">
            <slot name="image"></slot>
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
