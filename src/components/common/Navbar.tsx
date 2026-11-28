import { Link, NavLink } from 'react-router-dom'
import type { Tema } from '../../types'
import './Navbar.css'

export interface NavbarProps {
  tema: Tema
  onToggleTema: () => void
}

export default function Navbar({ tema, onToggleTema }: NavbarProps) {
  const esOscuro = tema === 'dark'

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__badge" aria-hidden="true">
            A→Z
          </span>
          <span className="navbar__title">Palabras Encadenadas</span>
        </Link>

        <div className="navbar__acciones">
          <nav className="navbar__nav" aria-label="Navegación principal">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/jugar"
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Jugar
            </NavLink>
            <NavLink
              to="/ranking"
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Ranking
            </NavLink>
            <NavLink
              to="/reglas"
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Reglas
            </NavLink>
          </nav>

          <button
            type="button"
            className="navbar__tema-btn"
            onClick={onToggleTema}
            aria-label={esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={esOscuro ? 'Modo claro' : 'Modo oscuro'}
          >
            {esOscuro ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
