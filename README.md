# CUEX de ajedrez

Sitio del curso CUEX de ajedrez de la Facultad de Filosofía y Letras (UBA): el temario de cada módulo y un repositorio de textos para los cursantes. Está separado del [Entrenador de ajedrez](https://github.com/Ajedrez-FFyL/entrenador-ajedrez).

Tiene las mismas decisiones técnicas que el Entrenador: Svelte 5 + Vite + TypeScript, sin backend, rutas por hash y publicación en GitHub Pages (`https://ajedrez-ffyl.github.io/cuex-ajedrez/`).

## Reglas

- El sitio **no lleva nombres, mails ni datos de cursantes**.
- **No se suben PDF**: solo enlaces a Drive, que abren únicamente para quien tiene acceso a la carpeta del curso.

## Cómo actualizar los datos

Todo el contenido sale de `datos/curso.json`, que se genera a partir de dos CSV:

1. Editá `datos/fuentes/cronograma-2026.csv` (módulos, clases, fechas, docentes) y `datos/fuentes/textos-2026.csv` (textos y enlaces a Drive). Para el año siguiente, se pueden reemplazar o pasar otros por argumento: `node scripts/importar-datos.ts cronograma.csv textos.csv`.
2. Corré `npm run importar-datos`. Regenera `datos/curso.json`.
3. Revisá el sitio con `npm run dev` y subí los cambios.

El formato de los datos está en [docs/esquema.md](docs/esquema.md).

## Desarrollo

```
npm install
npm run dev        # http://localhost:5173
npm run check      # tipos (svelte-check + tsc)
npm run build      # genera dist/
```

Con la variable `GITHUB_ACTIONS` definida, Vite usa la base `/cuex-ajedrez/` (la de Pages); sin ella, la raíz.

## Publicación

Cada push a `main` corre `.github/workflows/deploy.yml` (check, build y publicación en Pages). Pages debe estar en Settings → Pages → Source: GitHub Actions.
