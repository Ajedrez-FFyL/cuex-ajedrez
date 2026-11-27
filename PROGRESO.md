# Progreso

## Fase B1 — Sitio del CUEX (2026-11-27)

Hecho:
- Sitio Svelte 5 + Vite + TypeScript con rutas por hash: Inicio, Módulo (`#/modulo/<id>`), Bibliografía (`#/bibliografia`, con buscador y filtro por disciplina) y ficha de texto (`#/texto/<id>`).
- Datos 2026 cargados: 6 módulos, 24 clases, 7 áreas, 83 textos. Se generan con `scripts/importar-datos.ts` desde `datos/fuentes/cronograma-2026.csv` y `textos-2026.csv`.
- Identidad del Entrenador, modo claro/oscuro, fuentes autohospedadas.
- Workflow de GitHub Pages.

Pendiente / decisiones de Mati:
- Habilitar Pages (Settings → Pages → Source: GitHub Actions), si no quedó hecho.
- Licencia: el repo no tiene.
- Asignar textos a clases (`clases[].textos`), completar `paraQueSeUsa` y `entrega`: hoy vacíos.
- Módulos del curso comprimido del año que viene: cambiar los CSV.
- 2 textos con disciplina "A revisar" y varios sin autor o año (se muestran como "sin consignar").
- El texto "El espacio ajedrecístico" está en dos carpetas (5 y 6) con enlaces distintos; figura dos veces.
