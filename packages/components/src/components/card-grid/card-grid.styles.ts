import { css } from 'lit';

export const cardGridStyles = css`
  :host {
    display: block;
    overflow: hidden;
    border-radius: var(--card-grid-border-radius, var(--border-radius-xl, 16px));
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
     4 cols, 2 rows — first item spans 2 cols (featured)
     Desktop default height: 584px
     ===================== */

  :host([variant="navigation"]) {
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
  @media (max-width: 767px) {
    :host([variant="navigation"]) {
      height: var(--card-grid-height, var(--card-grid-xs-item-size, 172px));
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
    }
    :host([variant="navigation"])::-webkit-scrollbar {
      display: none;
    }
    :host([variant="navigation"]) .grid {
      grid-template-columns: repeat(4, var(--card-grid-xs-item-size, 172px));
      grid-auto-rows: var(--card-grid-xs-item-size, 172px);
      height: auto;
    }
    :host([variant="navigation"]) ::slotted(:nth-child(1)),
    :host([variant="navigation"]) ::slotted(:nth-child(6)) {
      grid-column: span 1;
    }
  }

  /* =====================
     VARIANT: navigation-small
     4 cols, 2 rows uniform — 8 slots
     Desktop default height: 296px
     ===================== */

  :host([variant="navigation-small"]) {
    height: var(--card-grid-height, 296px);
  }

  :host([variant="navigation-small"]) .grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  /* Mobile */
  @media (max-width: 767px) {
    :host([variant="navigation-small"]) {
      height: var(--card-grid-height, var(--card-grid-xs-item-size, 172px));
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
    }
    :host([variant="navigation-small"])::-webkit-scrollbar {
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

  :host([variant="navigation-small"][rows="3"]) {
    height: var(--card-grid-height, 448px);
  }

  :host([variant="navigation-small"][rows="3"]) .grid {
    grid-template-rows: repeat(3, 1fr);
  }

  /* Mobile: 2-row scroll strip (same as navigation-small) */
  @media (max-width: 767px) {
    :host([variant="navigation-small"][rows="3"]) .grid {
      grid-template-rows: repeat(2, var(--card-grid-xs-item-size, 172px));
    }
  }

  /* =====================
     VARIANT: photogallery
     5 cols, 3 rows
     Desktop default height: 352px
     ===================== */

  :host([variant="photogallery"]) {
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
  @media (max-width: 767px) {
    :host([variant="photogallery"]) {
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
