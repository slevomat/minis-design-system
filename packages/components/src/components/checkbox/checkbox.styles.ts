import { css } from 'lit';

export const checkboxStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--linear-sp-linear-2, 8px);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    font-family: var(--typography-font-family-sans);
    font-size: var(--typography-size-sm);
    line-height: var(--typography-line-height-125, 125%);
    color: var(--color-text-primary);
  }

  :host([disabled]) {
    cursor: not-allowed;
    opacity: 0.4;
  }

  .box {
    box-sizing: border-box;
    position: relative;
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--input-border, #cbccce);
    background: var(--input-surface, #ffffff);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: background-color 120ms ease, border-color 120ms ease;
  }

  :host(:hover:not([disabled])) .box {
    border-color: var(--input-border-hover, #00b2e5);
  }

  :host([checked]) .box {
    background: var(--color-interaction-primary-surface, #006eb9);
    border-color: var(--color-interaction-primary-border, #006eb9);
  }

  :host([checked]:hover:not([disabled])) .box {
    background: var(--button-primary-hover-surface, #005685);
    border-color: var(--button-primary-hover-border, #005685);
  }

  .check {
    width: 10px;
    height: 8px;
    color: var(--color-core-white, #ffffff);
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 120ms ease, transform 120ms ease;
  }

  :host([checked]) .check {
    opacity: 1;
    transform: scale(1);
  }

  /* Visually-hidden native input for accessibility & form participation */
  input[type='checkbox'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  :host(:focus-visible) .box,
  input[type='checkbox']:focus-visible + .box {
    outline: 2px solid var(--input-border-hover, #00b2e5);
    outline-offset: 2px;
  }

  .label {
    user-select: none;
  }

  :host(:not(.has-label)) {
    gap: 0;
  }
`;
