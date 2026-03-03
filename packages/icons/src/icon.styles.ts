import { css } from 'lit';

export const iconStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--minis-icon-size, 24px);
    height: var(--minis-icon-size, 24px);
    flex-shrink: 0;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;
