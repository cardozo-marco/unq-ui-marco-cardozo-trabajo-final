import type { EstadoPartida } from '../../types'
import { formatearSegundos } from '../../utils/formatters'
import { SEGUNDOS_POR_TURNO } from '../../utils/validators'
import './PanelEstadisticas.css'

export interface PanelEstadisticasProps {
  puntaje: number
  cantidadPalabras: number
  letraRequerida: string
  tiempoRestante: number
  estado: EstadoPartida
}

export default function PanelEstadisticas({
  puntaje,
  cantidadPalabras,
  letraRequerida,
  tiempoRestante,
  estado,
}: PanelEstadisticasProps) {
  const porcentajeTiempo = Math.max(
    0,
    Math.min(100, (tiempoRestante / SEGUNDOS_POR_TURNO) * 100),
  )

  let claseTiempo = 'estadisticas__item--tiempo'
  if (estado === 'finalizada' || (estado === 'jugando' && tiempoRestante <= 5)) {
    claseTiempo += ' estadisticas__item--peligro'
  } else if (estado === 'jugando' && tiempoRestante <= 9) {
    claseTiempo += ' estadisticas__item--alerta'
  }

  return (
    <section className="estadisticas" aria-label="Estadísticas de la partida">
      <div className="estadisticas__item">
        <span className="estadisticas__label">Puntaje</span>
        <strong className="estadisticas__valor">{puntaje}</strong>
      </div>

      <div className="estadisticas__item">
        <span className="estadisticas__label">Palabras</span>
        <strong className="estadisticas__valor">{cantidadPalabras}</strong>
      </div>

      <div className="estadisticas__item estadisticas__item--destacado">
        <span className="estadisticas__label">Siguiente letra</span>
        <strong className="estadisticas__valor">
          {letraRequerida ? letraRequerida.toUpperCase() : 'Libre'}
        </strong>
      </div>

      <div className={`estadisticas__item ${claseTiempo}`}>
        <div className="estadisticas__tiempo-header">
          <span className="estadisticas__label">Tiempo</span>
          {estado === 'esperando' && (
            <span className="estadisticas__estado-tiempo">En espera</span>
          )}
        </div>
        <strong className="estadisticas__valor">{formatearSegundos(tiempoRestante)}</strong>
        <div className="estadisticas__barra" aria-hidden="true">
          <div
            className="estadisticas__barra-progreso"
            style={{ width: `${porcentajeTiempo}%` }}
          />
        </div>
      </div>
    </section>
  )
}
