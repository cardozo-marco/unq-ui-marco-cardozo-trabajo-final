import { Link } from 'react-router-dom'
import './ResumenFinal.css'

export interface ResumenFinalProps {
  puntajeFinal: number
  cantidadPalabras: number
  onReiniciar: () => void
}

export default function ResumenFinal({
  puntajeFinal,
  cantidadPalabras,
  onReiniciar,
}: ResumenFinalProps) {
  return (
    <section className="resumen-final" aria-label="Resumen de partida finalizada">
      <div className="resumen-final__badge">Partida finalizada</div>
      <h2 className="resumen-final__titulo">¡Se terminó el tiempo!</h2>
      <p className="resumen-final__descripcion">
        {cantidadPalabras > 0
          ? 'Podés consultar los mejores 10 puntajes en el ranking local.'
          : 'No llegaste a encadenar palabras en esta partida.'}
      </p>

      <div className="resumen-final__metricas">
        <div className="resumen-final__metrica">
          <span className="resumen-final__label">Puntaje final</span>
          <strong className="resumen-final__valor">{puntajeFinal}</strong>
        </div>

        <div className="resumen-final__metrica">
          <span className="resumen-final__label">Palabras válidas</span>
          <strong className="resumen-final__valor">{cantidadPalabras}</strong>
        </div>
      </div>

      <div className="resumen-final__acciones">
        <button
          type="button"
          className="resumen-final__btn resumen-final__btn--primario"
          onClick={onReiniciar}
        >
          Jugar de nuevo
        </button>

        <Link to="/ranking" className="resumen-final__btn resumen-final__btn--secundario">
          Ver ranking
        </Link>

        <Link to="/" className="resumen-final__btn resumen-final__btn--secundario">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
