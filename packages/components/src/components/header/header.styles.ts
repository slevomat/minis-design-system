import { css } from 'lit';

export const headerStyles = css`
  :host {
    display: block;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height, 64px);
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
    gap: var(--header-actions-gap, 10px);
    flex-shrink: 0;
  }
`;
