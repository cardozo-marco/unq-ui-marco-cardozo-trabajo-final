import { Link } from 'react-router-dom'
import './Reglas.css'

export default function Reglas() {
  return (
    <section className="reglas">
      <div className="reglas__card">
        <header className="reglas__header">
          <h1 className="reglas__title">Reglas del juego</h1>
          <p className="reglas__intro">
            El objetivo es encadenar la mayor cantidad de palabras válidas antes de que el reloj
            llegue a cero.
          </p>
        </header>

        <ol className="reglas__lista">
          <li className="reglas__item">
            <span className="reglas__numero">1</span>
            <div>
              <h2 className="reglas__item-title">Inicio de la cadena</h2>
              <p className="reglas__item-text">
                La primera palabra puede ser cualquier palabra válida en español. En cuanto la
                ingresás, comienza la partida y arranca el contador.
              </p>
            </div>
          </li>

          <li className="reglas__item">
            <span className="reglas__numero">2</span>
            <div>
              <h2 className="reglas__item-title">Encadenamiento</h2>
              <p className="reglas__item-text">
                Cada nueva palabra debe empezar con la última letra de la palabra válida anterior.
                Las tildes no impiden encadenar (por ejemplo, <strong>casa → árbol → luna</strong>).
              </p>
            </div>
          </li>

          <li className="reglas__item">
            <span className="reglas__numero">3</span>
            <div>
              <h2 className="reglas__item-title">Diccionario y palabras repetidas</h2>
              <p className="reglas__item-text">
                Todas las palabras deben existir en el diccionario español y no pueden repetirse
                dentro de la misma partida.
              </p>
            </div>
          </li>

          <li className="reglas__item">
            <span className="reglas__numero">4</span>
            <div>
              <h2 className="reglas__item-title">Tiempo por turno</h2>
              <p className="reglas__item-text">
                Tenés <strong>15 segundos</strong> por turno. Cada palabra válida reinicia el
                contador a 15s. Las palabras inválidas no se agregan ni reinician el reloj. Si el
                tiempo llega a 0, la partida termina.
              </p>
            </div>
          </li>

          <li className="reglas__item">
            <span className="reglas__numero">5</span>
            <div>
              <h2 className="reglas__item-title">Puntaje</h2>
              <p className="reglas__item-text">
                Cada letra de una palabra válida suma <strong>1 punto</strong>. Por ejemplo: casa
                (4) + árbol (5) + luna (4) = <strong>13 puntos</strong>.
              </p>
            </div>
          </li>
        </ol>

        <div className="reglas__footer">
          <Link to="/jugar" className="reglas__btn reglas__btn--primario">
            Empezar a jugar
          </Link>
          <Link to="/" className="reglas__btn">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
