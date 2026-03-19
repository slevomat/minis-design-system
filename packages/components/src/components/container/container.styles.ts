import { css } from 'lit';

export const containerStyles = css`
  :host {
    display: block;
  }

  .container {
    max-width: var(--container-width, 100000px);
    padding-left: var(--container-padding, 8px);
    padding-right: var(--container-padding, 8px);
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    width: 100%;
  }

  :host([variant="narrow"]) .container {
    max-width: var(--container-narrow-width, 100000px);
    padding-left: var(--container-narrow-padding, 8px);
    padding-right: var(--container-narrow-padding, 8px);
  }
`;
