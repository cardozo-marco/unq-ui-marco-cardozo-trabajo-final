import { limpiarPalabra } from './validators'

const DATE_FORMATTER = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

/**
 * Calcula el puntaje total de la cadena (1 punto por cada letra de cada palabra válida).
 */
export function calcularPuntajeCadena(palabras: string[]): number {
  return palabras.reduce((acumulado, palabra) => acumulado + limpiarPalabra(palabra).length, 0)
}

/**
 * Formatea una fecha ISO a formato legible es-AR.
 */
export function formatearFechaPartida(fechaIso: string): string {
  const fecha = new Date(fechaIso)
  if (Number.isNaN(fecha.getTime())) return '-'
  return DATE_FORMATTER.format(fecha)
}

/**
 * Formatea segundos restantes con sufijo (ej: "15s").
 */
export function formatearSegundos(segundos: number): string {
  return `${Math.max(0, segundos)}s`
}
