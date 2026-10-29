import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      // Mirror src paths (dist/icons/plus.js) so each file lines up with its .d.ts.
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      // Every lit entry point (lit/decorators.js, lit/directives/…), not just bare 'lit'.
      external: [/^lit(\/|$)/],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
});
