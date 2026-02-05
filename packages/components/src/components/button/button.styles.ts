import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-block;
  }

  button {
    /* Reset */
    font-family: inherit;
    cursor: pointer;
    outline: none;
    text-decoration: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    
    /* Layout Tokens */
    border-radius: var(--border-radius-md, 8px);
    border: var(--border-width-medium, 2px) solid transparent;
    
    /* Transition */
    transition: all 150ms ease;
  }

  /* Sizes */
  :host([size="sm"]) button {
    font-size: 14px;
    padding: var(--spacing-inset-xs, 4px) var(--spacing-inset-sm, 8px);
  }

  :host([size="md"]) button {
    font-size: 16px;
    padding: var(--spacing-inset-sm, 8px) var(--spacing-inset-md, 12px);
  }

  :host([size="lg"]) button {
    font-size: 18px;
    padding: var(--spacing-inset-md, 12px) var(--spacing-inset-lg, 16px);
  }

  /* Variant: Primary */
  :host([variant="primary"]) button {
    background: var(--color-interaction-primary-surface, #006eb9);
    color: var(--color-interaction-primary-accent, #ffffff);
    border-color: var(--color-interaction-primary-border, #006eb9);
  }

  :host([variant="primary"]) button:hover:not(:disabled) {
    background: var(--color-interaction-primary-hover-surface, #005685);
    color: var(--color-interaction-primary-hover-accent, #ffffff);
    border-color: var(--color-interaction-primary-hover-border, #005685);
  }

  /* Variant: Secondary */
  :host([variant="secondary"]) button {
    background: var(--color-interaction-secondary-surface, #ffffff);
    color: var(--color-interaction-secondary-accent, #000000);
    border-color: var(--color-interaction-secondary-border, #cbccce);
  }

  :host([variant="secondary"]) button:hover:not(:disabled) {
    background: var(--color-interaction-secondary-hover-surface, #e6f7fc);
    color: var(--color-interaction-secondary-hover-accent, #000000);
    border-color: var(--color-interaction-secondary-hover-border, #cbccce);
  }

  /* Variant: Tertiary */
  :host([variant="tertiary"]) button {
    background: var(--color-interaction-tertiary-surface, transparent);
    color: var(--color-interaction-tertiary-accent, #006eb9);
    border-color: var(--color-interaction-tertiary-border, transparent);
  }

  :host([variant="tertiary"]) button:hover:not(:disabled) {
    background: var(--color-interaction-tertiary-hover-surface, #e6f7fc);
    color: var(--color-interaction-tertiary-hover-accent, #005685);
    border-color: var(--color-interaction-tertiary-hover-border, #cbccce);
  }

  /* Variant: Danger */
  :host([variant="danger"]) button {
    background: var(--color-interaction-danger-surface, #ffffff);
    color: var(--color-interaction-danger-accent, #d2381d);
    border-color: var(--color-interaction-danger-border, #d2381d);
  }

  :host([variant="danger"]) button:hover:not(:disabled) {
    background: var(--color-interaction-danger-hover-surface, #ffefec);
    color: var(--color-interaction-danger-hover-accent, #a1150e);
    border-color: var(--color-interaction-danger-hover-border, #a1150e);
  }

  /* Variant: CTA Buy */
  :host([variant="cta-buy"]) button {
    background: var(--color-interaction-cta-buy-surface, #088107);
    color: var(--color-interaction-cta-buy-accent, #ffffff);
    border-color: var(--color-interaction-cta-buy-border, #088107);
  }

  :host([variant="cta-buy"]) button:hover:not(:disabled) {
    background: var(--color-interaction-cta-buy-hover-surface, #136110);
    color: var(--color-interaction-cta-buy-hover-accent, #ffffff);
    border-color: var(--color-interaction-cta-buy-hover-border, #136110);
  }

  /* Disabled State */
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Focus State */
  button:focus-visible {
    outline: 2px solid var(--color-border-focus, #00b2e5);
    outline-offset: 2px;
  }

  /* Loading State */
  :host([loading]) button {
    position: relative;
    color: transparent;
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;
