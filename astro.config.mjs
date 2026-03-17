// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config

export default defineConfig({
  output: 'server', //enable SSR
  adapter: vercel(),
  build: {
      server: './server',
      assets: 'assets',
  },

  outDir: './dist',

  devToolbar: {
      enabled: false
    },

  integrations: [react(), tailwind()],
});