// IMPORTANT: import from the '/html' subpath — the package root only
// exports the React API and `{ html }` fails `tsc` (TS2614).
import figma, { html } from '@figma/code-connect/html';

// Figma: `sidebar-layout` component set (Breakpoints & Containers page).
// `Layout` (columns | stacked) is not mapped: the component switches itself
// (viewport 1008px+ and own width 944px+). The `Main` / `Sidebar` slots are
// not mapped either: slot content can't be expressed in a snippet.
figma.connect(
  'https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=6444-155',
  {
    example: () => html`<minis-sidebar-layout><main>…</main><aside slot="sidebar">…</aside></minis-sidebar-layout>`,
  },
);
