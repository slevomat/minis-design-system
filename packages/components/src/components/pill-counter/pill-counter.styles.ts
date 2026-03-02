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
    border-radius: var(--radius-radius-full, 9999px);
    background: var(--pill-counter-bg, var(--color-core-white, #fff));
    color: var(--pill-counter-color, var(--color-text-primary, #000));
    font-family: Arial, sans-serif;
    font-weight: var(--typography-weight-bold, 700);
    font-style: normal;
    white-space: nowrap;
    text-align: center;
  }

  /* Default size — general use · 15×15px min, pill on overflow */
  :host([size="md"]) .pill,
  :host(:not([size])) .pill {
    height: var(--pixel-px-15, 15px);
    min-width: var(--pixel-px-15, 15px);
    padding: 0 var(--pixel-px-4, 4px);
    font-size: var(--pixel-px-12, 12px);
    line-height: var(--pixel-px-15, 15px);
  }

  /* sm — md/lg button with icon + label · 11×11px min, pill on overflow */
  :host([size="sm"]) .pill {
    height: var(--pixel-px-11, 11px);
    min-width: var(--pixel-px-11, 11px);
    padding: 0 var(--pixel-px-2, 2px);
    font-size: var(--pixel-px-10, 10px);
    line-height: var(--pixel-px-11, 11px);
  }

  /* xs — sm button or icon-only button · 8×8px min, pill on overflow */
  :host([size="xs"]) .pill {
    height: var(--pixel-px-8, 8px);
    min-width: var(--pixel-px-8, 8px);
    padding: 0 var(--pixel-px-1, 1px);
    font-size: var(--pixel-px-8, 8px);
    line-height: var(--pixel-px-8, 8px);
  }
`;
