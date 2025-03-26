import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useEmpresaFaq } from "../context/dtsEmpContext.jsx";
import "./Footer.css";

function Footer() {
  const { empresa, getEmpresa } = useEmpresaFaq();

  useEffect(() => {
    getEmpresa();
  }, []);

  return (
    <footer className="footer mt-4">
      <div className="container text-center">
        {empresa ? (
          <>
            <p>
              {empresa.ubicacion
                ? `${empresa.ubicacion.calle}, ${empresa.ubicacion.colonia}, ${empresa.ubicacion.ciudad}, ${empresa.ubicacion.estado}, C.P. ${empresa.ubicacion.codigoPostal}`
                : "Ubicación no disponible"}
            </p>

            <p>
              <Link to="/terycond">Términos y condiciones</Link> |{" "}
              <Link to="/politicas">Política de privacidad</Link>
            </p>

            <p className="mt-3">
              Síguenos en nuestras redes sociales:{" "}
              {empresa.redes?.facebook && (
                <a
                  href={empresa.redes.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 text-decoration-none"
                >
                  <i
                    className="bi bi-facebook"
                    style={{ fontSize: "1.5rem", color: "white" }}
                  ></i>
                </a>
              )}
              {empresa.redes?.twitter && (
                <a
                  href={empresa.redes.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 text-decoration-none"
                >
                  <i
                    className="bi bi-twitter"
                    style={{ fontSize: "1.5rem", color: "white" }}
                  ></i>
                </a>
              )}
              {empresa.redes?.instagram && (
                <a
                  href={empresa.redes.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 text-decoration-none"
                >
                  <i
                    className="bi bi-instagram"
                    style={{ fontSize: "1.5rem", color: "white" }}
                  ></i>
                </a>
              )}
            </p>
          </>
        ) : (
          <p className="text-muted">Cargando información...</p>
        )}
      </div>
    </footer>
  );
}

export default Footer;