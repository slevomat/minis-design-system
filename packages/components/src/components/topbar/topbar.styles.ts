import { css } from 'lit';

export const topbarStyles = css`
  :host {
    display: block;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: var(--topbar-height, 64px);
    box-sizing: border-box;
  }

  /* vibe-apps is logo + app name, both left-aligned — with only two children,
     space-between would throw the name to the far right. */
  :host([variant='vibe-apps']) .topbar {
    justify-content: flex-start;
  }

  /* =====================
     LOGO
     ===================== */

  .logo {
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: var(--topbar-logo-gap, 16px);
    flex-shrink: 0;
  }

  ::slotted([slot='logo']) {
    display: block;
    max-height: 30px;
  }

  /* =====================
     SEARCH (web variant only)
     Hidden while the slot is empty, so a topbar without search keeps the
     original logo-left / actions-right layout with no phantom gap.
     ===================== */

  .search {
    display: flex;
    align-items: center;
    flex: 0 1 var(--topbar-search-width, 300px);
    min-width: 0;
    margin-right: var(--topbar-search-gap, 48px);
  }

  .search[hidden] {
    display: none;
  }

  ::slotted([slot='search']) {
    width: 100%;
  }

  /* =====================
     ACTIONS (right side)
     ===================== */

  .actions {
    display: flex;
    align-items: center;
    gap: var(--topbar-actions-gap, 10px);
    flex-shrink: 0;
    margin-left: auto;
  }

  ::slotted([slot='actions']) {
    display: flex !important;
    align-self: center;
  }

  /* =====================
     APP NAME (vibe-apps variant)
     Sits immediately after the logo — Figma has it left-aligned, 16px after
     the logo's own 16px right padding (32px from the logo artwork).
     ===================== */

  .app-name {
    margin-left: var(--topbar-app-name-gap, var(--linear-sp-linear-4));
    min-width: 0;
    overflow-wrap: break-word;
    font-family: var(--typography-font-family-sans);
    font-size: var(--topbar-app-name-size, var(--typography-heading-lg-size));
    font-weight: var(--typography-weight-semibold);
    line-height: var(--typography-heading-lg-line-height);
    /* Figma: letterSpacing -1% of the heading size — em keeps it correct
       when --typography-heading-lg-size steps 20px → 24px at ≥1480px. */
    letter-spacing: -0.01em;
    color: var(--topbar-app-name-color, var(--color-text-primary));
  }
`;
