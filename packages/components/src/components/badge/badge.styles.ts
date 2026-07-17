import { css } from 'lit';

export const badgeStyles = css`
  :host {
    display: inline-block;
    /* Override --badge-size to scale the seal off anything — e.g. an em value
       that tracks the surrounding font-size. The size attribute sets it too. */
    --badge-size: 82px;
    --badge-color: var(--color-branding-pink);
    width: var(--badge-size);
    height: var(--badge-size);
  }

  /* size variants */
  :host([size='sm']) {
    --badge-size: 32px;
  }

  :host([size='md']) {
    --badge-size: 43px;
  }

  :host([color='yellow']) {
    --badge-color: var(--color-branding-yellow);
  }

  :host([color='blue']) {
    --badge-color: var(--color-branding-blue);
  }

  :host([color='brand']) {
    --badge-color: var(--color-branding-brand);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
