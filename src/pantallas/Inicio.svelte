<script lang="ts">
  import { datos, fechaCorta } from '../lib/datos.ts'

  const primera = datos.modulos[0]?.clases[0]
  const ultimaMod = datos.modulos[datos.modulos.length - 1]
  const ultima = ultimaMod?.clases[ultimaMod.clases.length - 1]
  const nClases = datos.modulos.reduce((n, m) => n + m.clases.length, 0)
</script>

<h1>{datos.curso.nombre} {datos.curso.anio}</h1>
<p>
  Curso de ajedrez de la Facultad de Filosofía y Letras (UBA). Este sitio reúne, módulo por módulo, el temario de las clases
  y los textos de lectura.
</p>
<p class="suave">
  {datos.modulos.length} módulos, {nClases} clases{#if primera && ultima}{', del '}{fechaCorta(primera.fecha)} al {fechaCorta(ultima.fecha)}{/if}.
  Docentes: {datos.curso.docentes.join(', ')}.
</p>

<h2>Módulos</h2>
<ul class="modulos">
  {#each datos.modulos as m (m.id)}
    <li class="tarjeta">
      <span class="suave num">Módulo {m.numero}</span>
      <h3><a href={`#/modulo/${m.id}`}>{m.titulo}</a></h3>
      {#if m.lineaTransversal}<p class="suave">Línea transversal: {m.lineaTransversal}</p>{/if}
      <p class="suave">{m.clases.length} clases{#if m.clases[0]}{' · desde el '}{fechaCorta(m.clases[0].fecha)}{/if}</p>
    </li>
  {/each}
</ul>

<h2>Bibliografía</h2>
<p>
  {datos.textos.length} textos agrupados por área. <a href="#/bibliografia">Ver la bibliografía</a>.
</p>

<style>
  .modulos {
    list-style: none;
    padding: 0;
    margin: 0 0 24px;
    display: grid;
    gap: 12px;
  }
  .modulos p {
    margin: 4px 0 0;
  }
  .num {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
</style>
