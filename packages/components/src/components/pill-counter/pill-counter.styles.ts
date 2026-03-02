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
    border-radius: var(--radius-radius-full, 9999px);
    background: var(--pill-counter-bg, var(--color-core-white, #fff));
    color: var(--pill-counter-color, var(--color-text-primary, #000));
    font-family: Arial, sans-serif;
    font-weight: var(--typography-weight-bold, 700);
    font-style: normal;
    white-space: nowrap;
    text-align: center;
  }

  /* Default size — general use */
  :host([size="md"]) .pill,
  :host(:not([size])) .pill {
    min-width: var(--pixel-px-15, 15px);
    padding: var(--pixel-px-2, 2px) var(--pixel-px-4, 4px);
    font-size: var(--pixel-px-12, 12px);
    line-height: var(--pixel-px-11, 11px);
  }

  /* sm — for icon + label buttons */
  :host([size="sm"]) .pill {
    min-width: var(--pixel-px-11, 11px);
    padding-top: var(--pixel-px-2, 2px);
    padding-bottom: var(--pixel-px-1, 1px);
    font-size: var(--pixel-px-10, 10px);
    line-height: var(--pixel-px-8, 8px);
  }

  /* xs — for icon-only buttons */
  :host([size="xs"]) .pill {
    min-width: var(--pixel-px-8, 8px);
    padding-top: var(--pixel-px-1, 1px);
    padding-bottom: var(--pixel-px-1, 1px);
    font-size: var(--pixel-px-8, 8px);
    line-height: var(--pixel-px-6, 6px);
  }
`;
