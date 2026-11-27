<script lang="ts">
  import { areaPorId, cita, textoPorId } from '../lib/datos.ts'

  let { id }: { id: string } = $props()
  const texto = $derived(textoPorId(id))
  const area = $derived(texto ? areaPorId(texto.areaId) : undefined)
</script>

{#if texto}
  <p class="suave"><a href="#/bibliografia">Bibliografía</a>{#if area}{' / '}{area.titulo}{/if}</p>
  <h1>{texto.titulo}</h1>
  <dl>
    <dt>Autor</dt>
    <dd>{texto.autor ?? 'Sin consignar'}</dd>
    <dt>Año</dt>
    <dd>{texto.anio ?? 'Sin consignar'}</dd>
    {#if texto.disciplina}
      <dt>Disciplina</dt>
      <dd>{texto.disciplina}</dd>
    {/if}
    {#if area}
      <dt>Área</dt>
      <dd>{area.titulo}</dd>
    {/if}
    {#if texto.paraQueSeUsa}
      <dt>Para qué se usa</dt>
      <dd>{texto.paraQueSeUsa}</dd>
    {/if}
  </dl>

  {#if texto.linkDrive}
    <p>
      <a class="boton" href={texto.linkDrive} target="_blank" rel="noopener noreferrer" aria-label={`Abrir en Drive: ${cita(texto)}, ${texto.titulo}`}>Abrir en Drive</a>
    </p>
    <p class="suave">Requiere acceso a la carpeta del curso.</p>
  {:else}
    <p class="suave">Este texto todavía no tiene enlace.</p>
  {/if}
{:else}
  <h1>Texto no encontrado</h1>
  <p><a href="#/bibliografia">Volver a la bibliografía</a></p>
{/if}

<style>
  dl {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 6px 16px;
    margin: 16px 0;
  }
  dt {
    color: var(--texto-suave);
  }
  dd {
    margin: 0;
  }
</style>
