import { defineConfig } from 'vite';

export default defineConfig({
  // Vendor files live in public/ and are served as static assets.
  // Bare "lit" imports in those files are resolved by the browser import map
  // defined in index.html — Vite never touches them.
});
