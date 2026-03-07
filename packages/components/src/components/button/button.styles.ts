import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-block;
    position: relative;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: var(--button-gap-elements, 4px);
    position: relative;

    font-family: var(--typography-font-family-sans, Inter, sans-serif);
    font-size: var(--typography-size-sm, 14px);
    font-weight: var(--typography-weight-semibold, 600);
    line-height: var(--typography-line-height-percentage-100%, 1);
    white-space: nowrap;

    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;
    outline: none;

    border-style: solid;
    border-width: var(--button-border-width, 1px);
    border-radius: var(--button-border-radius, 4px);

    transition:
      background-color 150ms ease,
      border-color 150ms ease,
      color 150ms ease,
      box-shadow 150ms ease;
  }

  /* =====================
     SIZES
     ===================== */

  /* Small */
  :host([size="small"]) button {
    height: var(--pixel-px-22, 22px);
    padding: var(--button-small-padding-y, 3px) var(--button-small-padding-x, 8px);
  }

  :host([size="small"][icon-only]) button {
    padding: var(--button-small-padding-y, 3px);
  }

  /* Medium */
  :host([size="medium"]) button {
    height: var(--fibonachi-sp-fib-8, 34px);
    padding: var(--button-padding-y, 8px) var(--button-padding-x, 12px);
  }

  :host([size="medium"][icon-only]) button {
    padding: var(--button-padding-y, 8px);
  }

  /* Large */
  :host([size="large"]) button {
    height: var(--pixel-px-44, 44px);
    padding: var(--button-large-padding-y, 12px) var(--button-large-padding-x, 16px);
  }

  :host([size="large"][icon-only]) button {
    padding: var(--button-large-padding-y, 12px);
  }

  /* Icon-only: center content horizontally */
  :host([icon-only]) button {
    justify-content: center;
  }

  /* Visually hide the label slot in icon-only mode while keeping it in the
     accessibility tree so slotted text contributes to the accessible name. */
  slot.visually-hidden {
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

  /* Icon-only: enforce square dimensions */
  :host([size="small"][icon-only]) button {
    width: var(--pixel-px-22, 22px);
  }

  :host([size="medium"][icon-only]) button {
    width: var(--fibonachi-sp-fib-8, 34px);
  }

  :host([size="large"][icon-only]) button {
    width: var(--pixel-px-44, 44px);
  }

  /* Icon sizing per size */
  :host([size="small"]) ::slotted([slot="icon"]) {
    width: var(--pixel-px-16, 16px);
    height: var(--pixel-px-16, 16px);
    flex-shrink: 0;
  }

  :host([size="medium"]) ::slotted([slot="icon"]),
  :host([size="large"]) ::slotted([slot="icon"]) {
    width: var(--pixel-px-24, 24px);
    height: var(--pixel-px-24, 24px);
    flex-shrink: 0;
  }

  /* =====================
     VARIANTS
     ===================== */

  /* Primary */
  :host([variant="primary"]) button {
    background: var(--button-primary-surface);
    color: var(--button-primary-text);
    border-color: var(--button-primary-border);
  }

  :host([variant="primary"]) button:hover:not(:disabled) {
    background: var(--button-primary-hover-surface);
    color: var(--button-primary-hover-text);
    border-color: var(--button-primary-hover-border);
    box-shadow:
      0px 4px 8px 0px rgba(0, 71, 120, 0.12),
      0px 12px 12px 0px rgba(0, 71, 120, 0.06),
      0px 20px 20px 0px rgba(0, 71, 120, 0.06),
      0px 32px 32px 0px rgba(0, 71, 120, 0.02),
      0px 40px 40px 0px rgba(0, 71, 120, 0.02);
  }

  /* Secondary */
  :host([variant="secondary"]) button {
    background: var(--button-secondary-surface);
    color: var(--button-secondary-text);
    border-color: var(--button-secondary-border);
  }

  :host([variant="secondary"]) button:hover:not(:disabled) {
    background: var(--button-secondary-hover-surface);
    color: var(--button-secondary-hover-text);
    border-color: var(--button-secondary-hover-border);
  }

  /* Tertiary */
  :host([variant="tertiary"]) button {
    background: var(--button-tertiary-surface);
    color: var(--button-tertiary-text);
    border-color: var(--button-tertiary-border);
  }

  :host([variant="tertiary"]) button:hover:not(:disabled) {
    background: var(--button-tertiary-hover-surface);
    color: var(--button-tertiary-hover-text);
    border-color: var(--button-tertiary-hover-border);
  }

  /* Danger */
  :host([variant="danger"]) button {
    background: var(--button-danger-surface);
    color: var(--button-danger-text);
    border-color: var(--button-danger-border);
  }

  :host([variant="danger"]) button:hover:not(:disabled) {
    background: var(--button-danger-hover-surface);
    color: var(--button-danger-hover-text);
    border-color: var(--button-danger-hover-border);
  }

  /* CTA Buy */
  :host([variant="cta-buy"]) button {
    background: var(--button-cta-buy-surface);
    color: var(--button-cta-buy-text);
    border-color: var(--button-cta-buy-border);
  }

  :host([variant="cta-buy"]) button:hover:not(:disabled) {
    background: var(--button-cta-buy-hover-surface);
    color: var(--button-cta-buy-hover-text);
    border-color: var(--button-cta-buy-hover-border);
  }

  /* Transparent */
  :host([variant="transparent"]) button {
    background: var(--button-transparent-surface);
    color: var(--button-transparent-text);
    border-color: var(--button-transparent-border);
    backdrop-filter: blur(var(--blur-blur-10, 10px));
  }

  :host([variant="transparent"]) button:hover:not(:disabled) {
    background: var(--button-transparent-hover-surface);
    color: var(--button-transparent-hover-text);
    border-color: var(--button-transparent-hover-border);
  }

  /* =====================
     DISABLED
     ===================== */

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* =====================
     FOCUS
     ===================== */

  button:focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }

  /* =====================
     COUNTER PILL COLORS — per variant
     ===================== */

  :host([variant="primary"]) minis-pill-counter {
    --pill-counter-bg: var(--button-primary-text);
    --pill-counter-color: var(--button-primary-surface);
  }

  :host([variant="cta-buy"]) minis-pill-counter {
    --pill-counter-bg: var(--button-cta-buy-text);
    --pill-counter-color: var(--button-cta-buy-surface);
  }

  :host([variant="secondary"]) minis-pill-counter {
    --pill-counter-bg: var(--button-secondary-text);
    --pill-counter-color: var(--button-secondary-surface);
  }

  :host([variant="tertiary"]) minis-pill-counter {
    --pill-counter-bg: var(--button-tertiary-text);
    --pill-counter-color: var(--color-surface-primary);
  }

  :host([variant="transparent"]) minis-pill-counter {
    --pill-counter-bg: var(--button-transparent-text);
    --pill-counter-color: var(--button-transparent-surface);
  }

  :host([variant="danger"]) minis-pill-counter {
    --pill-counter-bg: var(--button-danger-border);
    --pill-counter-color: var(--color-surface-primary);
  }

  /* =====================
     COUNTER PILL WRAPPERS
     Pill sizing/appearance is owned by <minis-pill-counter>.
     Button only controls placement.
     ===================== */

  /* Inline pill (icon + label) — extra left gap before the pill */
  .pill-wrapper {
    display: inline-flex;
    align-items: center;
    padding-left: var(--fibonachi-sp-fib-5, 8px);
  }

  /* Floating pill (icon-only) — absolute top-right corner */
  .pill-wrapper--floating {
    position: absolute;
    top: var(--pixel-px-3, 3px);
    right: var(--pixel-px-3, 3px);
    padding-left: 0;
  }

  /* small button: tighter floating offset */
  :host([size="small"]) .pill-wrapper--floating {
    top: var(--pixel-px-2, 2px);
    right: var(--pixel-px-2, 2px);
  }

  /* Icon-only + counter: dim the icon so the pill reads clearly.
     Only applies when counter has an actual value (not empty string). */
  :host([icon-only][counter]:not([counter=""])) ::slotted([slot="icon"]) {
    opacity: 0.75;
  }
`;
