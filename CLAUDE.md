# CUEX de ajedrez

Sitio del curso CUEX de ajedrez (FFyL, UBA): temario por módulo y bibliografía. Separado del Entrenador de ajedrez; misma identidad visual (marino #1E2655 y verde azulado #257567 sobre crema #F4EFE4; en oscuro #6FD9C4 sobre fondo marino; Bitter para títulos, Archivo para el cuerpo).

## Reglas

- **Sin datos de alumnos**: ni nombres, ni mails, ni listas, ni entregas. Los docentes van por nombre de pila.
- **Sin PDF en el repo**: solo enlaces a Drive.
- **Nunca mergear ni pushear a `main`**: todo va por rama y Pull Request; Mati revisa y aprueba.
- Interfaz en **español rioplatense**. Sin gamificación ni adornos.
- Commits frecuentes y descriptivos, en español.
- Nada de módulos, clases o textos escritos en el código: todo sale de `datos/curso.json` (generado con `npm run importar-datos` desde `datos/fuentes/*.csv`). No inventar datos que no están (entrega, para qué se usa un texto, textos por clase): van null o vacíos.
- Nunca borrar archivos definitivamente: a la Papelera.
- Correr `npm run check` y `npm run build` antes de cada push: el despliegue los corre y, si fallan, el sitio no se publica.

## Mapa

- `datos/fuentes/` CSV de entrada; `datos/curso.json` generado; `docs/esquema.md` formato.
- `scripts/importar-datos.ts` CSV a JSON (corre con node).
- `src/lib/` datos, rutas por hash, franja de marca; `src/pantallas/` Inicio, Módulo, Bibliografía, Texto.
