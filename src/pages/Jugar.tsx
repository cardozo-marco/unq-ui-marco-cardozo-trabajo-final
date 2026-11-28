import { useEffect, useRef, useState } from 'react'
import CadenaPalabras from '../components/game/CadenaPalabras'
import FormularioPalabra from '../components/game/FormularioPalabra'
import MensajeFeedback from '../components/game/MensajeFeedback'
import PanelEstadisticas from '../components/game/PanelEstadisticas'
import ResumenFinal from '../components/game/ResumenFinal'
import { ApiError, validarPalabraEnDiccionario } from '../services/api'
import type { EstadoPartida, MensajeJuego } from '../types'
import { calcularPuntajeCadena } from '../utils/formatters'
import {
  obtenerLetraInicialRequerida,
  SEGUNDOS_POR_TURNO,
  validarPalabraLocal,
} from '../utils/validators'
import './Jugar.css'

export interface JugarProps {
  onPartidaFinalizada: (puntaje: number, cantidadPalabras: number) => void
}

const MENSAJE_INICIAL: MensajeJuego = {
  tipo: 'info',
  texto: 'Escribí la primera palabra válida para iniciar la partida y el temporizador de 15s.',
}

export default function Jugar({ onPartidaFinalizada }: JugarProps) {
  const [palabras, setPalabras] = useState<string[]>([])
  const [estado, setEstado] = useState<EstadoPartida>('esperando')
  const [tiempoRestante, setTiempoRestante] = useState<number>(SEGUNDOS_POR_TURNO)
  const [validando, setValidando] = useState(false)
  const [mensaje, setMensaje] = useState<MensajeJuego>(MENSAJE_INICIAL)
  const [claveFormulario, setClaveFormulario] = useState(0)

  const partidaFinalizadaRef = useRef(false)
  const puntajeGuardadoRef = useRef(false)
  const partidaIdRef = useRef(0)

  const puntaje = calcularPuntajeCadena(palabras)
  const letraRequerida = obtenerLetraInicialRequerida(palabras)
  const ultimaPalabra = palabras[palabras.length - 1] ?? ''

  // Invalida cualquier consulta en curso si el usuario abandona la vista
  useEffect(() => {
    return () => {
      partidaIdRef.current += 1
    }
  }, [])

  // El temporizador arranca con la primera palabra válida y se reinicia en cada acierto
  useEffect(() => {
    if (estado !== 'jugando') return

    const intervalo = window.setInterval(() => {
      setTiempoRestante((actual) => Math.max(0, actual - 1))
    }, 1000)

    return () => window.clearInterval(intervalo)
  }, [estado, palabras.length])

  useEffect(() => {
    if (estado === 'jugando' && tiempoRestante === 0) {
      partidaFinalizadaRef.current = true
      setEstado('finalizada')
      setMensaje({
        tipo: 'error',
        texto: 'Se terminó el tiempo. La partida ha finalizado.',
      })

      if (palabras.length > 0 && !puntajeGuardadoRef.current) {
        puntajeGuardadoRef.current = true
        onPartidaFinalizada(puntaje, palabras.length)
      }
    }
  }, [estado, tiempoRestante, palabras.length, puntaje, onPartidaFinalizada])

  const handleEnviarPalabra = async (entrada: string): Promise<boolean> => {
    if (validando || estado === 'finalizada' || partidaFinalizadaRef.current) {
      return false
    }

    const validacionLocal = validarPalabraLocal(entrada, palabras)
    if (!validacionLocal.valida) {
      setMensaje({ tipo: 'error', texto: validacionLocal.motivo })
      return false
    }

    const { palabra } = validacionLocal
    const idPartidaActual = partidaIdRef.current

    try {
      setValidando(true)
      const existe = await validarPalabraEnDiccionario(palabra)

      // Si el reloj llegó a cero o se reinició mientras respondía la API, ignoramos el resultado
      if (partidaFinalizadaRef.current || partidaIdRef.current !== idPartidaActual) {
        return false
      }

      if (!existe) {
        setMensaje({
          tipo: 'error',
          texto: `La palabra "${palabra}" no existe en el diccionario español.`,
        })
        return false
      }

      setPalabras((previas) => [...previas, palabra])
      setTiempoRestante(SEGUNDOS_POR_TURNO)
      setEstado('jugando')
      setMensaje({
        tipo: 'exito',
        texto: `"${palabra}" aceptada (+${palabra.length} puntos). Tenés ${SEGUNDOS_POR_TURNO}s para la siguiente.`,
      })
      return true
    } catch (error: unknown) {
      if (partidaFinalizadaRef.current || partidaIdRef.current !== idPartidaActual) {
        return false
      }

      const texto =
        error instanceof ApiError
          ? error.message
          : 'No se pudo validar la palabra. Intentá nuevamente.'
      setMensaje({ tipo: 'error', texto })
      return false
    } finally {
      if (partidaIdRef.current === idPartidaActual) {
        setValidando(false)
      }
    }
  }

  const handleReiniciar = () => {
    partidaIdRef.current += 1
    partidaFinalizadaRef.current = false
    puntajeGuardadoRef.current = false
    setPalabras([])
    setEstado('esperando')
    setTiempoRestante(SEGUNDOS_POR_TURNO)
    setValidando(false)
    setMensaje(MENSAJE_INICIAL)
    setClaveFormulario((prev) => prev + 1)
  }

  return (
    <section className="jugar">
      <header className="jugar__header">
        <div>
          <h1 className="jugar__titulo">
            {estado === 'finalizada' ? 'Partida finalizada' : 'Partida en curso'}
          </h1>
          <p className="jugar__subtitulo">
            {ultimaPalabra
              ? `Última palabra válida: "${ultimaPalabra}"`
              : 'Encadená palabras válidas en español para sumar puntos.'}
          </p>
        </div>

        {estado === 'jugando' && (
          <button
            type="button"
            className="jugar__btn-reiniciar"
            onClick={handleReiniciar}
          >
            Reiniciar partida
          </button>
        )}
      </header>

      <PanelEstadisticas
        puntaje={puntaje}
        cantidadPalabras={palabras.length}
        letraRequerida={letraRequerida}
        tiempoRestante={tiempoRestante}
        estado={estado}
      />

      {estado === 'finalizada' ? (
        <ResumenFinal
          puntajeFinal={puntaje}
          cantidadPalabras={palabras.length}
          onReiniciar={handleReiniciar}
        />
      ) : (
        <>
          <FormularioPalabra
            key={claveFormulario}
            letraRequerida={letraRequerida}
            validando={validando}
            onEnviarPalabra={handleEnviarPalabra}
          />

          <MensajeFeedback mensaje={mensaje} />
        </>
      )}

      <CadenaPalabras palabras={palabras} />
    </section>
  )
}
