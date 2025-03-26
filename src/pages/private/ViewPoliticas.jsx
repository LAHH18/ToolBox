import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";

function ViewPoliticas() {
  const { politicas, getPoliticas, deletePolitica } = useEmpresaFaq();
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [politicasPerPage] = useState(8); // Políticas por página

  useEffect(() => {
    getPoliticas();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deletePolitica(id);
      Swal.fire("Eliminado", "La política ha sido eliminada.", "success");
      getPoliticas();
    }
  };

  const handleView = (politica) => {
    Swal.fire({
      title: "Detalle de la Política",
      html: `<p><strong>Contenido:</strong></p>
             <p>${politica.contenido}</p>
             <p><strong>Fecha de Creación:</strong> ${new Date(politica.fechaCreacion).toLocaleDateString()}</p>`,
      icon: "info",
      confirmButtonText: "Cerrar",
      width: "600px",
    });
  };

  // Lógica para obtener las políticas de la página actual
  const indexOfLastPolitica = currentPage * politicasPerPage;
  const indexOfFirstPolitica = indexOfLastPolitica - politicasPerPage;
  const currentPoliticas = politicas.slice(indexOfFirstPolitica, indexOfLastPolitica);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(politicas.length / politicasPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Lista de Políticas</h2>
      <div className="text-end mb-3">
        <Link to="/crtPoliticas" className="btn bg__fond_form text-white fw-bold">
          Agregar Política
        </Link>
      </div>
      <table
        className="table table-striped table-bordered shadow mb-4"
        style={{
          width: "90%",
          margin: "0 auto",
          fontSize: "0.9rem",
          tableLayout: "fixed",
        }}
      >
        <thead className="table-dark text-center">
          <tr>
            <th>Contenido</th>
            <th>Fecha de Creación</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {currentPoliticas.length > 0 ? (
            currentPoliticas.map((politica) => (
              <tr key={politica._id}>
                <td>
                  {politica.contenido.length > 75
                    ? politica.contenido.slice(0, 75) + "..."
                    : politica.contenido}
                </td>
                <td>{new Date(politica.fechaCreacion).toLocaleDateString()}</td>
                <td className="text-center">
                  <button
                    className="btn btn-info btn-sm mx-1"
                    onClick={() => handleView(politica)}
                  >
                    Ver
                  </button>
                  <Link
                    to={`/edtPoliticas/${politica._id}`}
                    className="btn btn-warning btn-sm mx-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(politica._id)}
                    className="btn btn-danger btn-sm mx-1"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No hay políticas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación, solo visible si hay más de 8 políticas */}
      {politicas.length > politicasPerPage && (
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

export default ViewPoliticas;
