import { useCallback, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/common/Layout'
import Inicio from './pages/Inicio'
import Jugar from './pages/Jugar'
import Ranking from './pages/Ranking'
import Reglas from './pages/Reglas'
import { guardarPuntaje, obtenerRanking, vaciarRanking } from './services/ranking'
import type { RegistroPuntaje } from './types'

export default function App() {
  const [ranking, setRanking] = useState<RegistroPuntaje[]>(() => obtenerRanking())

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
        <Route element={<Layout />}>
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
