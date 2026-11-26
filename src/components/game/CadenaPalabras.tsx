import { Fragment } from 'react'
import './CadenaPalabras.css'

export interface CadenaPalabrasProps {
  palabras: string[]
}

export default function CadenaPalabras({ palabras }: CadenaPalabrasProps) {
  return (
    <section className="cadena" aria-label="Cadena de palabras válidas">
      <div className="cadena__header">
        <h2 className="cadena__titulo">Cadena actual</h2>
        <span className="cadena__contador">
          {palabras.length} {palabras.length === 1 ? 'palabra' : 'palabras'}
        </span>
      </div>

      {palabras.length === 0 ? (
        <p className="cadena__vacia">
          Todavía no ingresaste palabras. Escribí la primera para arrancar la cadena.
        </p>
      ) : (
        <ol className="cadena__lista">
          {palabras.map((palabra, indice) => {
            const esUltima = indice === palabras.length - 1
            return (
              <Fragment key={`${palabra}-${indice}`}>
                <li className={esUltima ? 'cadena__item cadena__item--actual' : 'cadena__item'}>
                  <span className="cadena__palabra">{palabra}</span>
                  <span className="cadena__puntos">+{palabra.length}</span>
                </li>
                {!esUltima && (
                  <li className="cadena__separador" aria-hidden="true">
                    →
                  </li>
                )}
              </Fragment>
            )
          })}
        </ol>
      )}
    </section>
  )
}
