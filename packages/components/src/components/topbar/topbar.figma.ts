// IMPORTANT: import from the '/html' subpath — the package root only
// exports the React API and `{ html }` fails `tsc` (TS2614).
import figma, { html } from '@figma/code-connect/html';

// Figma component set **TopBar** (renamed from *Header* on 2026-08-07 to match
// the code tag, which became `<minis-topbar>` in March 2026 so it wouldn't be
// confused with `<minis-page-header>`, the hero). Its single variant property
// is `Property 1` = `web` | `vibe-apps`.
//
// NOTE: no ternaries (or any other expression) inside the `html` template —
// the HTML parser only accepts prop placeholders there. Conditional markup
// belongs in the enum's value mapping instead.
figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=5156-9287',
  {
    props: {
      variant: figma.enum('Property 1', {
        web: 'web',
        'vibe-apps': 'vibe-apps',
      }),
      // The right-hand side differs per variant: action buttons on the web
      // header, the app's own name in a vibe-coded app.
      // prettier-ignore
      trailing: figma.enum('Property 1', {
        web: html`<minis-button slot="actions" variant="tertiary" size="sm"><minis-icon slot="icon" name="heart-fill" size="16"></minis-icon>Oblíbené</minis-button><minis-button slot="actions" variant="cta-buy" size="sm"><minis-icon slot="icon" name="cart-fill"></minis-icon>Košík</minis-button>`,
        'vibe-apps': undefined,
      }),
      appName: figma.enum('Property 1', {
        web: undefined,
        'vibe-apps': 'app-name="My app"',
      }),
    },
    example: ({ variant, appName, trailing }) => html`
      <minis-topbar variant=${variant} ${appName}>
        <img slot="logo" src="/logo.svg" alt="Slevomat" />
        ${trailing}
      </minis-topbar>
    `,
  },
);
