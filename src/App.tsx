import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/common/Layout'
import Inicio from './pages/Inicio'
import Jugar from './pages/Jugar'
import Reglas from './pages/Reglas'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/jugar" element={<Jugar />} />
          <Route path="/reglas" element={<Reglas />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
