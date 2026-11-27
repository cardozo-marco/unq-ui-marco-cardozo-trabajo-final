import { Link } from 'react-router-dom'
import './Inicio.css'

export default function Inicio() {
  return (
    <section className="inicio">
      <div className="inicio__hero">
        <p className="inicio__eyebrow">Desafío de vocabulario en español</p>
        <h1 className="inicio__title">Palabras Encadenadas</h1>
        <p className="inicio__subtitle">
          Armá la cadena más larga posible antes de que se termine el tiempo. Cada palabra debe
          comenzar con la última letra de la anterior.
        </p>

        <div className="inicio__ejemplo" aria-label="Ejemplo de cadena de palabras">
          <span className="inicio__chip">
            cas<strong>a</strong>
          </span>
          <span className="inicio__flecha" aria-hidden="true">
            →
          </span>
          <span className="inicio__chip">
            <strong>á</strong>rbo<strong>l</strong>
          </span>
          <span className="inicio__flecha" aria-hidden="true">
            →
          </span>
          <span className="inicio__chip">
            <strong>l</strong>una
          </span>
        </div>

        <div className="inicio__acciones">
          <Link to="/jugar" className="inicio__btn inicio__btn--primario">
            Jugar ahora
          </Link>
          <Link to="/ranking" className="inicio__btn inicio__btn--secundario">
            Ver ranking
          </Link>
          <Link to="/reglas" className="inicio__btn inicio__btn--secundario">
            Reglas
          </Link>
        </div>
      </div>

      <div className="inicio__resumen">
        <article className="inicio__card">
          <h2 className="inicio__card-title">15 segundos por turno</h2>
          <p className="inicio__card-text">
            El reloj empieza con tu primera palabra válida y se reinicia en cada acierto.
          </p>
        </article>

        <article className="inicio__card">
          <h2 className="inicio__card-title">1 punto por letra</h2>
          <p className="inicio__card-text">
            Cuanto más largas sean tus palabras, más rápido sumás puntos en la partida.
          </p>
        </article>

        <article className="inicio__card">
          <h2 className="inicio__card-title">Sin repetir</h2>
          <p className="inicio__card-text">
            Cada palabra se valida en el diccionario español y solo puede usarse una vez.
          </p>
        </article>
      </div>
    </section>
  )
}
