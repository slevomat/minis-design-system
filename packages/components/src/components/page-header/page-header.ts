import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { pageHeaderStyles } from './page-header.styles.js';
import '../badge/badge.js';

export type PageHeaderTheme = 'brand' | 'blue' | 'yellow' | 'pink' | 'green';

/**
 * Mini*S Page Header component.
 *
 * A full-width branded banner used at the top of category/campaign pages.
 * Switches between horizontal (desktop) and stacked (mobile) layout automatically.
 *
 * @slot           - Heading content — supports rich HTML including `<br>` for line breaks.
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

  /** Badge color: red (pink) seal on every theme; blue seal on the pink theme for contrast. */
  private get _badgeColor(): 'pink' | 'blue' {
    return this.theme === 'pink' ? 'blue' : 'pink';
  }

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
                <slot></slot>
              </h1>
              ${!this.noBadge ? html`
                <minis-badge class="badge-desktop" size="md" color="${this._badgeColor}"></minis-badge>
                <minis-badge class="badge-mobile" size="sm" color="${this._badgeColor}"></minis-badge>
              ` : nothing}
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
