import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/common/Layout'
import Inicio from './pages/Inicio'
import Jugar from './pages/Jugar'
import Ranking from './pages/Ranking'
import Reglas from './pages/Reglas'
import { guardarPuntaje, obtenerRanking, vaciarRanking } from './services/ranking'
import type { RegistroPuntaje, Tema } from './types'

const TEMA_STORAGE_KEY = 'palabras_encadenadas_tema'

function obtenerTemaInicial(): Tema {
  try {
    const guardado = localStorage.getItem(TEMA_STORAGE_KEY)
    if (guardado === 'light' || guardado === 'dark') return guardado
  } catch {
    // Si localStorage no está disponible, se usa la preferencia del sistema
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [ranking, setRanking] = useState<RegistroPuntaje[]>(() => obtenerRanking())
  const [tema, setTema] = useState<Tema>(() => obtenerTemaInicial())

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    try {
      localStorage.setItem(TEMA_STORAGE_KEY, tema)
    } catch {
      // Ignorar error de almacenamiento
    }
  }, [tema])

  const handleToggleTema = useCallback(() => {
    setTema((actual) => (actual === 'dark' ? 'light' : 'dark'))
  }, [])

  const handlePartidaFinalizada = useCallback((puntaje: number, cantidadPalabras: number) => {
    const rankingActualizado = guardarPuntaje(puntaje, cantidadPalabras)
    setRanking(rankingActualizado)
  }, [])

  const handleVaciarRanking = useCallback(() => {
    vaciarRanking()
    setRanking([])
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout tema={tema} onToggleTema={handleToggleTema} />}>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/jugar"
            element={<Jugar onPartidaFinalizada={handlePartidaFinalizada} />}
          />
          <Route path="/reglas" element={<Reglas />} />
          <Route
            path="/ranking"
            element={
              <Ranking registros={ranking} onVaciarRanking={handleVaciarRanking} />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
