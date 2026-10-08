import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://cpcesfe.org.ar',
  server: {
    port: 3000,
    host: true
  }
});
