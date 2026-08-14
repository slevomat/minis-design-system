import type { Meta, StoryObj } from '@storybook/web-components';
import './navigation.js';
import '../tag/tag.js';
import '@minis/icons';

const meta: Meta = {
  title: 'Components/Navigations/Navigation',
  component: 'minis-navigation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=5226-5557&t=pHPts4rDDA6R6smX-11" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.35em;font-size:.875em;color:var(--color-text-accent-link,#006eb9);text-decoration:none;border:1px solid currentColor;border-radius:4px;padding:.2em .55em;line-height:1.4"><svg width="13" height="13" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 57c5.523 0 10-4.477 10-10v-10H10c-5.523 0-10 4.477-10 10s4.477 10 10 10z" fill="#0ACF83"/><path d="M0 29c0-5.523 4.477-10 10-10h10v20H10C4.477 39 0 34.523 0 29z" fill="#A259FF"/><path d="M0 10C0 4.477 4.477 0 10 0h10v20H10C4.477 20 0 15.523 0 10z" fill="#F24E1E"/><path d="M20 0h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H20V0z" fill="#FF7262"/><path d="M40 29c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z" fill="#1ABCFE"/></svg> Open in Figma ↗</a></p>
<p>A horizontal scrollable navigation bar composed of <code>&lt;minis-navigation-item&gt;</code> elements.</p>
<p>Two variants match the two patterns on slevomat.cz:</p>
<ul>
  <li><strong>main-nav</strong> — the site's main category navigation. It appears <strong>once per page</strong>, directly under <code>&lt;minis-topbar&gt;</code>; the two together are mandatory on every Slevomat web page. Items are distributed across the full container width.</li>
  <li><strong>tabs</strong> — in-page contextual tab switcher (e.g. Nabídka / Hodnocení / O hotelu). May appear more than once per page, never at the top. Items are left-aligned with a 24px gap.</li>
</ul>
<p>The legacy value <code>variant="horizontal"</code> is still accepted and normalised to <code>main-nav</code>.</p>
<p>Use the <code>actions</code> slot to place a right-aligned button (e.g. favourite/save).</p>
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['main-nav', 'tabs'],
      description: 'Visual variant — `main-nav` for the site menu, `tabs` for an in-page tab switcher',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the inner `<nav>` element',
    },
  },
};

export default meta;
type Story = StoryObj;

/** Wire click-to-activate on all minis-navigation-item children of a nav element. */
function activateOnClick(nav: Element) {
  nav.addEventListener('click', (e) => {
    const item = (e.target as Element).closest('minis-navigation-item');
    if (!item) return;
    nav.querySelectorAll('minis-navigation-item').forEach((el) => el.removeAttribute('active'));
    item.setAttribute('active', '');
  });
}

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'main-nav',
    ariaLabel: 'Hlavní menu',
  },
  render: (args) => {
    const nav = document.createElement('minis-navigation') as HTMLElement;
    nav.setAttribute('variant', args.variant);
    nav.setAttribute('aria-label', args.ariaLabel);
    nav.innerHTML = `
      <minis-navigation-item active>Cestování</minis-navigation-item>
      <minis-navigation-item>Zážitky a zábava</minis-navigation-item>
      <minis-navigation-item>Krása a relax</minis-navigation-item>
      <minis-navigation-item>Restaurace a bary</minis-navigation-item>
      <minis-navigation-item>Zboží</minis-navigation-item>
      <minis-navigation-item>Potraviny</minis-navigation-item>
      <minis-navigation-item>Dárky</minis-navigation-item>
    `;
    activateOnClick(nav);
    return nav;
  },
};

// ─── Horizontal (category nav) ────────────────────────────────────────────────

