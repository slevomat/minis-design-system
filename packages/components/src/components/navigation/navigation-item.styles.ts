import { css } from 'lit';

export const navigationItemStyles = css`
  :host {
    display: inline-flex;
  }

  /* =====================
     BASE ITEM ELEMENT
     ===================== */

  .item {
    display: inline-flex;
    align-items: center;
    gap: var(--navigation-item-gap, 8px);
    padding: var(--navigation-item-padding-y, 8px) 0;
    box-sizing: border-box;
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;
    font-family: var(--typography-font-family-sans, Inter, sans-serif);
    font-size: var(--typography-size-md, 16px);
    font-weight: var(--typography-weight-regular, 400);
    line-height: var(--typography-line-height-150, 150%);
    color: var(--navigation-item-accent, currentColor);
    background: transparent;
    border: none;
    border-bottom: var(--navigation-item-active-border-width, 2px) solid transparent;
    transition: color 150ms ease, border-color 150ms ease;
  }

  /* =====================
     ACTIVE STATE
     ===================== */

  :host([active]) .item {
    color: var(--navigation-item-active-accent, var(--color-text-accent-link, #006eb9));
    border-bottom-color: var(--navigation-item-active-border-color, var(--color-text-accent-link, #006eb9));
    font-weight: var(--typography-weight-bold, 700);
  }

  /* =====================
     HOVER STATE
     ===================== */

  .item:hover {
    border-bottom-color: var(--navigation-item-hover-border-color, var(--color-text-accent-link, #006eb9));
  }

  /* =====================
     COLOR: POSITIVE (green)
     ===================== */

  /* Default: only the icon slot is green; text colour is the same as other items */
  :host([color="positive"]) .icon {
    color: var(--color-text-accent-positive);
  }

  /* Hover + active: full item (text + underline) turns green */
  :host([color="positive"]) .item:hover,
  :host([color="positive"][active]) .item {
    color: var(--color-text-accent-positive);
    border-bottom-color: var(--color-text-accent-positive);
  }

  /* =====================
     FOCUS STATE
     ===================== */

  .item:focus-visible {
    outline: 2px solid var(--color-border-focus, #4a90d9);
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* =====================
     ICON SLOT
     ===================== */

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--navigation-item-icon-size, 20px);
    height: var(--navigation-item-icon-size, 20px);
    overflow: hidden;
  }

  .icon ::slotted(*) {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* =====================
     LABEL
     Reserve bold width via ::after ghost so items don't shift on active
     ===================== */

  .label {
    display: grid;
  }

  .label::after {
    content: attr(data-label);
    font-weight: var(--typography-weight-bold, 700);
    visibility: hidden;
    height: 0;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
  }
`;
