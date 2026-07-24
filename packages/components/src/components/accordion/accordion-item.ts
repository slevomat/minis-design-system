import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { accordionItemStyles } from './accordion-item.styles.js';
import '@minis/icons';

let uid = 0;

/**
 * Mini*S Accordion Item
 *
 * A single expand/collapse row inside `<minis-accordion>`: bold heading on the
 * left, blue chevron on the right, 1px divider below, and a panel that reveals
 * the default-slot content when open.
 *
 * The heading scales with the viewport (`--typography-heading-sm-size`:
 * 16px below 768px → 18px from 768px up) and wraps onto multiple lines on
 * narrow screens.
 *
 * @slot         - Panel content, revealed when the item is open
 * @slot heading - Heading content. Overrides the `heading` attribute when used.
 *
 * @fires toggle - Fires after the item opens or closes. detail: `{ open: boolean }`
 *
 * @csspart trigger - The clickable heading row
 * @csspart panel   - The collapsible panel wrapper
 *
 * @example
 * ```html
 * <minis-accordion-item heading="Jak dlouho kredity platí?">
 *   Kredity platí 12 měsíců od připsání.
 * </minis-accordion-item>
 * ```
 */
@customElement('minis-accordion-item')
export class MinisAccordionItem extends LitElement {
  static styles = accordionItemStyles;

  /** Heading text. Ignored when the `heading` slot is used. */
  @property({ type: String })
  heading = '';

  /** Expanded state. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Disables interaction — the item can no longer be opened or closed. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Heading level rendered around the trigger, for document outline purposes.
   * Renders `role="heading" aria-level="{n}"`; set to `0` to omit the role.
   */
  @property({ type: Number, attribute: 'heading-level' })
  headingLevel = 3;

  private readonly _id = `minis-accordion-item-${++uid}`;

  private _onClick = () => {
    if (this.disabled) return;
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('toggle', {
        bubbles: true,
        composed: true,
        detail: { open: this.open },
      })
    );
  };

  render() {
    const triggerId = `${this._id}-trigger`;
    const panelId = `${this._id}-panel`;

    return html`
      <div
        role=${this.headingLevel > 0 ? 'heading' : 'presentation'}
        aria-level=${this.headingLevel > 0 ? this.headingLevel : 0}
      >
        <button
          part="trigger"
          class="trigger"
          id=${triggerId}
          type="button"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls=${panelId}
          ?disabled=${this.disabled}
          @click=${this._onClick}
        >
          <span class="heading">
            <slot name="heading">${this.heading}</slot>
          </span>
          <minis-icon class="chevron" name="arrow-down" size="24"></minis-icon>
        </button>
      </div>

      <div
        part="panel"
        class="panel"
        id=${panelId}
        role="region"
        aria-labelledby=${triggerId}
        ?inert=${!this.open}
      >
        <div class="panel-inner">
          <div class="panel-content"><slot></slot></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-accordion-item': MinisAccordionItem;
  }
}
