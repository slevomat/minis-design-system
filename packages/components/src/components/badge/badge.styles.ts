import { css } from 'lit';

export const badgeStyles = css`
  :host {
    display: inline-block;
    /* Override --badge-size to scale the seal off anything — e.g. an em value
       that tracks the surrounding font-size. The size attribute sets it too. */
    --badge-size: 82px;
    --badge-color: var(--color-branding-pink);
    /* The checkmark. White on every seal by default; override it when the seal
       sits on a background that needs a different contrast pairing — the
       page-header's green theme does exactly that. */
    --badge-check-color: var(--color-core-white);
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

  :host([color='green']) {
    --badge-color: var(--color-branding-green);
  }

  :host([color='summer']) {
    --badge-color: var(--color-branding-summer);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
