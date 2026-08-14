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
    justify-content: center;
    gap: var(--navigation-item-gap, 4px);
    /* Figma: 38px tall box, label sitting 2px above the 2px underline. */
    height: var(--navigation-item-height, 38px);
    padding: 0 0 var(--navigation-item-padding-bottom, 2px);
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
     INSIDE A MENU PANEL
     minis-menu stamps the in-menu attribute on every item it holds — both the
     overflow items minis-navigation hands it, and items slotted into a
     standalone menu.
     In the panel an item is a full-width row: no underline (there is no row to
     underline), and hover is a surface instead.

     Keyed off a class on .item, NOT :host([in-menu]): WebKit does not reliably
     re-evaluate :host() attribute selectors when the attribute is added after
     first render, which is exactly what happens here. The host's own display is
     set by the shadow root that slots the item (see navigation.styles.ts and
     menu.styles.ts), for the same reason.
     ===================== */

  .item.in-menu {
    width: 100%;
    height: auto;
    justify-content: flex-start;
    padding: var(--menu-item-padding-y, 8px) var(--menu-item-padding-x, 12px);
    border-bottom: none;
    border-radius: var(--menu-item-border-radius, var(--border-radius-sm, 4px));
  }

  .item.in-menu:hover {
    background: var(--menu-item-hover-surface, var(--color-surface-faded, #f1f3f5));
  }

  :host([active]) .item.in-menu {
    color: var(--navigation-item-active-accent, var(--color-text-accent-link, #006eb9));
  }

  :host([color='positive']) .item.in-menu:hover,
  :host([color='positive'][active]) .item.in-menu {
    border-bottom-color: transparent;
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
    width: var(--navigation-item-icon-size, 24px);
    height: var(--navigation-item-icon-size, 24px);
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