export const MainNav: Story = {
  name: 'Main nav — site category navigation',
  render: () => {
    const nav = document.createElement('minis-navigation') as HTMLElement;
    nav.setAttribute('variant', 'main-nav');
    nav.setAttribute('aria-label', 'Hlavní menu');
    nav.innerHTML = `
      <minis-navigation-item>
        <minis-icon slot="icon" name="star" size="24"></minis-icon>
        Extra slevy
      </minis-navigation-item>
      <minis-navigation-item active>Cestování</minis-navigation-item>
      <minis-navigation-item>Zážitky a zábava</minis-navigation-item>
      <minis-navigation-item>Krása a relax</minis-navigation-item>
      <minis-navigation-item>Restaurace a bary</minis-navigation-item>
      <minis-navigation-item>Zboží</minis-navigation-item>
      <minis-navigation-item>Fotodárky</minis-navigation-item>
      <minis-navigation-item>Potraviny</minis-navigation-item>
      <minis-navigation-item>Praktické</minis-navigation-item>
      <minis-navigation-item>Dárky</minis-navigation-item>
      <minis-navigation-item>Benefity</minis-navigation-item>
    `;
    activateOnClick(nav);
    return nav;
  },
};

// ─── Tabs (product detail) ────────────────────────────────────────────────────

export const Tabs: Story = {
  name: 'Tabs — product detail',
  render: () => {
    const nav = document.createElement('minis-navigation') as HTMLElement;
    nav.setAttribute('variant', 'tabs');
    nav.setAttribute('aria-label', 'Záložky produktu');
    nav.innerHTML = `
      <minis-navigation-item active>Nabídka</minis-navigation-item>
      <minis-navigation-item>Hodnocení</minis-navigation-item>
      <minis-navigation-item>O hotelu</minis-navigation-item>
      <minis-navigation-item>Tipy na výlet</minis-navigation-item>
      <minis-navigation-item>Dotazy</minis-navigation-item>
      <minis-navigation-item color="positive">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21H5.6C7.02 18.13 8.84 15.5 12 14c-1 3-1 6 1 8h2c0-4 1.5-6.83 3-9C18 15 18 18 17 22h1.8c1.57-3.53 2.2-8 0-14z"/>
        </svg>
        Pro přírodu
      </minis-navigation-item>
    `;
    activateOnClick(nav);
    return nav;
  },
};

// ─── Tabs with actions slot ────────────────────────────────────────────────────

export const TabsWithActions: Story = {
  name: 'Tabs — with actions slot',
  render: () => {
    const nav = document.createElement('minis-navigation') as HTMLElement;
    nav.setAttribute('variant', 'tabs');
    nav.setAttribute('aria-label', 'Záložky produktu');
    nav.innerHTML = `
      <minis-navigation-item active>Nabídka</minis-navigation-item>
      <minis-navigation-item>Hodnocení</minis-navigation-item>
      <minis-navigation-item>O hotelu</minis-navigation-item>
      <minis-navigation-item>Tipy na výlet</minis-navigation-item>
      <minis-navigation-item>Dotazy</minis-navigation-item>
      <minis-tag slot="actions" variant="toggle">
        <minis-icon slot="icon" name="heart"></minis-icon>
        Uložit
      </minis-tag>
    `;

    const tag = nav.querySelector('minis-tag') as HTMLElement & { pressed: boolean };
    tag.addEventListener('toggle', (e: Event) => {
      const icon = tag.querySelector('minis-icon') as HTMLElement & { name: string };
      if (icon) icon.name = (e as CustomEvent).detail.pressed ? 'heart-fill' : 'heart';
    });

    activateOnClick(nav);
    return nav;
  },
};

// ─── Overflow ────────────────────────────────────────────────────────────────

