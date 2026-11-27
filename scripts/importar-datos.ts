// Arma datos/curso.json a partir de dos CSV versionados en datos/fuentes/:
//   cronograma-2026.csv  (modulo, clase, temario, horas, fecha, docentes)
//   textos-2026.csv      (carpeta, area, autor, anio, titulo, disciplina, link_drive)
// Uso: node scripts/importar-datos.ts [cronograma.csv] [textos.csv] [salida.json]
// El año que viene se cambian los CSV (o se pasan otros por argumento) y se vuelve a correr.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const [, , argCrono, argTextos, argSalida] = process.argv
const rutaCrono = resolve(argCrono ?? `${raiz}/datos/fuentes/cronograma-2026.csv`)
const rutaTextos = resolve(argTextos ?? `${raiz}/datos/fuentes/textos-2026.csv`)
const rutaSalida = resolve(argSalida ?? `${raiz}/datos/curso.json`)

const NOMBRE_CURSO = 'Curso de ajedrez CUEX'

/** Lector de CSV con comillas (RFC 4180): devuelve filas como objetos según el encabezado. */
function leerCsv(ruta: string): Record<string, string>[] {
  const texto = readFileSync(ruta, 'utf8').replace(/^﻿/, '')
  const filas: string[][] = []
  let fila: string[] = []
  let campo = ''
  let entreComillas = false
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i]
    if (entreComillas) {
      if (c === '"' && texto[i + 1] === '"') {
        campo += '"'
        i++
      } else if (c === '"') entreComillas = false
      else campo += c
    } else if (c === '"') entreComillas = true
    else if (c === ',') {
      fila.push(campo)
      campo = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && texto[i + 1] === '\n') i++
      fila.push(campo)
      campo = ''
      if (fila.some((x) => x !== '')) filas.push(fila)
      fila = []
    } else campo += c
  }
  if (campo !== '' || fila.length) {
    fila.push(campo)
    filas.push(fila)
  }
  const [encabezado, ...resto] = filas
  return resto.map((f) => Object.fromEntries(encabezado.map((h, i) => [h.trim(), (f[i] ?? '').trim()])))
}

function slug(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** "22/6/2026" -> "2026-06-22" */
function fechaIso(s: string): string {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s)
  if (!m) throw new Error(`Fecha no válida: "${s}" (se espera d/m/aaaa)`)
  return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`
}

/** "Mati + Gian + Nico (con ayuda de Jorge)" -> principales [Mati, Gian, Nico], nota "con ayuda de Jorge". */
function leerDocentes(s: string): { docentes: string[]; nota: string | null } {
  const nota = /\(([^)]*)\)/.exec(s)?.[1].trim() || null
  const docentes = s
    .replace(/\([^)]*\)/g, '')
    .split('+')
    .map((x) => x.trim())
    .filter(Boolean)
  return { docentes, nota }
}

/** La columna Módulo trae "<tema> + <línea transversal>": se separa en el último " + ". */
function separarModulo(s: string): { titulo: string; lineaTransversal: string | null } {
  const limpio = s.replace(/^\[merged\]\s*/, '').trim()
  const i = limpio.lastIndexOf(' + ')
  if (i < 0) return { titulo: limpio, lineaTransversal: null }
  return { titulo: limpio.slice(0, i).trim(), lineaTransversal: limpio.slice(i + 3).trim() }
}

interface Clase {
  numero: number
  fecha: string
  temario: string
  docentes: string[]
  notaDocentes: string | null
  textos: string[]
  entrega: string | null
}
interface Modulo {
  id: string
  numero: number
  titulo: string
  lineaTransversal: string | null
  clases: Clase[]
}

// --- Cronograma ---
const filasCrono = leerCsv(rutaCrono)
const modulos: Modulo[] = []
const docentesCurso: string[] = []
let anterior = ''
for (const f of filasCrono) {
  if (f.modulo !== anterior) {
    const { titulo, lineaTransversal } = separarModulo(f.modulo)
    const numero = modulos.length + 1
    modulos.push({ id: `m${numero}`, numero, titulo, lineaTransversal, clases: [] })
    anterior = f.modulo
  }
  const { docentes, nota } = leerDocentes(f.docentes)
  for (const d of [...docentes, ...(nota ? (nota.match(/[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/) ?? []) : [])]) {
    if (!docentesCurso.includes(d)) docentesCurso.push(d)
  }
  modulos[modulos.length - 1].clases.push({
    numero: Number(f.clase),
    fecha: fechaIso(f.fecha),
    temario: f.temario.replace(/\s*\n\s*/g, ' ').trim(),
    docentes,
    notaDocentes: nota,
    textos: [],
    entrega: null,
  })
}

// --- Textos ---
const filasTextos = leerCsv(rutaTextos)
const areas: { id: string; titulo: string; textos: string[] }[] = []
const textos: Record<string, unknown>[] = []
const usados = new Set<string>()
for (const f of filasTextos) {
  const idArea = `a${f.carpeta}`
  let area = areas.find((a) => a.id === idArea)
  if (!area) {
    area = { id: idArea, titulo: f.area, textos: [] }
    areas.push(area)
  }
  const base = `${idArea}-${slug(f.titulo).slice(0, 60).replace(/-+$/, '')}`
  let id = base
  for (let n = 2; usados.has(id); n++) id = `${base}-${n}`
  usados.add(id)
  area.textos.push(id)
  textos.push({
    id,
    areaId: idArea,
    autor: f.autor || null,
    anio: f.anio ? Number(f.anio) : null,
    titulo: f.titulo,
    disciplina: f.disciplina || null,
    linkDrive: f.link_drive || null,
    paraQueSeUsa: null,
  })
}
areas.sort((a, b) => Number(a.id.slice(1)) - Number(b.id.slice(1)))

const anio = Number(modulos[0].clases[0].fecha.slice(0, 4))
const curso = {
  curso: { nombre: NOMBRE_CURSO, anio, docentes: docentesCurso },
  modulos,
  areas,
  textos,
}
writeFileSync(rutaSalida, JSON.stringify(curso, null, 2) + '\n', 'utf8')
const nClases = modulos.reduce((n, m) => n + m.clases.length, 0)
console.log(`curso.json: ${modulos.length} módulos, ${nClases} clases, ${areas.length} áreas, ${textos.length} textos`)
