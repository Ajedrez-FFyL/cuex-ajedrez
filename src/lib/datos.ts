import crudo from '../../datos/curso.json'

export interface Clase {
  numero: number
  fecha: string
  temario: string
  docentes: string[]
  notaDocentes: string | null
  textos: string[]
  entrega: string | null
}
export interface Modulo {
  id: string
  numero: number
  titulo: string
  lineaTransversal: string | null
  clases: Clase[]
}
export interface Texto {
  id: string
  areaId: string
  autor: string | null
  anio: number | null
  titulo: string
  disciplina: string | null
  linkDrive: string | null
  paraQueSeUsa: string | null
}
export interface Area {
  id: string
  titulo: string
  textos: string[]
}
export interface Datos {
  curso: { nombre: string; anio: number; docentes: string[] }
  modulos: Modulo[]
  areas: Area[]
  textos: Texto[]
}

export const datos = crudo as Datos

export const textoPorId = (id: string) => datos.textos.find((t) => t.id === id)
export const areaPorId = (id: string) => datos.areas.find((a) => a.id === id)
export const moduloPorId = (id: string) => datos.modulos.find((m) => m.id === id)

/** "2026-06-22" -> "lunes 22 de junio de 2026" (sin pasar por zonas horarias). */
export function fechaLarga(iso: string): string {
  const [a, m, d] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(a, m - 1, d),
  )
}

export function fechaCorta(iso: string): string {
  const [a, m, d] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' }).format(new Date(a, m - 1, d))
}

/** Cita "Autor (año)" con lo que haya. */
export function cita(t: Texto): string {
  const partes = [t.autor, t.anio ? `(${t.anio})` : null].filter(Boolean)
  return partes.length ? partes.join(' ') : 'Autor sin consignar'
}
