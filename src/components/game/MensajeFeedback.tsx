import type { MensajeJuego } from '../../types'
import './MensajeFeedback.css'

export interface MensajeFeedbackProps {
  mensaje: MensajeJuego
}

export default function MensajeFeedback({ mensaje }: MensajeFeedbackProps) {
  return (
    <div
      className={`feedback feedback--${mensaje.tipo}`}
      role={mensaje.tipo === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      <span className="feedback__indicador" aria-hidden="true" />
      <p className="feedback__texto">{mensaje.texto}</p>
    </div>
  )
}
