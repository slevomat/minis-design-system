import { css } from 'lit';

export const tileStyles = css`
  :host {
    display: block;
    /* Ensures both side paddings are always visible; labels truncate instead of padding collapsing. */
    min-width: calc(2 * var(--tile-padding-x, 32px));
  }

  /* =====================
     BASE TILE ELEMENT
     ===================== */

  .tile {
    box-sizing: border-box;
    display: inline-flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--tile-gap-elements-y, 4px);
    padding: var(--tile-padding-top, 12px) var(--tile-padding-x, 32px) var(--tile-padding-bottom, 12px);
    background: var(--tile-surface, #fff);
    border: var(--button-border-width, 1px) solid var(--tile-border, #cbccce);
    border-radius: var(--button-border-radius, 8px);
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 120ms ease;
  }

  /* =====================
     HOVER STATE
     ===================== */

  .tile:hover {
    background: var(--tile-hover-surface, #e6f7fc);
  }

  /* =====================
     DISABLED STATE
     Handled via host attr and native button[disabled].
     Using opacity + pointer-events mirrors the Figma disabler overlay approach.
     ===================== */

  :host([disabled]) .tile,
  .tile:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  /* =====================
     FOCUS STATE
     ===================== */

  .tile:focus-visible {
    outline: 2px solid var(--color-border-focus, #4a90d9);
    outline-offset: 2px;
  }

  /* =====================
     ICON SLOT (24×24)
     ===================== */

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--pixel-px-24, 24px);
    height: var(--pixel-px-24, 24px);
    overflow: hidden;
    color: var(--tile-icon-color, #006eb9);
  }

  .icon ::slotted(*) {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* =====================
     LABEL ROW (text + optional counter)
     Fixed height keeps the tile at 70px regardless of counter presence:
     1(border) + 12(pt) + 24(icon) + 4(gap) + 16(label-row) + 12(pb) + 1(border) = 70px
     ===================== */

  .label-row {
    display: flex;
    width: 100%; /* constrains to the tile's content area so label+counter never spill into padding */
    align-items: center;
    justify-content: center;
    gap: var(--tile-gap-elements-x, 8px);
    height: var(--tile-label-row-height, 16px);
    flex-shrink: 0;
    /* overflow: visible — pill (18px) is taller than this row (16px) but the
       tile's own overflow:hidden clips everything at the tile boundary. */
  }

  /* =====================
     LABEL TEXT
     ===================== */

  .label {
    font-family: var(--typography-font-family-sans, Inter, sans-serif);
    font-size: var(--typography-size-sm, 14px);
    font-weight: var(--typography-weight-medium, 500);
    line-height: 1;
    color: var(--tile-text, currentColor);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* =====================
     COUNTER PILL (inline, right of label)
     Mirrors minis-pill-counter appearance with inverted colour pair.
     ===================== */

  .counter {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    height: var(--pixel-px-18, 18px);
    min-width: var(--pixel-px-18, 18px);
    padding: var(--pixel-px-3, 3px) var(--pixel-px-4, 4px);
    box-sizing: border-box;
    background: var(--tile-counter-surface, currentColor);
    border-radius: 50px;
    font-family: var(--typography-font-family-sans, Inter, sans-serif);
    font-size: var(--typography-size-xs, 12px);
    font-weight: var(--typography-weight-bold, 700);
    line-height: 1;
    color: var(--tile-counter-text, #fff);
    white-space: nowrap;
  }
`;
