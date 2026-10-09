import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './page-header.js';
import '../button/button.js';
import '../tag/tag.js';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Page Header',
  component: 'minis-page-header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=4642-396" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-10-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Open in Figma ↗</a></p>
<p>Page headers — some call them <strong>heroes</strong>. Full-width branded banners in the brand colour themes, meant to sit at the top of a page as its <strong>first content element</strong>, directly under the Slevomat header (<code>&lt;minis-topbar&gt;</code>) and the main navigation (<code>&lt;minis-navigation&gt;</code>). Typically used on category and campaign pages.</p>
<p><strong>Layouts</strong> — the Figma <code>Layout</code> variant maps to the <code>layout</code> attribute: <code>Inspirations</code> → <code>layout="inspirations"</code>, <code>Content left</code> → <code>layout="content-left"</code>.</p>
<ul>
  <li><strong><code>layout="inspirations"</code></strong> (Figma "With Controls") — left-aligned content, the photo cropped into the top-right corner, and an optional <code>controls</code> row (e.g. search input + button). Adds a <code>message</code> slot, a <code>location</code> switcher and a <code>more</code> toggle ("Více informací").</li>
  <li><strong><code>layout="content-left"</code></strong> (Figma "Content left") — Inspirations <strong>without controls</strong> (the <code>controls</code> slot is not rendered). From 768px the photo is vertically centred, cropped top and bottom when the content is shorter, and stays put while "Více informací" is open. On mobile it behaves like Inspirations.</li>
  <li><strong><code>layout="centric"</code></strong> (Figma "Centric") — <strong>no photo</strong>, everything centred; the badge follows the last character of the centred heading. Controls are a row of category tags that <strong>wraps on desktop</strong> and <strong>swipes on mobile</strong>, with a fade on each edge that has more to scroll to.</li>
  <li><strong><code>layout="default"</code></strong> (no attribute) — the original hero: image right and vertically centred on desktop, stacked and centred on mobile. <em>No longer in Figma</em>; kept so existing pages don't change until Simple / Centered simple land.</li>
</ul>
<p>The layout switch is a container query on the component's own width (768px), not the viewport.</p>
<p><strong>Placement:</strong> <strong>one per page</strong>, at the very top of the content area — never mid-page, never two stacked. It sits <strong>outside</strong> <code>&lt;minis-container&gt;</code>: its root is already a full-bleed colour strip that applies <code>--container-padding</code> itself and centres a 1240px inner container, so nesting it would inset the background from the viewport edges and double the padding.</p>
<ul>
  <li><strong>6 themes</strong>: <code>brand</code> (cyan, default), <code>yellow</code>, <code>blue</code>, <code>pink</code>, <code>green</code>, <code>summer</code> (orange).</li>
  <li><strong>Text colour and badge seal colour are picked by the theme</strong>, not by you — each pairing comes from Figma: brand / yellow / summer use dark blue text, pink / green / blue use white text. Seals: brand→pink, yellow→pink, summer→green, pink→brand, green→summer, blue→brand.</li>
  <li><strong>Default slot</strong>: heading HTML — supports <code>&lt;br&gt;</code> for line breaks.</li>
  <li><strong><code>image</code> slot</strong>: decorative photo. Provide a PNG with a transparent blob-shaped background for the signature organic look.</li>
  <li><strong><code>button</code> slot</strong>: optional CTA — use <code>&lt;minis-button variant="transparent" size="xl"&gt;</code>.</li>
  <li><strong><code>description</code></strong> attribute: optional body copy below the heading.</li>
  <li><strong><code>tag</code></strong> attribute: optional countdown/label pill above the heading.</li>
  <li><strong><code>no-badge</code></strong> boolean (default <code>false</code>): hides the Brand/Badge checkmark seal next to the heading.</li>
  <li><strong><code>location</code></strong> attribute: underlined location switcher with a chevron under the heading; fires <code>location-click</code>.</li>
  <li><strong><code>more</code> slot</strong>: extra content hidden behind a "Více informací" toggle (<code>more-label</code>); the toggle only appears when the slot has content. <code>expanded</code> reflects the state; fires <code>more-toggle</code>.</li>
  <li><strong><code>message</code> slot</strong>: the draft "Message on product" banner above the tag.</li>
  <li><strong><code>controls</code> slot</strong>: controls row below the content — stacked full-width on mobile, a row up to 600px wide on desktop where buttons hug and everything else grows.</li>
