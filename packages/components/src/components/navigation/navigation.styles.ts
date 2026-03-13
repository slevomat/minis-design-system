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
    gap: var(--navigation-gap, 24px);
    overflow-x: auto;
    /* Hide scrollbar visually but keep scrollable */
    scrollbar-width: none;
  }

  nav::-webkit-scrollbar {
    display: none;
  }

  /* =====================
     VARIANT: horizontal
     Bottom border line under the whole nav
     ===================== */

  :host([variant="horizontal"]) nav {
    border-bottom: 1px solid var(--navigation-border-color, var(--color-border, #cbccce));
  }

  /* =====================
     VARIANT: tabs
     Same bottom border, items get underline indicator
     ===================== */

  :host([variant="tabs"]) nav {
    border-bottom: 1px solid var(--navigation-border-color, var(--color-border, #cbccce));
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
`;
