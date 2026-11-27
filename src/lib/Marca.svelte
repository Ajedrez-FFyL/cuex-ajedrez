<script lang="ts">
  type Tema = 'sistema' | 'claro' | 'oscuro'
  const ETIQUETA: Record<Tema, string> = { sistema: 'Automático', claro: 'Claro', oscuro: 'Oscuro' }
  const SIGUIENTE: Record<Tema, Tema> = { sistema: 'claro', claro: 'oscuro', oscuro: 'sistema' }

  function leerTema(): Tema {
    const g = localStorage.getItem('ffyl-tema')
    return g === 'claro' || g === 'oscuro' ? g : 'sistema'
  }

  let tema = $state<Tema>(leerTema())

  function alternar() {
    tema = SIGUIENTE[tema]
    if (tema === 'sistema') {
      localStorage.removeItem('ffyl-tema')
      document.documentElement.removeAttribute('data-tema')
    } else {
      localStorage.setItem('ffyl-tema', tema)
      document.documentElement.setAttribute('data-tema', tema)
    }
  }
</script>

<header class="marca">
  <a class="nombre" href="#/">CUEX de ajedrez <span class="suave">· Ajedrez FFyL</span></a>
  <div class="derecha">
    <button type="button" class="tema" onclick={alternar} aria-label={`Tema: ${ETIQUETA[tema]}. Tocar para cambiar.`}>
      Tema: {ETIQUETA[tema]}
    </button>
    <div class="facultad" title="Facultad de Filosofía y Letras, UBA">
      <span class="sello"><img src={`${import.meta.env.BASE_URL}marca/sello-uba.png`} alt="Universidad de Buenos Aires" /></span>
      <span class="texto-facultad">
        <span class="sigla">FFyL</span>
        <span class="subtitulo">Filosofía y Letras · UBA</span>
      </span>
    </div>
  </div>
</header>

<style>
  .marca {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--borde);
    background: var(--superficie);
  }
  .nombre {
    font-family: 'Bitter', Georgia, serif;
    font-weight: 700;
    color: var(--texto);
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .suave {
    font-weight: 500;
  }
  .derecha {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }
  .tema {
    background: none;
    border: 1px solid var(--borde);
    border-radius: 999px;
    padding: 6px 12px;
    color: var(--texto-suave);
    font-size: 0.8rem;
  }
  .tema:hover {
    border-color: var(--acento);
    color: var(--acento);
  }
  .facultad {
    display: flex;
    align-items: center;
    gap: 8px;
    border-left: 1px solid var(--borde);
    padding-left: 16px;
  }
  .sello {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    width: 34px;
    border-radius: 50%;
    background: #f4efe4; /* crema fija: el sello es tinta marino y necesita fondo claro en los dos temas */
  }
  .sello img {
    height: 26px;
    width: auto;
  }
  .texto-facultad {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
  }
  .sigla {
    font-family: 'Bitter', Georgia, serif;
    font-weight: 600;
    font-size: 0.85rem;
  }
  .subtitulo {
    font-size: 0.7rem;
    color: var(--texto-suave);
    white-space: nowrap;
  }
  @media (max-width: 640px) {
    .subtitulo,
    .suave {
      display: none;
    }
    .derecha,
    .facultad {
      gap: 8px;
    }
    .facultad {
      padding-left: 8px;
    }
  }
</style>