</ul>
<p>The badge seal is <strong>typography-relative</strong>: it sizes off the heading font-size (<code>0.8em</code>; in the newer layouts 32px→43px as the heading goes 32px→56px), sits exactly centred on the <strong>last line's line-height</strong>, and keeps a gap after that line's text (<code>0.27em</code>; in the newer layouts 4px→16px) — for any number of heading lines, at every breakpoint. The seal size and gap are fixed by the design system and cannot be overridden. Keep the heading slot inline-level; a block-level child pushes the badge onto its own line.</p>
<blockquote style="border-left:4px solid var(--color-interaction-danger-accent,#e8112d);padding:.5rem 1rem;margin:1rem 0;background:var(--color-surface-faded,#f1f3f5)">
  <p style="margin:0 0 .5rem"><strong>⚠️ The heading needs the licensed Kensington font for a 1:1 match with Figma.</strong></p>
  <p style="margin:0 0 .5rem">Kensington Compressed Bold is Slevomat-proprietary and is <strong>not shipped with this design system</strong>. If it is not available on the machine rendering the page, the heading falls back to <a href="https://fonts.google.com/specimen/Bebas+Neue" target="_blank" rel="noopener noreferrer">Bebas Neue</a> (Google Fonts) — a close condensed all-caps substitute, but <strong>taller and narrower</strong>. Headlines re-flow slightly and <strong>will not match the Figma design pixel-for-pixel</strong>. Judge final brand typography only on a machine that has the real font.</p>
  <p style="margin:0 0 .5rem"><strong>What you are looking at right now:</strong> if this heading renders in Kensington, your machine has the font; if it looks slightly narrower and taller, you are seeing the Bebas Neue fallback.</p>
  <p style="margin:0"><strong>To get the real font</strong> — either install Kensington Compressed Bold on your machine (resolved automatically, no project setup), or drop the <code>.woff2</code> into <code>packages/tokens/src/fonts/</code> and re-run <code>pnpm --filter tokens build</code>. Either way it just works, in Storybook and in scaffolded prototypes. See <code>packages/tokens/src/fonts/README.md</code>. Everything else about the component — layout, spacing, badge anchoring, colours — is unaffected: the badge re-measures itself against whichever face loads.</p>
