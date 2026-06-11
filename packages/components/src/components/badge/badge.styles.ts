import { css } from 'lit';

export const badgeStyles = css`
  :host {
    display: inline-block;
    width: 82px;
    height: 82px;
    --badge-color: var(--color-branding-pink);
  }

  /* size variants */
  :host([size='sm']) {
    width: 32px;
    height: 32px;
  }

  :host([size='md']) {
    width: 43px;
    height: 43px;
  }

  :host([color='yellow']) {
    --badge-color: var(--color-branding-yellow);
  }

  :host([color='blue']) {
    --badge-color: var(--color-branding-blue);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
