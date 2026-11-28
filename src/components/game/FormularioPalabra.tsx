import { FormEvent, useEffect, useRef, useState } from 'react'
import './FormularioPalabra.css'

export interface FormularioPalabraProps {
  letraRequerida: string
  validando: boolean
  onEnviarPalabra: (palabra: string) => Promise<boolean>
}

export default function FormularioPalabra({
  letraRequerida,
  validando,
  onEnviarPalabra,
}: FormularioPalabraProps) {
  const [entrada, setEntrada] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!validando) {
      inputRef.current?.focus()
    }
  }, [validando])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validando) return

    const aceptada = await onEnviarPalabra(entrada)
    if (aceptada) {
      setEntrada('')
    } else {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }

  const textoAyuda = letraRequerida
    ? `La siguiente palabra debe empezar con "${letraRequerida.toUpperCase()}".`
    : 'Ingresá cualquier palabra válida en español para iniciar la cadena.'

  return (
    <form className="formulario-palabra" onSubmit={handleSubmit}>
      <div className="formulario-palabra__header">
        <label htmlFor="input-palabra" className="formulario-palabra__label">
          Tu palabra
        </label>
        <span className="formulario-palabra__ayuda">{textoAyuda}</span>
      </div>

      <div className="formulario-palabra__controles">
        <input
          ref={inputRef}
          id="input-palabra"
          type="text"
          className="formulario-palabra__input"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          placeholder={
            letraRequerida
              ? `Escribí una palabra con ${letraRequerida.toUpperCase()}...`
              : 'Ej: casa'
          }
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          disabled={validando}
        />

        <button
          type="submit"
          className="formulario-palabra__btn"
          disabled={validando || entrada.trim().length === 0}
        >
          {validando ? 'Validando...' : 'Enviar'}
        </button>
      </div>
    </form>
  )
}
