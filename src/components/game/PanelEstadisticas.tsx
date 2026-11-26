import './PanelEstadisticas.css'

export interface PanelEstadisticasProps {
  puntaje: number
  cantidadPalabras: number
  letraRequerida: string
}

export default function PanelEstadisticas({
  puntaje,
  cantidadPalabras,
  letraRequerida,
}: PanelEstadisticasProps) {
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
    </section>
  )
}
