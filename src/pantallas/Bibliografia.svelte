<script lang="ts">
  import { cita, datos, textoPorId, type Texto } from '../lib/datos.ts'

  let busqueda = $state('')
  let disciplina = $state('')

  const disciplinas = [...new Set(datos.textos.map((t) => t.disciplina).filter((d): d is string => !!d))].sort()

  const sinTildes = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

  function coincide(t: Texto): boolean {
    if (disciplina && t.disciplina !== disciplina) return false
    const q = sinTildes(busqueda.trim())
    if (!q) return true
    return sinTildes(`${t.autor ?? ''} ${t.titulo} ${t.anio ?? ''}`).includes(q)
  }

  const grupos = $derived(
    datos.areas
      .map((a) => ({
        area: a,
        textos: a.textos.map(textoPorId).filter((t): t is Texto => !!t && coincide(t)),
      }))
      .filter((g) => g.textos.length > 0),
  )
  const total = $derived(grupos.reduce((n, g) => n + g.textos.length, 0))
</script>

<h1>Bibliografía por área</h1>
<p class="suave">
  Los textos están agrupados según la carpeta del curso donde se encuentran. Todavía no están asignados a una clase puntual.
</p>

<div class="filtros">
  <label>
    Buscar
    <input type="search" placeholder="Autor o título" bind:value={busqueda} />
  </label>
  <label>
    Disciplina
    <select bind:value={disciplina}>
      <option value="">Todas</option>
      {#each disciplinas as d}<option value={d}>{d}</option>{/each}
    </select>
  </label>
</div>
<p class="suave" aria-live="polite">{total} de {datos.textos.length} textos</p>

{#each grupos as g (g.area.id)}
  <section>
    <h2>{g.area.titulo}</h2>
    <ul class="textos">
      {#each g.textos as t (t.id)}
        <li>
          <a href={`#/texto/${t.id}`}>{t.titulo}</a>
          <span class="suave">{cita(t)}</span>
          {#if t.disciplina}<span class="etiqueta">{t.disciplina}</span>{/if}
        </li>
      {/each}
    </ul>
  </section>
{:else}
  <p>No hay textos que coincidan con la búsqueda.</p>
{/each}

<style>
  .filtros {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 12px 0;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.85rem;
    color: var(--texto-suave);
  }
  input[type='search'] {
    min-width: 260px;
  }
  section {
    margin-top: 20px;
  }
  .textos {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .textos li {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--borde);
  }
  .textos li > a {
    flex-basis: 100%;
    font-weight: 500;
  }
  @media (max-width: 480px) {
    input[type='search'] {
      min-width: 0;
      width: 100%;
    }
    label {
      flex: 1 1 100%;
    }
  }
</style>
