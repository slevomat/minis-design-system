import { css } from 'lit';

export const actionRowStyles = css`
  :host {
    display: block;
  }

  .row {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--pixel-px-32, 32px);
    padding: var(--action-row-padding-y, 3px) var(--action-row-padding-x, 8px);
    gap: var(--action-row-gap-icon, 8px);
    border: 0;
    background: var(--action-row-surface, transparent);
    border-radius: var(--action-row-border-radius, 8px);
    color: var(--action-row-text, #000);
    font-family: var(--typography-font-family-sans, Inter, sans-serif);
    font-size: var(--typography-size-sm, 14px);
    font-weight: var(--typography-weight-medium, 500);
    line-height: 1;
    text-align: left;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 120ms ease;
  }

  /* Active state — gray faded background */
  :host([active]) .row,
  :host([state='active']) .row {
    background: var(--action-row-active-surface, #f1f3f5);
  }

  /* Hover wins over active (active + hover → hover color, like default + hover) */
  .row:hover,
  :host([state='hover']) .row {
    background: var(--action-row-hover-surface, #e6f7fc);
  }

  /* Variant — leading icon */
  :host([variant='icon']) .row {
    padding-left: var(--action-row-padding-x-icon-only, 3px);
  }

  /* Variant — leading checkbox */
  :host([variant='checkbox']) .row {
    padding-left: var(--action-row-padding-x-checkbox, 5px);
    gap: var(--action-row-gap-checkbox, 13px);
  }

  :host([disabled]) .row {
    cursor: not-allowed;
    opacity: 0.4;
    background: var(--action-row-surface, transparent);
  }

  .row:focus-visible {
    outline: 2px solid var(--input-border-hover, #00b2e5);
    outline-offset: -2px;
  }

  /* Slotted leading icon (24x24 per Figma) */
  ::slotted([slot='icon']) {
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--action-row-icon);
  }

  minis-checkbox {
    flex: 0 0 auto;
  }

  /* Label + counter group — counter is always right after the label */
  .content {
    flex: 1 1 auto;
    min-width: 0;
    display: inline-flex;
    align-items: center;
    gap: var(--action-row-gap-icon, 8px);
  }

  .label {
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
