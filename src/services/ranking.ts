import type { RegistroPuntaje } from '../types'

const STORAGE_KEY = 'palabras_encadenadas_ranking'
export const LIMITE_RANKING = 10

function esRegistroValido(item: unknown): item is RegistroPuntaje {
  if (typeof item !== 'object' || item === null) return false
  const candidato = item as Partial<RegistroPuntaje>
  return (
    typeof candidato.id === 'string' &&
    typeof candidato.puntaje === 'number' &&
    typeof candidato.cantidadPalabras === 'number' &&
    typeof candidato.fecha === 'string'
  )
}

function ordenarRanking(registros: RegistroPuntaje[]): RegistroPuntaje[] {
  return [...registros]
    .sort((a, b) => b.puntaje - a.puntaje || b.cantidadPalabras - a.cantidadPalabras)
    .slice(0, LIMITE_RANKING)
}

export function obtenerRanking(): RegistroPuntaje[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return ordenarRanking(parsed.filter(esRegistroValido))
  } catch {
    return []
  }
}

export function guardarPuntaje(puntaje: number, cantidadPalabras: number): RegistroPuntaje[] {
  const nuevoRegistro: RegistroPuntaje = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    puntaje,
    cantidadPalabras,
    fecha: new Date().toISOString(),
  }

  const actualizado = ordenarRanking([...obtenerRanking(), nuevoRegistro])

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizado))
  } catch {
    // Si localStorage no está disponible, devolvemos el ranking actualizado en memoria
  }

  return actualizado
}

export function vaciarRanking(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignorar errores de almacenamiento
  }
}
