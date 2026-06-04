import { css } from 'lit';

export const cardGridStyles = css`
  /* =====================
     HOST — container context
     ===================== */

  :host {
    display: block;
    container-type: inline-size;
  }

  /* =====================
     HOST WRAPPER — carries overflow, border-radius, height
     (container queries target this, not :host itself)
     ===================== */

  .host-wrapper {
    overflow: hidden;
    border-radius: var(--card-grid-border-radius, var(--border-radius-xl, 16px));
    width: 100%;
  }

  /* =====================
     BASE GRID
     ===================== */

  .grid {
    display: grid;
    gap: var(--card-grid-gap, 8px);
    width: 100%;
    height: 100%;
  }

  /* =====================
     SLOT ITEMS — default background
     ===================== */

  ::slotted(*) {
    display: block;
    min-width: 0;
    min-height: 0;
    background: var(--card-grid-slot-bg, var(--color-surface-faded, #f1f3f5));
  }

  /* =====================
     VARIANT: navigation
     4 cols, 2 rows — item 1 featured (span 2), item 6 wide (span 2)
     Desktop default height: 584px
     ===================== */

  :host([variant="navigation"]) .host-wrapper {
    height: var(--card-grid-height, 584px);
  }

  :host([variant="navigation"]) .grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 1fr;
  }

  :host([variant="navigation"]) ::slotted(:nth-child(1)) {
    grid-column: span 2;
  }

  :host([variant="navigation"]) ::slotted(:nth-child(6)) {
    grid-column: span 2;
  }

  /* Mobile */
  @container (max-width: 767px) {
    :host([variant="navigation"]) .host-wrapper {
      height: var(--card-grid-height, calc(2 * var(--card-grid-xs-item-size, 172px) + var(--card-grid-gap, 8px)));
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
    }
    :host([variant="navigation"]) .host-wrapper::-webkit-scrollbar {
      display: none;
    }
    :host([variant="navigation"]) .grid {
      grid-template-columns: repeat(3, var(--card-grid-xs-item-size, 172px));
      grid-auto-rows: var(--card-grid-xs-item-size, 172px);
      height: auto;
    }
    :host([variant="navigation"]) ::slotted(:nth-child(1)),
    :host([variant="navigation"]) ::slotted(:nth-child(6)) {
      grid-column: span 1;
    }
  }

  /* =====================
     VARIANT: navigation — vertical-slots="1"
     Desktop only: child 2 spans both rows in col 3 (tall vertical photo)
     Layout: [C1 C1 C2 C3]
              [C4 C5 C2 C6]
     ===================== */

  :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(1)) {
    grid-column: 1 / span 2;
    grid-row: 1;
  }

  :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(2)) {
    grid-column: 3;
    grid-row: 1 / span 2;
  }

  :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(3)) {
    grid-column: 4;
    grid-row: 1;
  }

  :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(4)) {
    grid-column: 1;
    grid-row: 2;
  }

  :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(5)) {
    grid-column: 2;
    grid-row: 2;
  }

  :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(6)) {
    grid-column: 4;
    grid-row: 2;
  }

  /* =====================
     VARIANT: navigation — vertical-slots="2"
     Desktop only: children 1 and 2 each span both rows (cols 1 and 2)
     Layout: [C1 C2 C3 C5]
              [C1 C2 C4 C6]
     ===================== */

  :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(1)) {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(2)) {
    grid-column: 2;
    grid-row: 1 / span 2;
  }

  :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(3)) {
    grid-column: 3;
    grid-row: 1;
  }

  :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(4)) {
    grid-column: 3;
    grid-row: 2;
  }

  :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(5)) {
    grid-column: 4;
    grid-row: 1;
  }

  :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(6)) {
    grid-column: 4;
    grid-row: 2;
  }

  /* Mobile: reset all explicit placements for vertical-slots="1" and "2".
     Use :nth-child selectors (not ::slotted(*)) to match desktop specificity. */
  @container (max-width: 767px) {
    :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(1)),
    :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(2)),
    :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(3)),
    :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(4)),
    :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(5)),
    :host([variant="navigation"][vertical-slots="1"]) ::slotted(:nth-child(6)),
    :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(1)),
    :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(2)),
    :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(3)),
    :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(4)),
    :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(5)),
    :host([variant="navigation"][vertical-slots="2"]) ::slotted(:nth-child(6)) {
      grid-column: auto;
      grid-row: auto;
    }
  }

  /* =====================
     VARIANT: navigation-small
     4 cols, 2 rows uniform — 8 slots
     Desktop default height: 296px
     ===================== */

  :host([variant="navigation-small"]) .host-wrapper {
    height: var(--card-grid-height, 296px);
  }

  :host([variant="navigation-small"]) .grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  /* Mobile */
  @container (max-width: 767px) {
    :host([variant="navigation-small"]) .host-wrapper {
      height: var(--card-grid-height, calc(2 * var(--card-grid-xs-item-size, 172px) + var(--card-grid-gap, 8px)));
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
    }
    :host([variant="navigation-small"]) .host-wrapper::-webkit-scrollbar {
      display: none;
    }
    :host([variant="navigation-small"]) .grid {
      grid-template-columns: repeat(4, var(--card-grid-xs-item-size, 172px));
      grid-template-rows: repeat(2, var(--card-grid-xs-item-size, 172px));
      height: auto;
    }
  }

  /* =====================
     VARIANT: navigation-small rows="3"
     4 cols, 3 rows uniform — 12 slots
     Desktop default height: 448px
     ===================== */

  :host([variant="navigation-small"][rows="3"]) .host-wrapper {
    height: var(--card-grid-height, 448px);
  }

  :host([variant="navigation-small"][rows="3"]) .grid {
    grid-template-rows: repeat(3, 1fr);
  }

  /* Mobile: 2-row scroll strip (same as navigation-small) */
  @container (max-width: 767px) {
    :host([variant="navigation-small"][rows="3"]) .host-wrapper {
      height: var(--card-grid-height, calc(2 * var(--card-grid-xs-item-size, 172px) + var(--card-grid-gap, 8px)));
    }
    :host([variant="navigation-small"][rows="3"]) .grid {
      grid-template-rows: repeat(2, var(--card-grid-xs-item-size, 172px));
    }
  }

  /* =====================
     VARIANT: photogallery
     5 cols, 3 rows
     Desktop default height: 352px
     ===================== */

  :host([variant="photogallery"]) .host-wrapper {
    height: var(--card-grid-height, 352px);
  }

  :host([variant="photogallery"]) .grid {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  :host([variant="photogallery"]) ::slotted(:nth-child(1)) {
    grid-column: 1 / span 3;
    grid-row: 1 / span 3;
  }

  :host([variant="photogallery"]) ::slotted(:nth-child(2)) {
    grid-column: 4 / span 2;
    grid-row: 1 / span 2;
  }

  :host([variant="photogallery"]) ::slotted(:nth-child(3)) {
    grid-column: 4;
    grid-row: 3;
  }

  :host([variant="photogallery"]) ::slotted(:nth-child(4)) {
    grid-column: 5;
    grid-row: 3;
  }

  /* Mobile */
  @container (max-width: 767px) {
    :host([variant="photogallery"]) .host-wrapper {
      height: var(--card-grid-height, 210px);
    }
    :host([variant="photogallery"]) .grid {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    }
    :host([variant="photogallery"]) ::slotted(:nth-child(1)) {
      grid-column: 1;
      grid-row: 1;
    }
    :host([variant="photogallery"]) ::slotted(:nth-child(n+2)) {
      display: none;
    }
  }
`;
