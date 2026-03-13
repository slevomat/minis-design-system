import { css } from 'lit';

export const tagStyles = css`
  :host {
    display: inline-flex;
  }

  /* =====================
     BASE TAG ELEMENT
     ===================== */

  .tag {
    display: inline-flex;
    align-items: center;
    gap: var(--tag-gap, 4px);
    padding: var(--tag-padding-y, 4px) var(--tag-padding-x, 6px);
    height: var(--tag-height, 32px);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-radius: var(--tag-border-radius, 9999px);
    white-space: nowrap;
    /* Typography inherited from context */
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
  }

  /* =====================
     VARIANT: STATIC (default)
     ===================== */

  :host([variant="static"]) .tag {
    background: var(--tag-static-surface, var(--color-interaction-secondary-hover-surface, #e6f7fc));
    border-color: var(--tag-static-border, var(--color-interaction-secondary-hover-surface, #e6f7fc));
    color: var(--tag-static-accent, var(--color-interaction-secondary-accent, #000));
    cursor: default;
  }

  /* =====================
     VARIANT: CLICKABLE
     ===================== */

  :host([variant="clickable"]) .tag {
    background: transparent;
    border-color: var(--tag-clickable-border, var(--color-interaction-secondary-border, #cbccce));
    color: var(--tag-clickable-accent, var(--color-interaction-secondary-accent, #000));
    cursor: pointer;
    transition: background 150ms ease, border-color 150ms ease;
  }

  :host([variant="clickable"]) .tag:hover {
    background: var(--tag-clickable-hover-surface, var(--color-interaction-secondary-hover-surface, #e6f7fc));
    border-color: var(--tag-clickable-hover-border, var(--color-interaction-secondary-hover-surface, #e6f7fc));
  }

  :host([variant="clickable"]) .tag:focus-visible {
    outline: 2px solid var(--color-border-focus, #4a90d9);
    outline-offset: 2px;
  }

  /* =====================
     VARIANT: TOGGLE
     ===================== */

  :host([variant="toggle"]) .tag {
    background: transparent;
    border-color: var(--tag-toggle-border, var(--color-interaction-secondary-border, #cbccce));
    color: var(--tag-toggle-accent, var(--color-interaction-secondary-accent, #000));
    cursor: pointer;
    transition: background 150ms ease, border-color 150ms ease;
  }

  :host([variant="toggle"]) .tag:hover {
    background: var(--tag-toggle-hover-surface, var(--color-interaction-secondary-hover-surface, #e6f7fc));
    border-color: var(--tag-toggle-hover-border, var(--color-interaction-secondary-hover-surface, #e6f7fc));
  }

  :host([variant="toggle"]) .tag:focus-visible {
    outline: 2px solid var(--color-border-focus, #4a90d9);
    outline-offset: 2px;
  }

  /* Pressed / selected state */
  :host([variant="toggle"][pressed]) .tag,
  :host([variant="toggle"]) .tag[aria-pressed="true"] {
    background: var(--tag-toggle-pressed-surface, var(--color-interaction-secondary-hover-surface, #e6f7fc));
    border-color: var(--tag-toggle-pressed-border, var(--color-interaction-secondary-hover-surface, #e6f7fc));
  }

  /* =====================
     VARIANT: DISMISSIBLE
     ===================== */

  :host([variant="dismissible"]) .tag {
    background: var(--tag-dismissible-surface, var(--color-interaction-secondary-hover-surface, #e6f7fc));
    border-color: var(--tag-dismissible-border, var(--color-interaction-secondary-hover-surface, #e6f7fc));
    color: var(--tag-dismissible-accent, var(--color-interaction-secondary-accent, #000));
    padding-inline-end: var(--tag-dismissible-padding-end, 3px);
  }

  /* =====================
     DISABLED (clickable + toggle)
     ===================== */

  :host([variant="clickable"][disabled]) .tag,
  :host([variant="toggle"][disabled]) .tag {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* =====================
     ICON SLOT (20px for static / clickable / dismissible)
     ===================== */

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--tag-icon-size, 20px);
    height: var(--tag-icon-size, 20px);
  }

  .icon ::slotted(*) {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* Toggle icon uses 24px */
  :host([variant="toggle"]) .icon {
    width: var(--tag-toggle-icon-size, 24px);
    height: var(--tag-toggle-icon-size, 24px);
  }

  /* =====================
     LABEL
     ===================== */

  .label {
    flex: 1 0 auto;
  }

  /* =====================
     DISMISS BUTTON
     ===================== */

  .dismiss {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    border-radius: 50%;
    margin-inline-start: 2px;
    transition: opacity 150ms ease;
  }

  .dismiss:hover {
    opacity: 0.7;
  }

  .dismiss:focus-visible {
    outline: 2px solid var(--color-border-focus, #4a90d9);
    outline-offset: 1px;
  }

  .dismiss svg {
    display: block;
    pointer-events: none;
  }
`;
