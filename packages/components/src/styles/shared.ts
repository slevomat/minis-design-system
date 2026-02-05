import { css } from 'lit';

/**
 * Shared styles and mixins
 */

export const focusStyles = css`
  :focus-visible {
    outline: 2px solid var(--color-border-focus, #00b2e5);
    outline-offset: 2px;
  }
`;

export const transitionStyles = css`
  transition: all 150ms ease;
`;
