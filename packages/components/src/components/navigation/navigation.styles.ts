import { css } from 'lit';

export const navigationStyles = css`
  :host {
    display: block;
  }

  /* =====================
     NAV WRAPPER
     ===================== */

  nav {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: var(--navigation-gap, var(--linear-sp-linear-6, 24px));
    overflow-x: auto;
    /* Hide scrollbar visually but keep scrollable */
    scrollbar-width: none;
    border-bottom: 1px solid var(--navigation-border-color, var(--color-border, #cbccce));
  }

  nav::-webkit-scrollbar {
    display: none;
  }

  /* Collapse mode: items that don't fit live in the overflow menu, so there is
     nothing to scroll — and the scroll container would clip the open panel
     (overflow-x: auto makes overflow-y a scrollport too). */
  nav.collapsed {
    overflow: visible;
  }

  /* Items never squeeze — the bar scrolls instead. */
  ::slotted(*) {
    flex-shrink: 0;
  }

  /* =====================
     VARIANT: main-nav
     Items are spread across the full container measure (Figma: space-between).
     The gap above is the minimum they may collapse to before scrolling.
     ===================== */

  :host([variant="main-nav"]) nav {
    justify-content: space-between;
  }

  /* =====================
     OVERFLOW MENU ("Další")
     Last item in the row, so space-between parks it at the trailing edge.
     ===================== */

  .overflow {
    flex-shrink: 0;
  }

  .overflow[hidden] {
    display: none;
  }

  /* =====================
     ACTIONS SLOT (right side, e.g. favourite button)
     ===================== */

  .actions {
    display: inline-flex;
    align-items: center;
    margin-inline-start: auto;
    flex-shrink: 0;
  }

  /* Empty actions slot: its auto margin would absorb the free space that
     main-nav distributes between items, so drop it out of the flex layout. */
  .actions[hidden] {
    display: none;
  }
`;
