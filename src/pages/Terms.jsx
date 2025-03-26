import React, { useEffect } from "react";
import { useEmpresaFaq } from "../context/dtsEmpContext";

const Terms = () => {
  const { tyc, getTyC } = useEmpresaFaq();

  useEffect(() => {
    getTyC();
  }, []);

  return (
    <div className="container my-5">
      <section className="p-5 bg-white rounded-4 shadow-lg">
        <h2 className="bd__text fw-bold mb-4 text-center display-4">
          📜 Términos y Condiciones
        </h2>
        {tyc.length > 0 ? (
          tyc.map((termino, index) => (
            <div key={termino._id} className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <span className="badge bd__text me-3 fs-6">Término {index + 1}</span>
                <p className="text-secondary small mb-0">
                  📅 Última actualización:{" "}
                  {new Date(termino.fechaCreacion).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p className="lead text-dark">{termino.contenido}</p>
              {index < tyc.length - 1 && <hr className="my-4" />}
            </div>
          ))
        ) : (
          <p className="text-secondary text-center">No hay términos y condiciones registrados.</p>
        )}
        <p className="text-secondary text-center mt-4">
          ¿Tienes dudas? Contáctanos a través de nuestro soporte técnico. ¡Estamos aquí para ayudarte!
        </p>
      </section>
    </div>
  );
};

export default Terms;