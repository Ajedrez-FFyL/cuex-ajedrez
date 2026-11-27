# Esquema de `datos/curso.json`

El sitio lee todo de este archivo; no hay módulos, clases ni textos escritos en el código. Lo genera `scripts/importar-datos.ts` a partir de `datos/fuentes/cronograma-2026.csv` y `datos/fuentes/textos-2026.csv`. No se edita a mano.

```
{
  curso:   { nombre, anio, docentes[] },
  modulos: [ { id, numero, titulo, lineaTransversal, clases: [ Clase ] } ],
  areas:   [ { id, titulo, textos[] } ],
  textos:  [ Texto ]
}
```

## curso
- `nombre` (string): nombre del curso. Constante en el script.
- `anio` (number): año de la primera clase.
- `docentes` (string[]): nombres de pila, en orden de aparición en el cronograma.

## modulos[]
- `id` (string): `m1`, `m2`... según el orden del cronograma. Es lo que va en la ruta `#/modulo/<id>`.
- `numero` (number).
- `titulo` (string): tema del módulo.
- `lineaTransversal` (string | null): lo que sigue al último ` + ` de la columna Módulo del cronograma (por ejemplo, "Enseñanza del juego del ajedrez" o "Realización del trabajo final integrador").
- `clases` (Clase[]).

## Clase
- `numero` (number): número dentro del módulo.
- `fecha` (string): ISO `aaaa-mm-dd`.
- `temario` (string).
- `docentes` (string[]): docentes principales.
- `notaDocentes` (string | null): aclaración entre paréntesis del cronograma (por ejemplo, "con ayuda de Jorge").
- `textos` (string[]): ids de textos asignados a esa clase. **Vacío**: todavía no se sabe a qué clase va cada texto.
- `entrega` (string | null): consigna de entrega. **null**: el cronograma no la trae.

## areas[]
Carpetas de textos de Drive, numeradas 1 a 7. No coinciden uno a uno con los 6 módulos del cronograma.
- `id` (string): `a1`... `a7` (número de carpeta).
- `titulo` (string).
- `textos` (string[]): ids de textos, en el orden del CSV.

## textos[]
- `id` (string): `<id de área>-<título en minúsculas y con guiones>`. Si se repite, termina en `-2`, etc. (el mismo texto puede estar en dos carpetas y entonces tiene dos entradas).
- `areaId` (string).
- `autor` (string | null), `anio` (number | null): null si la hoja de curaduría no los tiene.
- `titulo` (string).
- `disciplina` (string | null): "Ajedrez", "Otra disciplina" o "A revisar" (los que todavía no se clasificaron).
- `linkDrive` (string | null): enlace al PDF en Drive. Abre solo para quien tiene acceso a la carpeta. Los PDF no se suben al repositorio.
- `paraQueSeUsa` (string | null): **null**; todavía no hay dato.

## CSV de entrada
- `cronograma-2026.csv`: `modulo, clase, temario, horas, fecha, docentes` (fecha `d/m/aaaa`; docentes separados por ` + `).
- `textos-2026.csv`: `carpeta, area, autor, anio, titulo, disciplina, link_drive`.
