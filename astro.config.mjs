// @ts-check
import { defineConfig } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs()],
  site: "https://amat012.github.io",
  base: "ghost-runner-pizza",
  trailingSlash: "always",
});

{
  experimental: {
    svg: true
  }
 }