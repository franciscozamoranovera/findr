// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config

export default defineConfig({
  site: 'https://findr.cl',
  output: 'server', //enable SSR
  adapter: vercel(),

  devToolbar: {
      enabled: false
    },

  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes('/login') &&
        !page.includes('/review'),
    }),
  ],

  vite: {
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },
  },
});