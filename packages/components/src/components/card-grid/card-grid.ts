import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cardGridStyles } from './card-grid.styles.js';

export type CardGridVariant = 'navigation' | 'navigation-small' | 'navigation-small-3' | 'photogallery';

/**
 * Mini*S Card Grid Component
 *
 * A responsive grid layout for holding cards or images. Three variants
 * match the main Slevomat page patterns:
 *
 * - **navigation** — 4-column grid with a featured card spanning 2 columns
 *   (top-left) and a wide card on the second row (bottom-right). On mobile,
 *   switches to a 2×4 horizontally-scrollable equal-size grid.
 *
 * - **navigation-small** — 4-column uniform grid, 2 rows, 8 slots. On mobile,
 *   horizontally scrollable like `navigation`.
 *
 * - **navigation-small-3** — 4-column uniform grid, 3 rows, 12 slots. On mobile,
 *   collapses to a 4×2 scroll strip.
 *
 * - **photogallery** — Asymmetric 5-column layout: one large image on the left
 *   (spanning 3 cols × 3 rows), a wide image top-right (2 cols × 2 rows), and
 *   two small thumbnails bottom-right. On mobile, shows only the first (large)
 *   image full-width.
 *
 * The grid enforces a fixed aspect ratio via `--card-grid-aspect-ratio`
 * (default `1 / 1` for navigation variants, `4 / 3` for photogallery).
 * Set `--card-grid-height` to control the overall grid height instead.
 *
 * @slot - Card or image elements. Grid placement is automatic based on variant.
 *
 * @example
 * ```html
 * <!-- Navigation grid (6 cards: first is featured) -->
 * <minis-card-grid variant="navigation" style="height:400px">
 *   <div class="card featured">Featured</div>
 *   <div class="card">Card 2</div>
 *   <div class="card">Card 3</div>
 *   <div class="card">Card 4</div>
 *   <div class="card">Card 5</div>
 *   <div class="card wide">Card 6</div>
 * </minis-card-grid>
 *
 * <!-- Navigation-small (8 uniform cards, 2 rows) -->
 * <minis-card-grid variant="navigation-small" style="height:300px">
 *   <div class="card">1</div>
 *   <!-- … 7 more -->
 * </minis-card-grid>
 *
 * <!-- Photogallery (4 images) -->
 * <minis-card-grid variant="photogallery" style="height:352px">
 *   <img src="big.jpg" />
 *   <img src="top-right.jpg" />
 *   <img src="bottom-right-1.jpg" />
 *   <img src="bottom-right-2.jpg" />
 * </minis-card-grid>
 * ```
 */
@customElement('minis-card-grid')
export class MinisCardGrid extends LitElement {
  static styles = cardGridStyles;

  /** Layout variant */
  @property({ type: String, reflect: true })
  variant: CardGridVariant = 'navigation';

  render() {
    return html`<div class="grid"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-card-grid': MinisCardGrid;
  }
}
