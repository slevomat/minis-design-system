import { css } from 'lit';

/*
 * Placeholder styling — see wheel-of-fortune.ts. The wheel is illustration:
 * its colours are fixed brand primitives, so it does not follow dark mode.
 */
export const wheelOfFortuneStyles = css`
  :host {
    display: inline-block;
    /* Override to resize. The wheel is square and fills the host. */
    --wheel-of-fortune-size: 320px;
    --wheel-of-fortune-spin-duration: 4.5s;

    --wheel-of-fortune-blue: var(--color-blue-65);
    --wheel-of-fortune-orange: var(--color-orange-75);
    --wheel-of-fortune-red: var(--color-pink-55);
    --wheel-of-fortune-dark: var(--color-grey-20);
    --wheel-of-fortune-rim: var(--color-blue-65);
    --wheel-of-fortune-label: var(--color-core-white);
    --wheel-of-fortune-hub: var(--color-core-white);
    --wheel-of-fortune-button: var(--color-blue-45);
    --wheel-of-fortune-button-hover: var(--color-orange-75);

    width: var(--wheel-of-fortune-size);
    height: var(--wheel-of-fortune-size);
    container-type: inline-size;
  }

  .wheel {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .disc {
    display: block;
    width: 100%;
    height: 100%;
    transition: transform var(--wheel-of-fortune-spin-duration) cubic-bezier(0.15, 0.7, 0.12, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    .disc {
      transition-duration: 0.01s;
    }
  }

  .rim {
    fill: var(--wheel-of-fortune-label);
    stroke: var(--wheel-of-fortune-rim);
    stroke-width: 8;
  }

  .segment--blue {
    fill: var(--wheel-of-fortune-blue);
  }
  .segment--orange {
    fill: var(--wheel-of-fortune-orange);
  }
  .segment--red {
    fill: var(--wheel-of-fortune-red);
  }
  .segment--dark {
    fill: var(--wheel-of-fortune-dark);
  }

  .label {
    fill: var(--wheel-of-fortune-label);
    font-family: var(--typography-font-family-brand);
    font-weight: var(--typography-brand-weight);
    font-size: 46px;
    letter-spacing: 0.02em;
  }

  .label--lg {
    font-size: 72px;
  }

  /* Hub: white plate with a blue ring, the spin button in the middle. */
  .hub {
    position: absolute;
    inset: 30%;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--wheel-of-fortune-hub);
    box-shadow:
      0 0 0 1.2cqi var(--wheel-of-fortune-rim),
      0 1.5cqi 3cqi oklch(0 0 0 / 0.3);
  }

  .spin {
    width: 72%;
    aspect-ratio: 1;
    border: 1.2cqi solid var(--wheel-of-fortune-rim);
    border-radius: 50%;
    background: var(--wheel-of-fortune-button);
    color: var(--wheel-of-fortune-label);
    font-family: var(--typography-font-family-sans);
    font-weight: var(--typography-weight-black);
    font-size: 5cqi;
    letter-spacing: 0.02em;
    cursor: pointer;
    padding: 0;
    transition: background-color 150ms ease;
  }

  .spin:hover,
  .spin:focus-visible {
    background: var(--wheel-of-fortune-button-hover);
  }

  .spin:focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 0.8cqi;
  }

  :host([spinning]) .spin {
    cursor: progress;
  }

  /* Marks the winning position (top). Not in the Figma artwork; the Rive
     version decides its own indicator. */
  .pointer {
    position: absolute;
    top: -1.5cqi;
    left: 50%;
    width: 0;
    height: 0;
    transform: translateX(-50%);
    border-left: 3cqi solid transparent;
    border-right: 3cqi solid transparent;
    border-top: 5cqi solid var(--wheel-of-fortune-button);
    filter: drop-shadow(0 0.5cqi 0.5cqi oklch(0 0 0 / 0.3));
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
`;
