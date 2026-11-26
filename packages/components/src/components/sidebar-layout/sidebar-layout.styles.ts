import { css } from 'lit';

export const sidebarLayoutStyles = css`
  /* Container query context: the own-width guard below needs it. */
  :host {
    display: block;
    container-type: inline-size;
  }

  /* Stacked: one column, main first. */
  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--spacing-layout-lg, 16px);
  }

  .main,
  .sidebar {
    min-width: 0;
  }

  /* Side by side needs BOTH:
     - a viewport of 1008px+ (--breakpoint-lg) — the decided stacking breakpoint
       (plan 030). A container query alone can't express it: container padding
       jumps 16 → 32px at 1008px, so the content box is 975px at a 1007px
       viewport but 944px at 1008px.
     - an own width of 944px+ (1008 − 2 × 32px container padding) — so inside a
       narrow box (e.g. the 752px narrow container) it stays stacked.
     Custom properties can't be used in @media / @container conditions, so the
     numbers are hardcoded. */
  @media (min-width: 1008px) {
    @container (min-width: 944px) {
      .layout {
        grid-template-columns: minmax(0, 1fr) var(--layout-sidebar-width, 320px);
      }
    }
  }
`;
