import { Link } from 'react-router-dom';

function NavBarOpt() {
  return (
<nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMainMenu"
            aria-controls="navbarMainMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMainMenu">
            <ul className="navbar-nav d-flex w-100 justify-content-between">
              {/* Inicio */}
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>

              {/* Catálogo con opciones */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categorias
                </Link>
                <ul className="dropdown-menu bg__fondo">
                  <li><Link className="dropdown-item" to="/categoria/Construccion">Construcción</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/Herramientas">Herramientas</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/Electricos">Material Eléctrico</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/Jardineria">Jardinería</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/Pinturas">Pintura</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/Plomeria">Plomería</Link></li>
                </ul>
              </li>

              {/* Ayuda con opciones */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown3"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ayuda
                </Link>
                <ul className="dropdown-menu bg__fondo" aria-labelledby="navbarDropdown3">
                  <li><Link className="dropdown-item" to="/Contacto">Contacto</Link></li>
                  <li><Link className="dropdown-item" to="/faq">Preguntas Frecuentes</Link></li>
                </ul>
              </li>

              {/* Acerca de Nosotros con opciones */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown4"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Acerca de Nosotros
                </Link>
                <ul className="dropdown-menu bg__fondo">
                  <li><Link className="dropdown-item" to="/myv">Mision y Vision</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default NavBarOpt
