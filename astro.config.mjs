// @ts-check
import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  site: "https://amat012.github.io",
  base: "/ghost-runner-pizza",
  trailingSlash: "always",
});

{
  experimental: {
    svg: true
  }
 }