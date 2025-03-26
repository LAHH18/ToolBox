import React, { useEffect } from "react";
import { useEmpresaFaq } from "../context/dtsEmpContext.jsx"; 

const Faq = () => {
  const { preguntas, getPreguntas } = useEmpresaFaq();

  useEffect(() => {
    getPreguntas(); // Cargar preguntas al montar el componente
  }, []);

  if (!preguntas) return <p className="text-center">Cargando preguntas...</p>;

  return (
    <div className="container mt-5 mb-5 p-5">
      <div className="nuevo-apartado">
        <h2 className="text-form1 text-center mb-4">Preguntas Frecuentes</h2>
        <div className="accordion" id="faqAccordion">
          {preguntas.length > 0 ? (
            preguntas.map((faq, index) => (
              <div className="accordion-item" key={faq._id}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="true"
                    aria-controls={`collapse${index}`}
                  >
                    {faq.pregunta}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">{faq.respuesta}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No hay preguntas disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
