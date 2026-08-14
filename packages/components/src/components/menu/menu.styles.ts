import { css } from 'lit';

export const menuStyles = css`
  :host {
    display: inline-flex;
    position: relative;
  }

  /* =====================
     TRIGGER
     Mirrors the navigation item box so a menu can sit in a nav row without
     throwing the baseline off.
     ===================== */

  .trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--menu-trigger-gap, var(--menu-item-gap, 4px));
    height: var(--menu-trigger-height, 38px);
    padding: 0 0 var(--menu-trigger-padding-bottom, 2px);
    box-sizing: border-box;
    white-space: nowrap;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-family: var(--typography-font-family-sans, Inter, sans-serif);
    font-size: var(--typography-size-md, 16px);
    font-weight: var(--typography-weight-regular, 400);
    line-height: var(--typography-line-height-150, 150%);
    color: var(--menu-trigger-text, var(--color-text-primary, #000));
    transition: color 150ms ease, border-color 150ms ease;
  }

  .trigger:hover,
  :host([open]) .trigger {
    border-bottom-color: var(--menu-trigger-accent, var(--color-text-accent-link, #006eb9));
  }

  :host([open]) .trigger {
    color: var(--menu-trigger-accent, var(--color-text-accent-link, #006eb9));
  }

  .trigger:focus-visible {
    outline: 2px solid var(--color-border-focus, #4a90d9);
    outline-offset: 2px;
    border-radius: 2px;
  }

  .chevron {
    flex-shrink: 0;
    display: inline-flex;
    transition: transform 150ms ease;
  }

  :host([open]) .chevron {
    transform: rotate(180deg);
  }

  ::slotted([slot='icon']) {
    width: var(--menu-trigger-icon-size, 24px);
    height: var(--menu-trigger-icon-size, 24px);
    flex-shrink: 0;
  }

  /* =====================
     PANEL
     ===================== */

  .panel {
    position: absolute;
    top: 100%;
    z-index: var(--menu-z-index, 100);
    min-width: var(--menu-min-width, 200px);
    max-height: var(--menu-max-height, 70vh);
    overflow-y: auto;
    box-sizing: border-box;
    margin-top: var(--menu-offset, 4px);
    padding: var(--menu-padding, 8px);
    background: var(--menu-surface, var(--color-surface-primary, #fff));
    border: 1px solid var(--menu-border-color, var(--color-border, #cbccce));
    border-radius: var(--menu-border-radius, var(--border-radius-md, 8px));
    box-shadow: var(--menu-shadow, var(--effect-elevation));
  }

  /* placement=start aligns the panel's leading edge with the trigger,
     placement=end its trailing edge — for triggers near the right edge. */
  :host([placement='start']) .panel {
    inset-inline-start: 0;
  }

  :host([placement='end']) .panel {
    inset-inline-end: 0;
  }

  .panel[hidden] {
    display: none;
  }

  /* Slotted menu items stack full-width; their own component supplies padding
     and hover surface (see navigation-item's [slot='overflow'] rules). */
  .panel ::slotted(*) {
    display: block;
    width: 100%;
  }
`;
