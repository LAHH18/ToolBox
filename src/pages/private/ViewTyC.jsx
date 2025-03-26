import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";

function ViewTyC() {
  const { tyc, getTyC, deleteTyC } = useEmpresaFaq();
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [tycPerPage] = useState(8); // Términos y Condiciones por página

  useEffect(() => {
    getTyC();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el TyC permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTyC(id);
        Swal.fire("Eliminado", "El TyC ha sido eliminado.", "success");
        getTyC();
      }
    });
  };

  const handleView = (item) => {
    Swal.fire({
      title: "Términos y Condiciones",
      html: `<p><strong>Contenido:</strong></p>
             <p>${item.contenido}</p>
             <p><strong>Fecha de Creación:</strong> ${new Date(item.fechaCreacion).toLocaleDateString()}</p>`,
      icon: "info",
      confirmButtonText: "Cerrar",
      width: "600px",
    });
  };

  // Lógica para obtener los TyC de la página actual
  const indexOfLastItem = currentPage * tycPerPage;
  const indexOfFirstItem = indexOfLastItem - tycPerPage;
  const currentTyC = tyc.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tyc.length / tycPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Términos y Condiciones</h2>
      <div className="text-end mb-3">
        <Link to="/crtTyC" className="btn bg__fond_form text-white fw-bold">
          Agregar TyC
        </Link>
      </div>
      <table
        className="table table-striped table-bordered mb-4"
        style={{
          width: "90%",
          margin: "0 auto",
          fontSize: "0.9rem",
          tableLayout: "fixed",
        }}
      >
        <thead className="table-dark">
          <tr>
            <th>Contenido</th>
            <th>Fecha de Creación</th>
            <th className="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {currentTyC.length > 0 ? (
            currentTyC.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.contenido.length > 80
                    ? item.contenido.slice(0, 80) + "..."
                    : item.contenido}
                </td>
                <td>{new Date(item.fechaCreacion).toLocaleDateString()}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleView(item)}
                    className="btn btn-info btn-sm me-2"
                  >
                    Ver
                  </button>
                  <Link
                    to={`/edtTyC/${item._id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
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
                No hay Términos y Condiciones registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación solo visible si hay más de 8 elementos */}
      {tyc.length > tycPerPage && (
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

export default ViewTyC;
