// @ts-check
import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  site: "https://amat012.github.io",
  base: "/ghost-runner-pizza",
  trailingSlash: "always",
  adapter: netlify(),
});

{
  experimental: {
    svg: true
  }
 }