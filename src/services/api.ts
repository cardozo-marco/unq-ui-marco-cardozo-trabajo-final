import axios from 'axios'
import type { ValidarPalabraResponse } from '../types'

// Capa de servicios: cliente HTTP centralizado con Axios
const BASE_URL = import.meta.env.VITE_API_URL || 'https://word-api-hmlg.vercel.app'

interface ApiErrorBody {
  error?: string
}

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
})

/**
 * Consulta la API de la cátedra para validar si una palabra existe en el diccionario español.
 */
export async function validarPalabraEnDiccionario(palabra: string): Promise<boolean> {
  try {
    const response = await api.get<ValidarPalabraResponse>('/api/validate', {
      params: { word: palabra },
    })
    return Boolean(response.data.exists)
  } catch (error: unknown) {
    if (axios.isAxiosError<ApiErrorBody>(error)) {
      const status = error.response?.status
      const mensajeApi = error.response?.data?.error
      const mensaje =
        mensajeApi ||
        (status
          ? `No se pudo validar la palabra (error ${status}).`
          : 'No se pudo conectar con el servidor de validación.')
      throw new ApiError(mensaje, status)
    }

    throw new ApiError('Ocurrió un error inesperado al consultar el diccionario.')
  }
}
