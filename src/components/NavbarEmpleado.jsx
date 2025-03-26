import { Link } from 'react-router-dom';

function NavBarEmp() {
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
                <Link className="nav-link" to="/HomeEmpleados">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vwProducts">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vwVentas">Ventas</Link>
              </li>
{/* 
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Reportes
                </Link>
                <ul className="dropdown-menu bg__fondo">
                  <li><Link className="dropdown-item" to="/">Ventas</Link></li>
                  <li><Link className="dropdown-item" to="/">Usuarios</Link></li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default NavBarEmp
