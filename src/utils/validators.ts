import type { ResultadoValidacion } from '../types'

export const SEGUNDOS_POR_TURNO = 15

const SOLO_LETRAS_ES = /^[a-záéíóúüñ]+$/

const MAPA_TILDES: Record<string, string> = {
  á: 'a',
  é: 'e',
  í: 'i',
  ó: 'o',
  ú: 'u',
  ü: 'u',
}

/**
 * Recorta espacios laterales y convierte la palabra a minúsculas.
 */
export function limpiarPalabra(entrada: string): string {
  return entrada.trim().toLowerCase()
}

/**
 * Quita tildes y diéresis de vocales manteniendo la letra "ñ".
 * Permite encadenar correctamente casos como "casa" -> "árbol" -> "luna".
 */
export function quitarTildes(texto: string): string {
  return limpiarPalabra(texto).replace(/[áéíóúü]/g, (vocal) => MAPA_TILDES[vocal] ?? vocal)
}

/**
 * Devuelve la letra con la que debe empezar la siguiente palabra de la cadena.
 */
export function obtenerLetraInicialRequerida(historial: string[]): string {
  if (historial.length === 0) return ''
  const ultima = quitarTildes(historial[historial.length - 1])
  return ultima.charAt(ultima.length - 1)
}

/**
 * Valida las reglas locales del juego antes de consultar la API del diccionario:
 * - Que no esté vacía y tenga solo letras.
 * - Que no haya sido utilizada anteriormente en la partida.
 * - Que respete la regla de encadenamiento con la palabra previa.
 */
export function validarPalabraLocal(entrada: string, historial: string[]): ResultadoValidacion {
  const palabra = limpiarPalabra(entrada)

  if (!palabra) {
    return { valida: false, motivo: 'Ingresá una palabra para continuar.' }
  }

  if (!SOLO_LETRAS_ES.test(palabra)) {
    return {
      valida: false,
      motivo: 'Ingresá una sola palabra usando únicamente letras.',
    }
  }

  const palabraComparable = quitarTildes(palabra)
  const yaUsada = historial.some((previa) => quitarTildes(previa) === palabraComparable)

  if (yaUsada) {
    return {
      valida: false,
      motivo: `La palabra "${palabra}" ya fue utilizada en esta partida.`,
    }
  }

  const letraRequerida = obtenerLetraInicialRequerida(historial)
  if (letraRequerida && !palabraComparable.startsWith(letraRequerida)) {
    return {
      valida: false,
      motivo: `La palabra no respeta la regla de encadenamiento: debe comenzar con "${letraRequerida.toUpperCase()}".`,
    }
  }

  return { valida: true, palabra }
}
