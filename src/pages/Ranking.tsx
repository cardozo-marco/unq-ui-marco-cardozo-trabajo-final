import { Link } from 'react-router-dom'
import type { RegistroPuntaje } from '../types'
import { formatearFechaPartida } from '../utils/formatters'
import './Ranking.css'

export interface RankingProps {
  registros: RegistroPuntaje[]
  onVaciarRanking: () => void
}

export default function Ranking({ registros, onVaciarRanking }: RankingProps) {
  return (
    <section className="ranking">
      <div className="ranking__card">
        <header className="ranking__header">
          <div>
            <h1 className="ranking__titulo">Ranking local</h1>
            <p className="ranking__subtitulo">
              Top 10 de los mejores puntajes guardados en este navegador.
            </p>
          </div>

          {registros.length > 0 && (
            <button
              type="button"
              className="ranking__btn-limpiar"
              onClick={onVaciarRanking}
            >
              Borrar historial
            </button>
          )}
        </header>

        {registros.length === 0 ? (
          <div className="ranking__vacio">
            <p className="ranking__vacio-titulo">Todavía no hay puntajes registrados</p>
            <p className="ranking__vacio-texto">
              Jugá una partida para empezar a completar el Top 10 local.
            </p>
            <Link to="/jugar" className="ranking__btn-jugar">
              Jugar primera partida
            </Link>
          </div>
        ) : (
          <ol className="ranking__lista">
            {registros.map((registro, indice) => {
              const posicion = indice + 1
              const clasePosicion =
                posicion <= 3
                  ? `ranking__posicion ranking__posicion--top${posicion}`
                  : 'ranking__posicion'

              return (
                <li key={registro.id} className="ranking__item">
                  <span className={clasePosicion}>#{posicion}</span>

                  <div className="ranking__detalle">
                    <span className="ranking__palabras">
                      {registro.cantidadPalabras}{' '}
                      {registro.cantidadPalabras === 1
                        ? 'palabra encadenada'
                        : 'palabras encadenadas'}
                    </span>
                    <span className="ranking__fecha">
                      {formatearFechaPartida(registro.fecha)}
                    </span>
                  </div>

                  <strong className="ranking__puntaje">{registro.puntaje} pts</strong>
                </li>
              )
            })}
          </ol>
        )}

        <footer className="ranking__footer">
          <Link to="/jugar" className="ranking__btn-jugar">
            Nueva partida
          </Link>
          <Link to="/" className="ranking__btn-volver">
            Volver al inicio
          </Link>
        </footer>
      </div>
    </section>
  )
}
