import { Link } from 'react-router-dom';

function NavBarAdmin() {
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
            <li className="nav-item">
              <Link className="nav-link" to="/HomePagePriv">Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownDatosEmpresa"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Datos Empresa
              </Link>
              <ul className="dropdown-menu bg__fondo" aria-labelledby="navbarDropdownDatosEmpresa">
                <li>
                  <Link className="dropdown-item" to="/datosEmpresa">Datos Generales</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/editRedes">Redes</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/datosUbicacion">Ubicación</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/editMisionyVision">Misión y Visión</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ControlIoTUsuario">Control IoT</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ViewsMensajes">Mensajes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tblFAQ">Preguntas y Respuestas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tblTyC">Términos y Condiciones</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tblPoliticas">Políticas</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBarAdmin;
