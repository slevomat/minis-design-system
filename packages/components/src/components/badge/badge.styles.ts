import { css } from 'lit';

export const badgeStyles = css`
  :host {
    display: inline-block;
    width: 82px;
    height: 82px;
    --badge-color: var(--color-pink-45);
  }

  :host([color='yellow']) {
    --badge-color: var(--color-yellow-45);
  }

  :host([color='blue']) {
    --badge-color: var(--color-blue-45);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