</blockquote>
        `,
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['default', 'inspirations', 'content-left', 'centric'],
      description: 'Layout — matches the Figma `Layout` variant (`inspirations` = "With Controls", `content-left` = "Content left", `centric` = "Centric")',
    },
    theme: {
      control: 'select',
      options: ['brand', 'yellow', 'summer', 'pink', 'green', 'blue'],
      description: 'Color theme — sets background and text colors',
    },
    description: {
      control: 'text',
      description: 'Optional body text shown below the heading',
    },
    tag: {
      control: 'text',
      description: 'Optional countdown/label pill above the heading',
    },
    'no-badge': {
      control: 'boolean',
      description: 'Hide the Brand/Badge checkmark seal (shown by default)',
    },
    location: {
      control: 'text',
      description: 'Optional location switcher under the heading (fires `location-click`)',
    },
    'more-label': {
      control: 'text',
      description: 'Label of the toggle that reveals the `more` slot',
    },
  },
  args: {
    layout: 'inspirations',
    theme: 'brand',
    description: 'Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu. Ale pozor – akce platí jen dnes.',
    tag: '',
    'no-badge': false,
    location: '',
    'more-label': 'Více informací',
  },
};

export default meta;
type Story = StoryObj;

// ─── Shared demo content ──────────────────────────────────────────────────────

const DESCRIPTION =
  'Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu. Ale pozor – akce platí jen dnes.';

// Demo photo from Figma — the blob shape is baked into the transparent PNG.
const PHOTO = 'page-header-rimini.png';

// There is no input component yet (Figma "🚧 Input"), so the demo controls use a
// native <input> styled from the --input-* tokens.
const demoStyles = html`
  <style>
    .ph-demo-input {
      box-sizing: border-box;
      height: 40px;
      padding: 0 var(--linear-sp-linear-2, 8px);
      border: 1px solid var(--input-border, #cbccce);
      border-radius: var(--border-radius-sm, 4px);
      background: var(--input-surface, #fff);
      color: var(--input-value, #000);
      font-family: var(--typography-font-family-sans, Inter, sans-serif);
      font-size: var(--typography-size-md, 16px);
    }
    .ph-demo-input::placeholder { color: var(--input-placeholder, #6b6b70); }
    .ph-demo-input:focus-visible { outline: 2px solid var(--color-border-focus); outline-offset: 1px; }
    .ph-demo-message {
      background: var(--alert-warning-color-surface);
      border: 1px solid var(--color-gold-85);
      border-radius: var(--border-radius-lg);
      padding: var(--linear-sp-linear-4) var(--spacing-layout-xxl);
      font-family: var(--typography-font-family-sans);
      font-size: var(--typography-size-sm);
      font-weight: var(--typography-weight-bold);
      line-height: 1.5;
      color: var(--color-text-primary);
    }
    .ph-demo-message a { color: var(--color-orange-65); text-decoration: none; }
    .ph-demo-message a:hover { text-decoration: underline; }
  </style>
`;

/** Figma "_Default controls": search input + transparent lg button. */
const defaultControls = html`
  <input slot="controls" class="ph-demo-input" type="search" placeholder="Kam chcete vyrazit?" aria-label="Kam chcete vyrazit?">
  <minis-button slot="controls" variant="transparent" size="lg" full-width>Vyhledat</minis-button>
`;

const photo = html`<img slot="image" src="${PHOTO}" alt="">`;

/** Figma "_Centered controls" (Content=Categories): a row of category tags.
 *  `clickable` = the updated Figma Clickable tag: tinted, grey border, white on hover. */
const CATEGORIES = ['Benefity', 'Papírové poukázky', 'FKSP', 'Dárkové poukazy'];
const categoryTags = (labels: string[]) =>
  labels.map((label) => html`<minis-tag slot="controls" variant="clickable">${label}</minis-tag>`);
const categoryControls = categoryTags(CATEGORIES);

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  render: (args) => html`
    ${demoStyles}
    <minis-page-header
      layout="${args.layout}"
      theme="${args.theme}"
      description="${args.description}"
      tag="${args.tag}"
      location="${args.location}"
      more-label="${args['more-label']}"
      ?no-badge="${args['no-badge']}"
    >
      Ušetřete za pobyt<br>v italském Rimini
      ${photo}
      ${args.layout === 'inspirations' ? defaultControls : ''}
      ${args.layout === 'centric' ? categoryControls : ''}
    </minis-page-header>
  `,
};

// ─── Inspirations — With Controls ─────────────────────────────────────────────

export const Inspirations: Story = {
  name: 'Inspirations — With Controls',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
The Figma <code>Layout=Inspirations</code> variant in its default configuration: heading with badge,
description, photo and the default controls (search input + <code>&lt;minis-button variant="transparent" size="lg" full-width&gt;</code>).
<br><br>
Content is left-aligned at every width. The photo sits in the top-right corner (280×280 desktop, 144×144 mobile),
partly cropped by the banner edge, and <strong>never affects the height</strong> — use a transparent PNG with the blob
shape baked in; no mask is applied in this layout.
        `,
      },
    },
  },
  render: () => html`
    ${demoStyles}
    <minis-page-header layout="inspirations" theme="brand" description="${DESCRIPTION}">
      Ušetřete za pobyt<br>v italském Rimini
      ${photo}
      ${defaultControls}
    </minis-page-header>
  `,
};

// ─── Inspirations — All Themes ────────────────────────────────────────────────

export const InspirationsAllThemes: Story = {
  name: 'Inspirations — All Themes',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'All six themes. Text is dark blue on brand / yellow / summer and white on pink / green / blue; the seal colour is set per theme. The search button is the transparent variant, so it picks up a dark tint of each surface.',
      },
    },
  },
  render: () => html`
    ${demoStyles}
    <div style="display:flex;flex-direction:column;gap:var(--spacing-layout-md, 24px)">
      ${(['brand', 'yellow', 'summer', 'pink', 'green', 'blue'] as const).map(
        (theme) => html`
          <minis-page-header layout="inspirations" theme="${theme}" description="${DESCRIPTION}">
            Ušetřete za pobyt<br>v italském Rimini
            ${photo}
            ${defaultControls}
          </minis-page-header>
        `,
      )}
    </div>
  `,
};

