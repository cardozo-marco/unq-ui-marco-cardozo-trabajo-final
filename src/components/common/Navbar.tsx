import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__badge" aria-hidden="true">
            A→Z
          </span>
          <span className="navbar__title">Palabras Encadenadas</span>
        </Link>

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
            to="/reglas"
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            Reglas
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
