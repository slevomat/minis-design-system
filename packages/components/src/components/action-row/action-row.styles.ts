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
    height: var(--action-row-height, 32px);
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

  /* Leading inset — the icon / checkbox box carries its own optical padding */
  .row.has-icon {
    padding-left: var(--action-row-padding-x-icon-only, 3px);
  }

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

  /* Leading icon box — collapses entirely when nothing is slotted, so the
     flex gap does not leave a hole. */
  .icon {
    display: none;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    color: var(--action-row-icon);
  }

  .row.has-icon .icon {
    display: inline-flex;
  }

  ::slotted([slot='icon']) {
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
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

  /* ------------------------------------------------------------------ *
   * Breakpoint = xs (mobile)
   *
   * 56px row, label group left, action (chevron or checkbox) pinned right.
   * The leading inset is dropped — xs uses the plain 8px padding on both
   * sides, per Figma.
   * ------------------------------------------------------------------ */
  :host([breakpoint='xs']) .row,
  :host([breakpoint='xs'][variant='checkbox']) .row {
    height: var(--action-row-xs-height, 56px);
    padding-left: var(--action-row-padding-x, 8px);
    gap: var(--action-row-gap-icon, 8px);
  }

  .action {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--action-row-xs-action-size, 24px);
    height: var(--action-row-xs-action-size, 24px);
    color: var(--action-row-xs-action, var(--action-row-icon));
  }
`;
