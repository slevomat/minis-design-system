import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { sidebarLayoutStyles } from './sidebar-layout.styles.js';

/**
 * Mini*S Sidebar Layout
 *
 * The one main + sidebar rule of the layout guides (plan 030): a fluid main
 * column and a fixed 320px sidebar on the right (`--layout-sidebar-width`),
 * gap `--spacing-layout-lg`. It goes side by side from a 1008px viewport, and
 * only when its own width is at least 944px (what it gets inside a container
 * there); otherwise it stacks into one column, main first.
 *
 * Put it inside `<minis-container>` (default or medium). It has no landmark
 * semantics of its own: slot `<main>` / `<aside>` elements as the page needs.
 *
 * @slot - Main column content.
 * @slot sidebar - Sidebar content (right column; below the main column when stacked).
 * @csspart main - The main column wrapper.
 * @csspart sidebar - The sidebar wrapper.
 *
 * @example
 * ```html
 * <minis-container>
 *   <minis-sidebar-layout>
 *     <article>Deal description</article>
 *     <aside slot="sidebar">Price box</aside>
 *   </minis-sidebar-layout>
 * </minis-container>
 * ```
 */
@customElement('minis-sidebar-layout')
export class MinisSidebarLayout extends LitElement {
  static styles = sidebarLayoutStyles;

  render() {
    return html`
      <div class="layout">
        <div class="main" part="main"><slot></slot></div>
        <div class="sidebar" part="sidebar"><slot name="sidebar"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-sidebar-layout': MinisSidebarLayout;
  }
}
