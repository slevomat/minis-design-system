import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { alertStyles } from './alert.styles.js';

export type AlertVariant = 'notice' | 'success' | 'error' | 'warning';

function iconNotice() {
  return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
}
function iconSuccess() {
  return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/></svg>`;
}
function iconError() {
  return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="24" height="24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>`;
}
function iconWarning() {
  return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="24" height="24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
}

/**
 * Mini*S Alert Component
 *
 * Communicates contextual feedback to the user.
 * Mostly used as validation on form fields.
 *
 * @example
 * ```html
 * <minis-alert variant="notice">Your changes have been saved.</minis-alert>
 * <minis-alert variant="error">Please fix the errors below.</minis-alert>
 * <minis-alert variant="success" no-icon>Done!</minis-alert>
 * ```
 */
@customElement('minis-alert')
export class MinisAlert extends LitElement {
  static styles = alertStyles;

  @property({ type: String, reflect: true })
  variant: AlertVariant = 'notice';

  /** Hide the variant icon (shown by default). */
  @property({ type: Boolean, attribute: 'no-icon', reflect: true })
  noIcon = false;

  render() {
    const isAlert = this.variant === 'error' || this.variant === 'warning';
    const role = isAlert ? 'alert' : 'status';

    const iconMap = {
      notice: iconNotice,
      success: iconSuccess,
      error: iconError,
      warning: iconWarning,
    };

    return html`
      <div class="alert" role="${role}">
        ${this.noIcon ? '' : html`<span class="icon" aria-hidden="true">${iconMap[this.variant]()}</span>`}
        <span class="content"><slot></slot></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-alert': MinisAlert;
  }
}