/** All 11 Slevomat categories — more than fits in a narrow frame. */
const ALL_CATEGORIES = `
  <minis-navigation-item href="/extra-slevy">
    <minis-icon slot="icon" name="star" size="24"></minis-icon>
    Extra slevy
  </minis-navigation-item>
  <minis-navigation-item href="/cestovani">Cestování</minis-navigation-item>
  <minis-navigation-item href="/zazitky">Zážitky a zábava</minis-navigation-item>
  <minis-navigation-item href="/krasa">Krása a relax</minis-navigation-item>
  <minis-navigation-item href="/restaurace">Restaurace a bary</minis-navigation-item>
  <minis-navigation-item href="/zbozi">Zboží</minis-navigation-item>
  <minis-navigation-item href="/fotodarky">Fotodárky</minis-navigation-item>
  <minis-navigation-item href="/potraviny">Potraviny</minis-navigation-item>
  <minis-navigation-item href="/prakticke">Praktické</minis-navigation-item>
  <minis-navigation-item href="/darky">Dárky</minis-navigation-item>
  <minis-navigation-item href="/benefity" active>Benefity</minis-navigation-item>
`;

export const Overflow: Story = {
  name: 'Overflow — resize me',
  parameters: {
    docs: {
      description: {
        story:
          'Drag the frame narrower. Above the `breakpoint` items that no longer fit collapse into the "Další" menu; at or below it, the bar goes back to scrolling. The active item — "Benefity", the last one — is never put in the menu. This story sets `breakpoint="xs"` (408px) so the collapse is visible even in the narrow Docs canvas (~605px); the component default is `md` (768px).',
      },
    },
  },
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'resize:horizontal;overflow:auto;min-width:320px;max-width:100%;padding-bottom:260px';
    const nav = document.createElement('minis-navigation') as HTMLElement;
    nav.setAttribute('variant', 'main-nav');
    nav.setAttribute('aria-label', 'Hlavní menu');
    // xs (408px), not the md default: the Docs canvas is only ~605px wide, and
    // at md this story would never collapse there — it would silently show only
    // half of what it is meant to demonstrate.
    nav.setAttribute('breakpoint', 'xs');
    nav.innerHTML = ALL_CATEGORIES;
    activateOnClick(nav);
    wrap.appendChild(nav);
    return wrap;
  },
};

export const OverflowNarrow: Story = {
  name: 'Overflow — below the breakpoint (scrolls)',
  parameters: {
    docs: {
      description: {
        story:
          'The same nav in a 600px column, under the `md` breakpoint: no menu appears and the bar scrolls horizontally instead. Swipe or drag it sideways.',
      },
    },
  },
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:600px;max-width:100%;outline:1px dashed #cbccce;padding:8px';
    const nav = document.createElement('minis-navigation') as HTMLElement;
    nav.setAttribute('variant', 'main-nav');
    nav.setAttribute('aria-label', 'Hlavní menu');
    nav.innerHTML = ALL_CATEGORIES;
    activateOnClick(nav);
    wrap.appendChild(nav);
    return wrap;
  },
};

// ─── Item colors ─────────────────────────────────────────────────────────────

export const ItemColors: Story = {
  name: 'Item colors',
  render: () => {
    const nav = document.createElement('minis-navigation') as HTMLElement;
    nav.setAttribute('variant', 'tabs');
    nav.setAttribute('aria-label', 'Colors demo');
    nav.innerHTML = `
      <minis-navigation-item active>Default (active)</minis-navigation-item>
      <minis-navigation-item>Default</minis-navigation-item>
      <minis-navigation-item color="positive" active>Positive (active)</minis-navigation-item>
      <minis-navigation-item color="positive">Positive</minis-navigation-item>
    `;
    activateOnClick(nav);
    return nav;
  },
};

// ─── No active item ────────────────────────────────────────────────────────────

export const NoActiveItem: Story = {
  name: 'No active item',
  render: () => {
    const nav = document.createElement('minis-navigation') as HTMLElement;
    nav.setAttribute('variant', 'tabs');
    nav.setAttribute('aria-label', 'Záložky');
    nav.innerHTML = `
      <minis-navigation-item>Nabídka</minis-navigation-item>
      <minis-navigation-item>Hodnocení</minis-navigation-item>
      <minis-navigation-item>O hotelu</minis-navigation-item>
    `;
    activateOnClick(nav);
    return nav;
  },
};
