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
  }

  /* =====================
     SLOT ITEMS (::slotted)
     ===================== */

  ::slotted(*) {
    display: block;
    min-width: 0;
    min-height: 0;
  }

  /* =====================
     VARIANT: navigation
     4 cols, 2 rows — first item spans 2 cols (featured)
     ===================== */

  :host([variant="navigation"]) .grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 1fr;
  }

  /* First slotted child: 2-col wide featured card */
  :host([variant="navigation"]) ::slotted(:nth-child(1)) {
    grid-column: span 2;
  }

  /* Last slotted child: 2-col wide (mirrors first on row 2) */
  :host([variant="navigation"]) ::slotted(:nth-child(6)) {
    grid-column: span 2;
  }

  /* Mobile: horizontal scroll, equal-size fixed-width items */
  @media (max-width: 767px) {
    :host([variant="navigation"]) {
      overflow-x: auto;
      overflow-y: hidden;
      border-radius: var(--card-grid-border-radius, var(--border-radius-xl, 16px));
      /* hide scrollbar */
      scrollbar-width: none;
    }
    :host([variant="navigation"])::-webkit-scrollbar {
      display: none;
    }
    :host([variant="navigation"]) .grid {
      grid-template-columns: repeat(4, var(--card-grid-xs-item-size, 172px));
      grid-auto-rows: var(--card-grid-xs-item-size, 172px);
    }
    :host([variant="navigation"]) ::slotted(:nth-child(1)),
    :host([variant="navigation"]) ::slotted(:nth-child(6)) {
      grid-column: span 1;
    }
  }

  /* =====================
     VARIANT: navigation-small
     4 cols, uniform equal cells
     rows controlled by --card-grid-rows (default 2)
     ===================== */

  :host([variant="navigation-small"]) .grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 1fr;
  }

  /* Mobile: horizontal scroll like navigation */
  @media (max-width: 767px) {
    :host([variant="navigation-small"]) {
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
    }
    :host([variant="navigation-small"])::-webkit-scrollbar {
      display: none;
    }
    :host([variant="navigation-small"]) .grid {
      grid-template-columns: repeat(4, var(--card-grid-xs-item-size, 172px));
      grid-auto-rows: var(--card-grid-xs-item-size, 172px);
    }
  }

  /* =====================
     VARIANT: photogallery
     5 cols, 3 rows — large left (3-col × 3-row),
     top-right (2-col × 2-row), two small bottom-right (1-col × 1-row each)
     ===================== */

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

  /* Mobile: single full-width item, rest hidden */
  @media (max-width: 767px) {
    :host([variant="photogallery"]) .grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
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
