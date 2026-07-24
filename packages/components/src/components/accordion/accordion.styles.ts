import { css } from 'lit';

export const accordionStyles = css`
  :host {
    display: block;
    width: 100%;
    font-family: var(--typography-font-family-sans, Inter, sans-serif);
  }

  /* The divider lives on each item's bottom edge; drop it on the last one so
     the list doesn't end on a stray rule. */
  ::slotted(minis-accordion-item:last-of-type) {
    border-bottom: none;
  }

  /* Opt-in top rule, so a standalone accordion can be fully ruled. */
  :host([bordered]) ::slotted(minis-accordion-item:first-of-type) {
    border-top: var(--accordion-border-width, 1px) solid
      var(--accordion-border-color, #e6e6e6);
  }

  :host([bordered]) ::slotted(minis-accordion-item:last-of-type) {
    border-bottom: var(--accordion-border-width, 1px) solid
      var(--accordion-border-color, #e6e6e6);
  }
`;