// ─── Inspirations — All Parts ─────────────────────────────────────────────────

export const InspirationsAllParts: Story = {
  name: 'Inspirations — All Parts',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
<p>Every optional part switched on, in Figma order:</p>
<ol>
  <li><strong>Message</strong> — <code>message</code> slot. "Message on product" is a draft with no component yet; this is the markup recipe from the Message docs.</li>
  <li><strong>Tag</strong> — <code>tag</code> attribute.</li>
  <li><strong>Heading + badge</strong> — default slot.</li>
  <li><strong>Location</strong> — <code>location</code> attribute. A button; listen for <code>location-click</code> to open your location picker.</li>
  <li><strong>Description</strong> — <code>description</code> attribute.</li>
  <li><strong>Collapsible</strong> — put extra content in the <code>more</code> slot and a "Více informací" toggle appears (<code>more-label</code> to rename it). Click it: the content expands, <code>expanded</code> is reflected and <code>more-toggle</code> fires.</li>
  <li><strong>Button</strong> — <code>button</code> slot, <code>&lt;minis-button variant="transparent" size="xl"&gt;</code>.</li>
  <li><strong>Controls</strong> — <code>controls</code> slot.</li>
</ol>
        `,
      },
    },
  },
  render: () => html`
    ${demoStyles}
    <minis-page-header
      layout="inspirations"
      theme="brand"
      tag="Do 1. června zbývá 6 dní"
      location="v Rosovicích a okolí"
      description="${DESCRIPTION}"
    >
      Ušetřete za pobyt<br>v italském Rimini
      <div slot="message" class="ph-demo-message" role="status">
        Nový poklad je tu a s ním i pořádná porce kreditů. Jste zvědaví, co na vás čeká?
        <a href="#">Vyzvednout poklad</a>
      </div>
      <p slot="more" style="margin:0">
        Sleva platí na vybrané pobyty v Rimini a okolí s nástupem do konce června. Kombinovat ji
        nelze s jinými akcemi.
      </p>
      <minis-button slot="button" variant="transparent" size="xl">Mrknout na volné židle</minis-button>
      ${photo}
      ${defaultControls}
    </minis-page-header>
  `,
};

// ─── Inspirations — Mobile ────────────────────────────────────────────────────

export const InspirationsMobile: Story = {
  name: 'Inspirations — Mobile',
  parameters: {
    controls: { disable: true },
    viewport: { defaultViewport: 'iphone6' },
    docs: {
      description: {
        story: `
Below 768px (container width) the controls stack and stretch — give the button <code>full-width</code> so its face fills
the row (the component cancels the stretch again on desktop). The 144px photo overlaps the top-right corner and
the text runs over it. Opens with the Storybook viewport set to iPhone 6 (375px).
        `,
      },
    },
  },
  render: () => html`
    ${demoStyles}
    <minis-page-header layout="inspirations" theme="pink" description="${DESCRIPTION}">
      Ušetřete za pobyt<br>v italském Rimini
      ${photo}
      ${defaultControls}
    </minis-page-header>
  `,
};

// ─── Content left ─────────────────────────────────────────────────────────────

const MORE_TEXT = html`
  <p slot="more" style="margin:0">
    Sleva platí na vybrané pobyty v Rimini a okolí s nástupem do konce června. Kombinovat ji
    nelze s jinými akcemi. Voucher uplatníte nejpozději 14 dní před příjezdem, termín si
    rezervujete přímo u hotelu. Storno je zdarma do 30 dní před nástupem.
  </p>
`;

export const ContentLeft: Story = {
  name: 'Content left',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
The Figma <code>Layout=Content left</code> variant: Inspirations without the controls row. Any
<code>slot="controls"</code> children are ignored.
<br><br>
From 768px the 280px photo follows three rules:
<ol>
  <li>it is <strong>vertically centred</strong> in the banner, right-aligned to the container padding;</li>
  <li>the banner height comes from the <strong>content only</strong> — when the content is shorter than the photo, the photo is cropped top and bottom;</li>
  <li>opening "Více informací" grows the banner but the photo <strong>stays where it was</strong> (see <em>Content left — Collapsible</em>).</li>
</ol>
        `,
      },
    },
  },
  render: () => html`
    <minis-page-header layout="content-left" theme="brand" description="${DESCRIPTION}">
      Ušetřete za pobyt<br>v italském Rimini
      ${photo}
    </minis-page-header>
  `,
};

