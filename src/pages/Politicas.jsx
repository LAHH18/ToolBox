import React, { useEffect } from "react";
import { useEmpresaFaq } from "../context/dtsEmpContext";

const Politicas = () => {
  const { politicas, getPoliticas } = useEmpresaFaq();

  useEffect(() => {
    getPoliticas();
  }, []);

  return (
    <div className="container my-5">
      <section className="p-5 bg-white rounded-4 shadow-lg">
        <h2 className="bd__text fw-bold mb-4 text-center display-4">
          🔒 Política de Privacidad
        </h2>
        {politicas.length > 0 ? (
          politicas.map((politica, index) => (
            <div key={politica._id} className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <span className="badge bd__text me-3 fs-6">Sección {index + 1}</span>
                <p className="text-secondary small mb-0">
                  📅 Última actualización:{" "}
                  {new Date(politica.fechaCreacion).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p className="lead text-dark">{politica.contenido}</p>
              {index < politicas.length - 1 && <hr className="my-4" />}
            </div>
          ))
        ) : (
          <p className="text-secondary text-center">No hay políticas registradas.</p>
        )}
        <p className="text-secondary text-center mt-4">
          Para más detalles, consulta nuestra política completa o contáctanos si tienes dudas.
        </p>
      </section>
    </div>
  );
};

export default Politicas;