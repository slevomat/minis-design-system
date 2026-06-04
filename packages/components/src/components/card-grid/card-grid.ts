import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cardGridStyles } from './card-grid.styles.js';

export type CardGridVariant = 'navigation' | 'navigation-small' | 'photogallery';

/** Number of vertical photo slots in the navigation variant (desktop only). */
export type CardGridVerticalSlots = '0' | '1' | '2';

/**
 * Mini*S Card Grid Component
 *
 * A layout component for arranging cards or photos into responsive grids.
 * Use it for photo galleries (hotel/venue detail pages) and category
 * navigation (homepage card grids). It provides the grid structure only —
 * slot any content (card components, `<img>`, `<a>`, `<div>`) as children.
 *
 * Three variants cover these patterns:
 *
 * - **navigation** — 4-column grid with a featured card spanning 2 columns
 *   (top-left) and a wide card on the second row (bottom-right). On mobile,
 *   switches to a 2×4 horizontally-scrollable equal-size grid.
 *
 * - **navigation-small** — 4-column uniform grid. Number of rows controlled by
 *   the `rows` attribute (default `2` → 8 slots, set `rows="3"` → 12 slots).
 *   On mobile, horizontally scrollable (always collapses to 2 rows).
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
 * <!-- Navigation-small 3 rows (12 uniform cards) -->
 * <minis-card-grid variant="navigation-small" rows="3" style="height:448px">
 *   <div class="card">1</div>
 *   <!-- … 11 more -->
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

  /** Number of rows for navigation-small variant (2 or 3). Default: 2. */
  @property({ type: Number, reflect: true })
  rows?: number;

  /**
   * Number of vertical photo slots for the navigation variant (desktop only).
   * - '0' — standard layout (featured + wide card, default)
   * - '1' — one tall vertical photo (child 2, col 3, full height)
   * - '2' — two tall vertical photos (children 2 and 4, cols 1–2, full height)
   */
  @property({ type: String, attribute: 'vertical-slots', reflect: true })
  verticalSlots: CardGridVerticalSlots = '0';

  render() {
    return html`<div class="host-wrapper"><div class="grid"><slot></slot></div></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-card-grid': MinisCardGrid;
  }
}