export const ContentLeftAllThemes: Story = {
  name: 'Content left — All Themes',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All six themes. Text and seal colours follow the same theme palette as the other layouts.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--spacing-layout-md, 24px)">
      ${(['brand', 'yellow', 'summer', 'pink', 'green', 'blue'] as const).map(
        (theme) => html`
          <minis-page-header layout="content-left" theme="${theme}" description="${DESCRIPTION}">
            Ušetřete za pobyt<br>v italském Rimini
            ${photo}
          </minis-page-header>
        `,
      )}
    </div>
  `,
};

export const ContentLeftCollapsible: Story = {
  name: 'Content left — Collapsible',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
Click "Více informací": the banner grows by the revealed text, but the photo keeps its position — it stays
centred on the <em>collapsed</em> height. CSS can't express that (the <code>more</code> block sits between the
description and the toggle), so the component measures it with a <code>ResizeObserver</code> and sets
<code>--_visual-center</code>. The second banner has a tag and a CTA so the content is taller than the photo.
        `,
      },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--spacing-layout-md, 24px)">
      <minis-page-header layout="content-left" theme="brand" description="${DESCRIPTION}">
        Ušetřete za pobyt<br>v italském Rimini
        ${MORE_TEXT}
        ${photo}
      </minis-page-header>
      <minis-page-header
        layout="content-left"
        theme="blue"
        tag="Do 1. června zbývá 6 dní"
        location="v Rosovicích a okolí"
        description="${DESCRIPTION}"
      >
        Ušetřete za pobyt<br>v italském Rimini
        ${MORE_TEXT}
        <minis-button slot="button" variant="transparent" size="xl">Mrknout na volné židle</minis-button>
        ${photo}
      </minis-page-header>
    </div>
  `,
};

export const ContentLeftMobile: Story = {
  name: 'Content left — Mobile',
  parameters: {
    controls: { disable: true },
    viewport: { defaultViewport: 'iphone6' },
    docs: {
      description: {
        story:
          'Below 768px (container width) Content left behaves like Inspirations: the 144px photo overlaps the top-right corner and the text runs over it. Opens with the Storybook viewport set to iPhone 6 (375px).',
      },
    },
  },
  render: () => html`
    <minis-page-header layout="content-left" theme="pink" description="${DESCRIPTION}">
      Ušetřete za pobyt<br>v italském Rimini
      ${MORE_TEXT}
      ${photo}
    </minis-page-header>
  `,
};

// ─── Centric ──────────────────────────────────────────────────────────────────

export const Centric: Story = {
  name: 'Centric',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
The Figma <code>Layout=Centric</code> variant: <strong>no photo</strong> (the <code>image</code> slot is not rendered)
and every part centred. The heading wraps freely and the badge sits right after its last character, so it
travels with the centred last line.
<br><br>
The controls are a row of category tags (Figma <code>_Centered controls</code>, Content=Categories). On desktop
the row is centred and <strong>wraps</strong>; on mobile it becomes a <strong>swipeable</strong> row (see
<em>Centric — Mobile</em>).
        `,
      },
    },
  },
  render: () => html`
    <minis-page-header layout="centric" theme="brand" description="${DESCRIPTION}">
      Ušetřete za pobyt<br>v italském Rimini
      ${categoryControls}
    </minis-page-header>
  `,
};

