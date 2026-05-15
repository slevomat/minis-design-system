import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './navigation.js';
import '../tag/tag.js';
import '@minis/icons';

const meta: Meta = {
  title: 'Components/Navigation/Navigation',
  component: 'minis-navigation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<p><a href="https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=3470-668" target="_blank" rel="noopener noreferrer">Open in Figma ↗</a></p>
<p>A horizontal scrollable navigation bar composed of <code>&lt;minis-navigation-item&gt;</code> elements.</p>
<p>Two variants match the two patterns on slevomat.cz:</p>
<ul>
  <li><strong>horizontal</strong> — top-level category navigation (e.g. homepage menu bar)</li>
  <li><strong>tabs</strong> — product detail tab switcher (e.g. Nabídka / Hodnocení / O hotelu)</li>
</ul>
<p>Use the <code>actions</code> slot to place a right-aligned button (e.g. favourite/save).</p>
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'tabs'],
      description: 'Visual variant — `horizontal` for category nav, `tabs` for tab switcher',
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
    variant: 'horizontal',
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

export const Horizontal: Story = {
  name: 'Horizontal — category nav',
  render: () => {
    const nav = document.createElement('minis-navigation') as HTMLElement;
    nav.setAttribute('variant', 'horizontal');
    nav.setAttribute('aria-label', 'Hlavní menu');
    nav.innerHTML = `
      <minis-navigation-item>
        <minis-icon slot="icon" name="star" size="20"></minis-icon>
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
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
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
