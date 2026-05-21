import { css } from 'lit';

export const pillCounterStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: var(--border-radius-full, var(--radius-radius-full, 9999px));
    background: var(--pill-counter-bg, var(--color-feedback-success, #43a047));
    color: var(--pill-counter-color, var(--color-surface-primary, #fff));
    font-family: var(--typography-font-family-sans, Inter, sans-serif);
    line-height: var(--typography-line-height-100, 100%);
    font-weight: var(--typography-weight-bold, 700);
    font-style: normal;
    text-align: center;
    white-space: nowrap;
  }

  /* lg — 18×18px */
  :host([size="lg"]) .pill {
    height: var(--pixel-px-18, 18px);
    min-width: var(--pixel-px-18, 18px);
    padding: 0 var(--pixel-px-3, 3px);
    font-size: var(--typography-size-xs, 12px);
  }

  /* md — default, 15×15px */
  :host([size="md"]) .pill,
  :host(:not([size])) .pill {
    height: 15px;
    min-width: 15px;
    padding: 0 var(--pixel-px-3, 3px);
    font-size: var(--typography-size-xs, 12px);
  }

  /* sm — 11×11px */
  :host([size="sm"]) .pill {
    height: var(--pixel-px-11, 11px);
    min-width: var(--pixel-px-11, 11px);
    padding: 0 var(--pixel-px-2, 2px);
    font-size: var(--typography-size-2xs, 10px);
  }

  /* xs — 8×8px */
  :host([size="xs"]) .pill {
    height: var(--pixel-px-8, 8px);
    min-width: var(--pixel-px-8, 8px);
    padding: 0 var(--pixel-px-1, 1px);
    font-size: var(--pixel-px-8, 8px);
  }
`;
