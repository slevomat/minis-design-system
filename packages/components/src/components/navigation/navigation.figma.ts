// IMPORTANT: import from the '/html' subpath — the package root only
// exports the React API and `{ html }` fails `tsc` (TS2614).
import figma, { html } from '@figma/code-connect/html';

// ── Navigation ────────────────────────────────────────────────────────────────
// Figma component set "Navigation" (5226:5557). One property:
// Variant = "main nav" | "Tabs". The items live in a Figma slot, so the snippet
// spells them out instead of mapping them.
//
// The bar is layout-neutral, same as <minis-topbar>: the white surface and the
// 1240px measure around it in Figma come from the wrapping <minis-container>,
// not from the component.
figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=5226-5557',
  {
    props: {
      variant: figma.enum('Variant', {
        'main nav': 'main-nav',
        Tabs: 'tabs',
      }),
    },
    example: ({ variant }) => html`
      <minis-navigation variant=${variant} aria-label="Hlavní menu">
        <minis-navigation-item href="/extra-slevy">
          <minis-icon slot="icon" name="star" size="24"></minis-icon>
          Extra slevy
        </minis-navigation-item>
        <minis-navigation-item href="/cestovani" active>Cestování</minis-navigation-item>
        <minis-navigation-item href="/zbozi">Zboží</minis-navigation-item>
        <minis-navigation-item href="/potraviny">Potraviny</minis-navigation-item>
      </minis-navigation>
    `,
  },
);
