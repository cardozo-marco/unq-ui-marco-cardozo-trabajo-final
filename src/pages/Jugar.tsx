import { useState } from 'react'
import CadenaPalabras from '../components/game/CadenaPalabras'
import FormularioPalabra from '../components/game/FormularioPalabra'
import MensajeFeedback from '../components/game/MensajeFeedback'
import PanelEstadisticas from '../components/game/PanelEstadisticas'
import { ApiError, validarPalabraEnDiccionario } from '../services/api'
import type { MensajeJuego } from '../types'
import { calcularPuntajeCadena } from '../utils/formatters'
import { obtenerLetraInicialRequerida, validarPalabraLocal } from '../utils/validators'
import './Jugar.css'

const MENSAJE_INICIAL: MensajeJuego = {
  tipo: 'info',
  texto: 'Escribí la primera palabra válida para comenzar la cadena.',
}

export default function Jugar() {
  const [palabras, setPalabras] = useState<string[]>([])
  const [validando, setValidando] = useState(false)
  const [mensaje, setMensaje] = useState<MensajeJuego>(MENSAJE_INICIAL)

  const puntaje = calcularPuntajeCadena(palabras)
  const letraRequerida = obtenerLetraInicialRequerida(palabras)
  const ultimaPalabra = palabras[palabras.length - 1] ?? ''

  const handleEnviarPalabra = async (entrada: string): Promise<boolean> => {
    if (validando) return false

    const validacionLocal = validarPalabraLocal(entrada, palabras)
    if (!validacionLocal.valida) {
      setMensaje({ tipo: 'error', texto: validacionLocal.motivo })
      return false
    }

    const { palabra } = validacionLocal

    try {
      setValidando(true)
      const existe = await validarPalabraEnDiccionario(palabra)

      if (!existe) {
        setMensaje({
          tipo: 'error',
          texto: `La palabra "${palabra}" no existe en el diccionario español.`,
        })
        return false
      }

      setPalabras((previas) => [...previas, palabra])
      setMensaje({
        tipo: 'exito',
        texto: `"${palabra}" aceptada (+${palabra.length} puntos).`,
      })
      return true
    } catch (error: unknown) {
      const texto =
        error instanceof ApiError
          ? error.message
          : 'No se pudo validar la palabra. Intentá nuevamente.'
      setMensaje({ tipo: 'error', texto })
      return false
    } finally {
      setValidando(false)
    }
  }

  return (
    <section className="jugar">
      <header className="jugar__header">
        <div>
          <h1 className="jugar__titulo">Partida en curso</h1>
          <p className="jugar__subtitulo">
            {ultimaPalabra
              ? `Última palabra válida: "${ultimaPalabra}"`
              : 'Encadená palabras válidas en español para sumar puntos.'}
          </p>
        </div>
      </header>

      <PanelEstadisticas
        puntaje={puntaje}
        cantidadPalabras={palabras.length}
        letraRequerida={letraRequerida}
      />

      <FormularioPalabra
        letraRequerida={letraRequerida}
        validando={validando}
        onEnviarPalabra={handleEnviarPalabra}
      />

      <MensajeFeedback mensaje={mensaje} />

      <CadenaPalabras palabras={palabras} />
    </section>
  )
}
