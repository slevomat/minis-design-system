import { LitElement, html, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { wheelOfFortuneStyles } from './wheel-of-fortune.styles.js';

/**
 * PLACEHOLDER IMPLEMENTATION.
 *
 * A separate team is building the animated wheel in Rive. Until it lands, this
 * component draws a simplified wheel in SVG and spins it with a CSS transition.
 * The public API (attributes, `spin()`, events, CSS custom properties) is the
 * contract the Rive version must keep — only the internals get replaced.
 */

/** Figma `Variant`: default | broken | black friday (space → hyphen in code). */
export type WheelOfFortuneVariant = 'default' | 'broken' | 'black-friday';
/** Figma `Language`: CZ | SK. */
export type WheelOfFortuneLanguage = 'cz' | 'sk';

export interface WheelOfFortuneSpinDetail {
  /** Index of the winning segment, 0 = top, counted clockwise. */
  index: number;
  /** The segment label in the current language, e.g. "VÝHRA". */
  label: string;
}

type SegmentColor = 'blue' | 'orange' | 'red' | 'dark';
type Segment = { color: SegmentColor; label: string[] };

const SEGMENTS = 12;
const SEGMENT_ANGLE = 360 / SEGMENTS;
const SPIN_TURNS = 5;

const COPY: Record<WheelOfFortuneLanguage, { spin: string; win: string[]; again: string[]; miss: string[] }> = {
  cz: { spin: 'Zatočit', win: ['Výhra'], again: ['Další', 'pokus'], miss: ['Dnes to', 'nevyšlo'] },
  sk: { spin: 'Zatočiť', win: ['Výhra'], again: ['Ďalší', 'pokus'], miss: ['Dnes to', 'nevyšlo'] },
};

function segmentsFor(variant: WheelOfFortuneVariant, lang: WheelOfFortuneLanguage): Segment[] {
  const t = COPY[lang];
  const pattern: Segment[] =
    variant === 'default'
      ? [
          { color: 'red', label: t.miss },
          { color: 'blue', label: t.win },
          { color: 'orange', label: t.again },
        ]
      : variant === 'broken'
        ? [
            { color: 'blue', label: t.win },
            { color: 'orange', label: t.win },
            { color: 'red', label: t.win },
          ]
        : [
            { color: 'blue', label: t.win },
            { color: 'dark', label: t.win },
            { color: 'dark', label: t.win },
          ];
  return Array.from({ length: SEGMENTS }, (_, i) => pattern[i % pattern.length]);
}

/** Point on a circle of radius r centred at (500, 500); 0° = top, clockwise. */
function polar(r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [500 + r * Math.cos(rad), 500 + r * Math.sin(rad)];
}

function sectorPath(r: number, from: number, to: number): string {
  const [x1, y1] = polar(r, from);
  const [x2, y2] = polar(r, to);
  return `M500 500 L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} Z`;
}

@customElement('minis-wheel-of-fortune')
export class MinisWheelOfFortune extends LitElement {
  static styles = wheelOfFortuneStyles;

  /** Campaign look. Figma `Variant`. */
  @property({ type: String, reflect: true })
  variant: WheelOfFortuneVariant = 'default';

  /** Market copy (segment labels and the spin button). Figma `Language`. */
  @property({ type: String, reflect: true })
  language: WheelOfFortuneLanguage = 'cz';

  /** True while the wheel is turning. Read-only; reflected for styling. */
  @property({ type: Boolean, reflect: true })
  spinning = false;

  @state() private _rotation = 0;
  @state() private _result = '';

  /**
   * Spin the wheel. Lands on `index` (0 = top, clockwise) when given,
   * otherwise on a random segment. Resolves when the wheel stops.
   * Ignored (resolves with the current state) while already spinning.
   */
  async spin(index?: number): Promise<WheelOfFortuneSpinDetail> {
    const segments = segmentsFor(this.variant, this.language);
    const target =
      index === undefined ? Math.floor(Math.random() * SEGMENTS) : ((Math.round(index) % SEGMENTS) + SEGMENTS) % SEGMENTS;
    const detail: WheelOfFortuneSpinDetail = { index: target, label: segments[target].label.join(' ').toUpperCase() };
    if (this.spinning) return detail;

    const start = new CustomEvent('minis-spin-start', { bubbles: true, composed: true, cancelable: true });
    if (!this.dispatchEvent(start)) return detail;

    this.spinning = true;
    this._result = '';
    // Bring segment `target` to the top: rotation ≡ −target × 30° (mod 360).
    const current = ((this._rotation % 360) + 360) % 360;
    const wanted = (((-target * SEGMENT_ANGLE) % 360) + 360) % 360;
    this._rotation += SPIN_TURNS * 360 + ((wanted - current + 360) % 360);

    await this.updateComplete;
    await this._waitForTurn();

    this.spinning = false;
    this._result = detail.label;
    this.dispatchEvent(new CustomEvent<WheelOfFortuneSpinDetail>('minis-spin-end', { detail, bubbles: true, composed: true }));
    return detail;
  }

  private _waitForTurn(): Promise<void> {
    const disc = this.renderRoot.querySelector('.disc');
    const duration = disc ? parseFloat(getComputedStyle(disc).transitionDuration) || 0 : 0;
    if (!disc || duration === 0) return Promise.resolve();
    return new Promise((resolve) => {
      const done = () => {
        disc.removeEventListener('transitionend', done);
        clearTimeout(timer);
        resolve();
      };
      // Fallback in case transitionend never fires (element hidden, tab in background).
      const timer = setTimeout(done, duration * 1000 + 200);
      disc.addEventListener('transitionend', done);
    });
  }

  private _onClick() {
    void this.spin();
  }

  private _label(seg: Segment, i: number) {
    const angle = i * SEGMENT_ANGLE;
    const lines = seg.label.map((l) => l.toUpperCase());
    const one = lines.length === 1;
    return svg`
      <text class="label ${one ? 'label--lg' : ''}" transform="rotate(${angle} 500 500)" x="500" text-anchor="middle">
        ${lines.map((line, n) => svg`<tspan x="500" y=${one ? 150 : 128 + n * 52}>${line}</tspan>`)}
      </text>`;
  }

  render() {
    const segments = segmentsFor(this.variant, this.language);
    const t = COPY[this.language] ?? COPY.cz;
    const half = SEGMENT_ANGLE / 2;
    return html`
      <div class="wheel" part="wheel">
        <svg class="disc" viewBox="0 0 1000 1000" aria-hidden="true" style="transform: rotate(${this._rotation}deg)">
          <circle class="rim" cx="500" cy="500" r="496" />
          ${segments.map(
            (seg, i) => svg`<path class="segment segment--${seg.color}" d=${sectorPath(470, i * SEGMENT_ANGLE - half, i * SEGMENT_ANGLE + half)} />`,
          )}
          ${segments.map((seg, i) => this._label(seg, i))}
        </svg>
        <div class="hub" part="hub">
          <button
            class="spin"
            part="button"
            type="button"
            aria-disabled=${this.spinning ? 'true' : 'false'}
            @click=${this._onClick}
          >
            ${t.spin.toUpperCase()}
          </button>
        </div>
        <span class="pointer" part="pointer" aria-hidden="true"></span>
      </div>
      <span class="sr-only" role="status" aria-live="polite">${this._result}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'minis-wheel-of-fortune': MinisWheelOfFortune;
  }
  interface HTMLElementEventMap {
    'minis-spin-start': CustomEvent<void>;
    'minis-spin-end': CustomEvent<WheelOfFortuneSpinDetail>;
  }
}