export const CentricAllThemes: Story = {
  name: 'Centric — All Themes',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'All six themes, same palette as the other layouts.' } },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--spacing-layout-md, 24px)">
      ${(['brand', 'yellow', 'summer', 'pink', 'green', 'blue'] as const).map(
        (theme) => html`
          <minis-page-header layout="centric" theme="${theme}" description="${DESCRIPTION}">
            Ušetřete za pobyt<br>v italském Rimini
            ${categoryControls}
          </minis-page-header>
        `,
      )}
    </div>
  `,
};

export const CentricAllParts: Story = {
  name: 'Centric — All Parts',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Every optional part switched on, all centred: message, tag, heading + badge, location, description, collapsible, button and a long category row that wraps onto a second line on desktop.',
      },
    },
  },
  render: () => html`
    ${demoStyles}
    <minis-page-header
      layout="centric"
      theme="blue"
      tag="Do 1. června zbývá 6 dní"
      location="v Rosovicích a okolí"
      description="${DESCRIPTION}"
    >
      Ušetřete za pobyt v italském Rimini a na celém jaderském pobřeží
      <div slot="message" class="ph-demo-message" role="status">
        Nový poklad je tu a s ním i pořádná porce kreditů. Jste zvědaví, co na vás čeká?
        <a href="#">Vyzvednout poklad</a>
      </div>
      <p slot="more" style="margin:0">
        Sleva platí na vybrané pobyty v Rimini a okolí s nástupem do konce června. Kombinovat ji
        nelze s jinými akcemi.
      </p>
      <minis-button slot="button" variant="transparent" size="xl">Mrknout na volné židle</minis-button>
      ${categoryTags([...CATEGORIES, 'Wellness', 'Hory', 'Moře', 'Last minute', 'Pro rodiny', 'Romantika', 'Gastro', 'Zážitky'])}
    </minis-page-header>
  `,
};

export const CentricMobile: Story = {
  name: 'Centric — Mobile',
  parameters: {
    controls: { disable: true },
    viewport: { defaultViewport: 'iphone6' },
    docs: {
      description: {
        story: `
Below 768px (container width) the category row does not wrap: it scrolls sideways, edge to edge of the banner.
A 32px fade in the theme surface marks each side that still has tags to scroll to — at rest only the right one
shows. A row that fits stays centred. Opens with the Storybook viewport set to iPhone 6 (375px).
        `,
      },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--spacing-layout-md, 24px)">
      <minis-page-header layout="centric" theme="brand" description="${DESCRIPTION}">
        Ušetřete za pobyt<br>v italském Rimini
        ${categoryControls}
      </minis-page-header>
      <minis-page-header layout="centric" theme="pink" description="${DESCRIPTION}">
        Ušetřete za pobyt<br>v italském Rimini
        ${categoryTags(['Benefity', 'FKSP'])}
      </minis-page-header>
    </div>
  `,
};

// ─── Default layout ───────────────────────────────────────────────────────────
// The original hero layout (no `layout` attribute). No longer in Figma — kept
// until the Simple / Centered simple layouts are designed.

// ─── All Themes ───────────────────────────────────────────────────────────────

