import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";

function ViewFAQ() {
  const { preguntas, getPreguntas, deletePregunta } = useEmpresaFaq();
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [preguntasPerPage] = useState(8); // Preguntas por página

  useEffect(() => {
    getPreguntas();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la pregunta permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePregunta(id);
        Swal.fire("Eliminado", "La pregunta ha sido eliminada.", "success");
      }
    });
  };

  const handleView = (faq) => {
    Swal.fire({
      title: "Detalles de la Pregunta",
      html: `<p><strong>Pregunta:</strong> ${faq.pregunta}</p>
             <p><strong>Respuesta:</strong> ${faq.respuesta}</p>
             <p><strong>Estado:</strong> ${faq.estado ? "Activo" : "Inactivo"}</p>`,
      confirmButtonText: "Cerrar",
    });
  };

  // Lógica para obtener las preguntas de la página actual
  const indexOfLastFaq = currentPage * preguntasPerPage;
  const indexOfFirstFaq = indexOfLastFaq - preguntasPerPage;
  const currentFaqs = preguntas.slice(indexOfFirstFaq, indexOfLastFaq);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(preguntas.length / preguntasPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Gestión de Preguntas Frecuentes</h2>
      <div className="text-end mb-3">
        <Link to="/crtFAQ" className="btn bg__fond_form text-white fw-bold">
          Agregar Pregunta
        </Link>
      </div>
      <table
        className="table table-striped table-bordered mb-4"
        style={{
          width: "90%", // Ancho total de la tabla
          margin: "0 auto",
          fontSize: "0.9rem",
          tableLayout: "fixed", // Se respetan los anchos fijos en los <th>
        }}
      >
        <thead className="table-dark">
          <tr>
            <th>Pregunta</th>
            <th>Estado</th>
            <th className="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {currentFaqs.length > 0 ? (
            currentFaqs.map((faq) => (
              <tr key={faq._id}>
                <td>{faq.pregunta?.slice(0, 40) || "Sin pregunta"}</td>
                <td>{faq.estado ? "Activo" : "Inactivo"}</td>
                <td className="text-center">
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleView(faq)}
                  >
                    Ver
                  </button>
                  <Link
                    to={`/edtFAQ/${faq._id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(faq._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No hay preguntas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación visible solo si hay más de 8 preguntas */}
      {preguntas.length > preguntasPerPage && (
        <nav>
          <ul className="pagination justify-content-center">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button
                  onClick={() => paginate(number)}
                  className="page-link"
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default ViewFAQ;
