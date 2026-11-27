<script lang="ts">
  import { fechaLarga, moduloPorId } from '../lib/datos.ts'

  let { id }: { id: string } = $props()
  const modulo = $derived(moduloPorId(id))
</script>

{#if modulo}
  <p class="suave"><a href="#/">Inicio</a> / Módulo {modulo.numero}</p>
  <h1>{modulo.titulo}</h1>
  {#if modulo.lineaTransversal}<p class="suave">Línea transversal: {modulo.lineaTransversal}</p>{/if}

  <ol class="clases">
    {#each modulo.clases as c (c.numero)}
      <li class="tarjeta">
        <h3>Clase {c.numero} <span class="suave fecha">· {fechaLarga(c.fecha)}</span></h3>
        <p>{c.temario}</p>
        <p class="suave">
          Docentes: {c.docentes.join(' y ')}{#if c.notaDocentes}{' '}({c.notaDocentes}){/if}
        </p>
        {#if c.entrega}<p><span class="etiqueta">Entrega</span> {c.entrega}</p>{/if}
      </li>
    {/each}
  </ol>
{:else}
  <h1>Módulo no encontrado</h1>
  <p><a href="#/">Volver al inicio</a></p>
{/if}

<style>
  .clases {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 12px;
  }
  .clases p {
    margin: 4px 0 0;
  }
  .fecha {
    font-family: 'Archivo', system-ui, sans-serif;
    font-weight: 400;
    font-size: 0.9rem;
  }
</style>
