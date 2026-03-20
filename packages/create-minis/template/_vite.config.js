import { defineConfig } from 'vite';

export default defineConfig({
  // Mini*S vendor files use bare 'lit' imports — Vite resolves from node_modules.
  // No additional configuration needed.
});
