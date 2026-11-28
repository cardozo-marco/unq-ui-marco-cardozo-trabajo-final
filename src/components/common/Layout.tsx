import { Outlet } from 'react-router-dom'
import type { Tema } from '../../types'
import Navbar from './Navbar'
import './Layout.css'

export interface LayoutProps {
  tema: Tema
  onToggleTema: () => void
}

export default function Layout({ tema, onToggleTema }: LayoutProps) {
  return (
    <div className="layout">
      <Navbar tema={tema} onToggleTema={onToggleTema} />
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  )
}
