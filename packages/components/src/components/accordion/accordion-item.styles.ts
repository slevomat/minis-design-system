import { css } from 'lit';

export const accordionItemStyles = css`
  :host {
    display: block;
    background: var(--accordion-surface, transparent);
    /* Divider sits *below* every item; the parent <minis-accordion> hides the
       last one so the list never ends on a stray rule. */
    border-bottom: var(--accordion-border-width, 1px) solid
      var(--accordion-border-color, rgba(0, 0, 0, 0.05));
    font-family: var(--typography-font-family-sans, Inter, sans-serif);
  }

  /* =====================
     TRIGGER (heading row)
     ===================== */

  .trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--accordion-gap, 16px);
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: var(--accordion-padding-y, 20px) var(--accordion-padding-x, 16px);
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    color: var(--accordion-heading-text, #000);
    font-family: inherit;
    /* Responsive heading scale: 16px below 768px → 18px from 768px up. */
    font-size: var(--typography-heading-sm-size, 16px);
    font-weight: var(--accordion-heading-weight, 700);
    line-height: var(--typography-heading-sm-line-height, 138%);
    transition: color var(--accordion-transition-duration, 200ms) ease;
  }

  .trigger:hover {
    color: var(--accordion-heading-hover-text, #006eb9);
  }

  .trigger:focus-visible {
    outline: 2px solid var(--color-border-focus, #006eb9);
    outline-offset: -2px;
    border-radius: var(--border-radius-sm, 4px);
  }

  .heading {
    /* Allow long Czech headings to wrap onto several lines (XS breakpoint). */
    min-width: 0;
    overflow-wrap: break-word;
  }

  /* Compact size — the row runs edge to edge. For an accordion that already
     sits inside a padded container (a card, a narrow column), the trigger's
     own inset would double up on the parent's. Only the horizontal padding
     goes; the vertical rhythm and the divider are unchanged. */
  :host([size='compact']) .trigger,
  :host([size='compact']) .panel-content {
    padding-left: var(--accordion-compact-padding-x, 0);
    padding-right: var(--accordion-compact-padding-x, 0);
  }

  /* =====================
     CHEVRON
     ===================== */

  /* Sized under the heading's line box (22.08px at XS / 23.94px at LG) so the
     text — not the icon — determines the row height. The template also passes
     size="20" because <minis-icon> writes width/height inline on its <svg>;
     this custom property only drives the host box. */
  .chevron {
    flex: 0 0 auto;
    display: inline-flex;
    --minis-icon-size: var(--accordion-icon-size, 20px);
    color: var(--accordion-icon-color, #006eb9);
    transition: transform var(--accordion-transition-duration, 200ms) ease;
  }

  :host([open]) .chevron {
    transform: rotate(180deg);
  }

  /* =====================
     PANEL
     ===================== */

  /* 0fr → 1fr grid row animates to the panel's intrinsic height without
     needing a measured pixel value. */
  .panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--accordion-transition-duration, 200ms) ease;
  }

  :host([open]) .panel {
    grid-template-rows: 1fr;
  }

  .panel-inner {
    overflow: hidden;
  }

  .panel-content {
    padding: 0 var(--accordion-padding-x, 16px)
      var(--accordion-panel-padding-bottom, 20px);
    color: var(--accordion-panel-text, #000);
    font-size: var(--typography-size-md, 16px);
    font-weight: var(--typography-weight-regular, 400);
    line-height: var(--typography-body-md-line-height, 138%);
  }

  /* =====================
     DISABLED
     ===================== */

  :host([disabled]) .trigger {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :host([disabled]) .trigger:hover {
    color: var(--accordion-heading-text, #000);
  }

  @media (prefers-reduced-motion: reduce) {
    .chevron,
    .panel {
      transition: none;
    }
  }
`;
