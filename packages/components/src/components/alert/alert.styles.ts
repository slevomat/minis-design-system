import { css } from 'lit';

export const alertStyles = css`
  :host {
    display: block;
    font-family: var(--typography-font-family-sans, Inter, sans-serif);
    font-size: var(--typography-size-sm, 14px);
    font-weight: var(--typography-weight-regular, 400);
    line-height: var(--typography-line-height-133, 133%);
  }

  .alert {
    display: flex;
    align-items: flex-start;
    gap: var(--alert-gap, 8px);
    padding: var(--alert-padding-y, 8px) var(--alert-padding-x, 8px);
    border-width: 1px;
    border-style: solid;
    border-radius: var(--border-radius-md, 8px);
  }

  /* =====================
     VARIANTS
     ===================== */

  :host([variant="notice"]) .alert {
    background: var(--alert-color-surface);
    border-color: var(--alert-color-border);
    color: var(--color-text-primary, #000);
  }

  :host([variant="notice"]) .icon {
    color: var(--alert-color-border);
  }

  :host([variant="success"]) .alert {
    /* token has a typo: "sucess" — matching exactly */
    background: var(--alert-sucess-color-surface);
    border-color: var(--alert-sucess-color-border);
    color: var(--color-text-primary, #000);
  }

  :host([variant="success"]) .icon {
    color: var(--alert-sucess-color-border);
  }

  :host([variant="error"]) .alert {
    background: var(--alert-error-color-surface);
    border-color: var(--alert-error-color-border);
    color: var(--color-text-primary, #000);
  }

  :host([variant="error"]) .icon {
    color: var(--alert-error-color-border);
  }

  :host([variant="warning"]) .alert {
    background: var(--alert-warning-color-surface);
    border-color: var(--alert-warning-color-border);
    color: var(--color-text-primary, #000);
  }

  :host([variant="warning"]) .icon {
    color: var(--alert-warning-color-border);
  }

  /* =====================
     ICON
     ===================== */

  .icon {
    display: inline-flex;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  /* =====================
     CONTENT
     ===================== */

  .content {
    flex: 1 0 0;
  }

  .icon ~ .content {
    margin-top: var(--pixel-px-3, 3px);
    margin-bottom: var(--pixel-px-3, 3px);
  }
`;
