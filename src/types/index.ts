// Tipos e interfaces de dominio para el juego Palabras Encadenadas

export type Tema = 'light' | 'dark'

export type EstadoPartida = 'esperando' | 'jugando' | 'finalizada'

export type TipoMensaje = 'info' | 'exito' | 'error'

export interface MensajeJuego {
  tipo: TipoMensaje
  texto: string
}

export type ResultadoValidacion =
  | { valida: true; palabra: string }
  | { valida: false; motivo: string }

export interface ValidarPalabraResponse {
  exists: boolean
}

export interface RegistroPuntaje {
  id: string
  puntaje: number
  cantidadPalabras: number
  fecha: string
}
