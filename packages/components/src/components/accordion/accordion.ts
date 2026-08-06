import { LitElement, html } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { accordionStyles } from './accordion.styles.js';
import './accordion-item.js';
import type { AccordionSize, MinisAccordionItem } from './accordion-item.js';

/**
 * Mini*S Accordion
 *
 * Vertical list of expand/collapse rows — the FAQ pattern. Renders a bold
 * heading with a blue chevron per row, separated by 1px dividers.
 *
 * By default every item opens independently. Add `single` to make it
 * exclusive: opening one item closes the others.
 *
 * @slot - `<minis-accordion-item>` elements
 *
 * @example
 * ```html
 * <minis-accordion single>
 *   <minis-accordion-item heading="Jak rychle se mi kredity připíší?">
 *     Kredity se připisují do 24 hodin.
 *   </minis-accordion-item>
 *   <minis-accordion-item heading="Jak dlouho kredity platí?">
 *     12 měsíců od připsání.
 *   </minis-accordion-item>
 * </minis-accordion>
 * ```
 */
@customElement('minis-accordion')
export class MinisAccordion extends LitElement {
  static styles = accordionStyles;

  /** Exclusive mode — opening an item closes every other one. */
  @property({ type: Boolean, reflect: true })
  single = false;

  /** Draws a rule above the first and below the last item as well. */
  @property({ type: Boolean, reflect: true })
  bordered = false;

  /** Heading level applied to every child item (see `heading-level` there). */
  @property({ type: Number, attribute: 'heading-level' })
  headingLevel = 3;

  /**
   * Row density, applied to every child item. `default` insets the heading
   * and panel by `--accordion-padding-x`; `compact` drops that inset to 0 so
   * rows run edge to edge — for an accordion nested in a container that
   * already provides the padding.
   */
  @property({ type: String, reflect: true })
  size: AccordionSize = 'default';

  @queryAssignedElements({ selector: 'minis-accordion-item' })
  private _items!: MinisAccordionItem[];

  /** All child items, in DOM order. */
  get items(): MinisAccordionItem[] {
    return this._items ?? [];
  }

  private _onSlotChange = () => {
    this._applyHeadingLevel();
    this._applySize();
    if (this.single) this._enforceSingle();
  };

  private _onToggle = (e: Event) => {
    const target = e.target as MinisAccordionItem;
    if (!this.single || !target.open) return;
    for (const item of this.items) {
      if (item !== target) item.open = false;
    }
  };

  private _applyHeadingLevel() {
    for (const item of this.items) item.headingLevel = this.headingLevel;
  }

  private _applySize() {
    for (const item of this.items) item.size = this.size;
  }

  /** Keeps at most the first open item open when entering `single` mode. */
  private _enforceSingle() {
    let seen = false;
    for (const item of this.items) {
      if (!item.open) continue;
      if (seen) item.open = false;
      seen = true;
    }
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('headingLevel')) this._applyHeadingLevel();
    if (changed.has('size')) this._applySize();
    if (changed.has('single') && this.single) this._enforceSingle();
  }

  render() {
    return html`
      <slot @slotchange=${this._onSlotChange} @toggle=${this._onToggle}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-accordion': MinisAccordion;
  }
}
