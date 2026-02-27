import { css } from 'lit';

export const messageStyles = css`
  :host {
    display: inline-block;
    font-family: var(--typography-font-family-sans, 'SF Pro Display', sans-serif);
  }

  .message {
    display: inline-flex;
    align-items: flex-start;
    background: var(--message-surface, var(--color-surface-primary, #fff));
    border: 1px solid var(--message-border, var(--color-border, #cbccce));
    border-radius: var(--message-border-radius, var(--border-radius-md, 8px));
    box-shadow: var(--message-shadow,
      0px 1px 4px 0px rgba(0, 0, 0, 0.08),
      0px 4px 24px 0px rgba(0, 0, 0, 0.08)
    );
    position: relative;
  }

  /* =====================
     LAYOUT: VERTICAL (default)
     ===================== */

  :host([layout="vertical"]) .message {
    flex-direction: column;
    padding: var(--message-padding, var(--linear-sp-linear-2, 8px));
  }

  :host([layout="vertical"]) .container {
    display: flex;
    align-items: flex-start;
    gap: var(--message-gap, var(--linear-sp-linear-2, 8px));
  }

  /* =====================
     LAYOUT: HORIZONTAL
     ===================== */

  :host([layout="horizontal"]) .message {
    flex-direction: row;
    align-items: center;
    padding: var(--linear-sp-linear-1, 4px);
  }

  :host([layout="horizontal"]) .container {
    display: flex;
    align-items: center;
    gap: var(--message-gap, var(--linear-sp-linear-2, 8px));
    min-width: 0;
    padding: var(--linear-sp-linear-2, 8px) var(--linear-sp-linear-1, 4px);
  }

  /* =====================
     VISUAL (thumbnail)
     ===================== */

  .visual {
    flex-shrink: 0;
    border-radius: var(--border-radius-sm, 4px);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([layout="vertical"]) .visual {
    width: 40px;
    height: 40px;
  }

  :host([layout="horizontal"]) .visual {
    width: 32px;
    height: 32px;
  }

  .visual ::slotted(*) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* =====================
     CONTENT
     ===================== */

  .content {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  :host([layout="horizontal"]) .content {
    flex: 1;
    flex-direction: row;
    align-items: center;
    gap: var(--linear-sp-linear-2, 8px);
    overflow: hidden;
  }

  .title {
    font-size: var(--typography-size-sm, 14px);
    font-weight: var(--typography-weight-bold, 700);
    line-height: 1.5;
    color: var(--color-text-primary, #000);
    margin: 0;
  }

  .description {
    font-size: var(--typography-size-xs, 12px);
    font-weight: var(--typography-weight-regular, 400);
    line-height: 1.5;
    color: var(--color-text-secondary, #6b6b70);
    margin: 0;
  }

  :host([layout="horizontal"]) .title {
    white-space: nowrap;
    flex-shrink: 0;
  }

  :host([layout="horizontal"]) .description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    min-width: 0;
  }

  /* =====================
     CLOSE BUTTON
     ===================== */

  .close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
