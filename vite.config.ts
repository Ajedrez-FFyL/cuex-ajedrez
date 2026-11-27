import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

// En GitHub Pages el sitio vive en /cuex-ajedrez/; en desarrollo y en `vite preview` local, en la raíz.
const base = process.env.GITHUB_ACTIONS ? '/cuex-ajedrez/' : '/'

export default defineConfig({
  base,
  plugins: [svelte()],
})
