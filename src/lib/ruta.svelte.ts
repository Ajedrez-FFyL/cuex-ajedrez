/** Rutas por hash (#/modulo/m1, #/bibliografia, #/texto/<id>): funcionan en GitHub Pages sin reescrituras. */
function leer(): string[] {
  const h = window.location.hash.replace(/^#\/?/, '')
  return h.split('/').filter(Boolean).map(decodeURIComponent)
}

export const ruta = $state({ partes: leer() })

window.addEventListener('hashchange', () => {
  ruta.partes = leer()
  window.scrollTo(0, 0)
})
