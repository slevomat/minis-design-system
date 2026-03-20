import { css } from 'lit';

export const topbarStyles = css`
  :host {
    display: block;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--topbar-height, 64px);
    box-sizing: border-box;
  }

  /* =====================
     LOGO
     ===================== */

  .logo {
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: var(--linear-sp-linear-4, 16px);
    flex-shrink: 0;
  }

  ::slotted([slot="logo"]) {
    display: block;
    max-height: 30px;
  }

  /* =====================
     ACTIONS (right side)
     ===================== */

  .actions {
    display: flex;
    align-items: center;
    gap: var(--topbar-actions-gap, 10px);
    flex-shrink: 0;
  }

  ::slotted([slot="actions"]) {
    display: flex !important;
    align-self: center;
  }
`;
