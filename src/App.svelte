<script lang="ts">
  import { ruta } from './lib/ruta.svelte.ts'
  import Marca from './lib/Marca.svelte'
  import Inicio from './pantallas/Inicio.svelte'
  import Modulo from './pantallas/Modulo.svelte'
  import Bibliografia from './pantallas/Bibliografia.svelte'
  import Texto from './pantallas/Texto.svelte'

  const seccion = $derived(ruta.partes[0] ?? '')
  const param = $derived(ruta.partes[1] ?? '')
</script>

<Marca />
<nav class="menu" aria-label="Secciones">
  <a href="#/" aria-current={seccion === '' ? 'page' : undefined}>Inicio</a>
  <a href="#/bibliografia" aria-current={seccion === 'bibliografia' || seccion === 'texto' ? 'page' : undefined}>Bibliografía</a>
</nav>

<main>
  {#if seccion === 'modulo'}
    <Modulo id={param} />
  {:else if seccion === 'bibliografia'}
    <Bibliografia />
  {:else if seccion === 'texto'}
    <Texto id={param} />
  {:else}
    <Inicio />
  {/if}
</main>

<footer>
  <p class="suave">
    Los textos están en una carpeta de Drive que abre solo para quienes tienen acceso. Este sitio no guarda ni muestra datos
    de cursantes.
  </p>
</footer>

<style>
  .menu {
    display: flex;
    gap: 4px;
    padding: 8px 16px 0;
    max-width: 900px;
    margin: 0 auto;
  }
  .menu a {
    padding: 8px 14px;
    border-radius: 8px;
    color: var(--texto-suave);
    text-decoration: none;
    font-weight: 500;
  }
  .menu a[aria-current='page'] {
    color: var(--acento);
    background: var(--celeste);
  }
  main {
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
  }
  footer {
    max-width: 900px;
    margin: 24px auto 0;
    padding: 16px;
    border-top: 1px solid var(--borde);
    font-size: 0.85rem;
  }
</style>