export const AllThemes: Story = {
  name: 'Default — All Themes',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'All six color themes in the default layout. Text and seal colours are set by the theme — the same palette as the Inspirations layout.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:0">
      ${(['brand', 'yellow', 'summer', 'pink', 'green', 'blue'] as const).map(
        (theme) => html`
          <minis-page-header
            theme="${theme}"
            description="Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu."
          >
            Ušetřete za pobyt<br>v italském Rimini
            <div
              slot="image"
              style="width:100%;height:100%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,.6)"
            >${theme}</div>
          </minis-page-header>
        `
      )}
    </div>
  `,
};

// ─── With CTA Button ──────────────────────────────────────────────────────────

export const WithButton: Story = {
  name: 'Default — With CTA Button',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Place a <code>&lt;minis-button variant="transparent" size="xl"&gt;</code> in the <code>button</code> slot for a call-to-action.',
      },
    },
  },
  render: () => html`
    <minis-page-header
      theme="brand"
      description="Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu. Ale pozor – akce platí jen dnes."
    >
      Ušetřete za pobyt<br>v italském Rimini
      <minis-button slot="button" variant="transparent" size="xl">Mrknout na volné termíny</minis-button>
      <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,.6)">photo</div>
    </minis-page-header>
  `,
};

// ─── With Tag ─────────────────────────────────────────────────────────────────

export const WithTag: Story = {
  name: 'Default — With Tag',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'The <code>tag</code> attribute shows a small countdown/label pill above the heading.',
      },
    },
  },
  render: () => html`
    <minis-page-header
      theme="yellow"
      tag="Do 1. června zbývá 6 dní"
      description="Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu."
    >
      Ušetřete za pobyt<br>v italském Rimini
      <minis-button slot="button" variant="transparent" size="xl">Zobrazit akci</minis-button>
      <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,.6)">photo</div>
    </minis-page-header>
  `,
};

// ─── No Badge ─────────────────────────────────────────────────────────────────

export const NoBadge: Story = {
  name: 'Default — No Badge',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Add the <code>no-badge</code> attribute to hide the Brand/Badge seal.' },
    },
  },
  render: () => html`
    <minis-page-header
      theme="blue"
      description="Dnešní 30% sleva navíc vám nesmí uniknout."
      no-badge
    >
      Ušetřete za pobyt<br>v italském Rimini
      <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,.6)">photo</div>
    </minis-page-header>
  `,
};

// ─── Badge Anchoring ──────────────────────────────────────────────────────────

export const BadgeAnchoring: Story = {
  name: 'Default — Badge Anchoring',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
The badge always lands on the <strong>last line</strong> of the heading, centred on that
line's line-height, with a <code>0.27em</code> gap after the text — one line or five, at any
breakpoint. Size (<code>0.8em</code>) and gap (<code>0.27em</code>) are <code>em</code>-relative, so both scale
with the responsive heading font-size.
<br><br>
Every banner uses the same seal — its size and gap are fixed by the design system, with no
per-instance override.
        `,
      },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:0">
      <minis-page-header theme="brand">
        One line
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>

      <minis-page-header theme="yellow">
        Two lines<br>of heading
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>

      <minis-page-header theme="green">
        Three lines<br>of a longer<br>page heading
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>

      <minis-page-header theme="pink" description="With a description below the heading.">
        Two lines<br>and a description
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>
    </div>
  `,
};

// ─── Mobile Layout ────────────────────────────────────────────────────────────

export const MobileLayout: Story = {
  name: 'Default — Mobile Layout',
  parameters: {
    controls: { disable: true },
    viewport: { defaultViewport: 'iphone6' },
    docs: {
      description: {
        story: 'Mobile layout (≤767 px): image on top, content stacked below. This story opens with the Storybook viewport set to iPhone 6 (375 px) so the mobile layout is visible immediately.',
      },
    },
  },
  render: () => html`
    <minis-page-header
      theme="brand"
      tag="Do 1. června zbývá 6 dní"
      description="Dnešní 30% sleva navíc vám nesmí uniknout."
    >
      Ušetřete za pobyt<br>v italském Rimini
      <minis-button slot="button" variant="transparent" size="xl">Zjistit více</minis-button>
      <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,.6)">photo</div>
    </minis-page-header>
  `,
};

// ─── Content Variants ─────────────────────────────────────────────────────────

export const ContentVariants: Story = {
  name: 'Default — Content Variants',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Heading only · Heading + description · Full (tag, description, button).' },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:0">
      <minis-page-header theme="pink">
        Heading only<br>no extras
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>

      <minis-page-header
        theme="green"
        description="With description but no button or tag."
      >
        Heading and<br>description
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>

      <minis-page-header
        theme="brand"
        tag="Do 1. června zbývá 6 dní"
        description="Dnešní 30% sleva navíc vám nesmí uniknout. Pořiďte si dovolenou u moře za ještě lepší cenu."
      >
        Full header<br>all features
        <minis-button slot="button" variant="transparent" size="xl">Zjistit více</minis-button>
        <div slot="image" style="width:100%;height:100%;background:rgba(0,0,0,.15)"></div>
      </minis-page-header>
    </div>
  `,
};
