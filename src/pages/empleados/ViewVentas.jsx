import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useFavorites } from "../../context/FavoritosContext.jsx";

function ViewVentas() {
  const { ventas, obtenerTodasLasVentas, actualizarEstadoVenta, loadingVentas } = useFavorites();
  const [estadoEditado, setEstadoEditado] = useState(""); // Estado temporal para edición
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null); // Venta seleccionada para editar
  const [ventaDetalle, setVentaDetalle] = useState(null); // Venta seleccionada para ver detalles

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [ventasPorPagina] = useState(10); // Ventas por página

  useEffect(() => {
    obtenerTodasLasVentas(); // Obtener todas las ventas al cargar la vista
  }, []);

  const handleEditarEstado = (venta) => {
    setVentaSeleccionada(venta); // Guardar la venta seleccionada
    setEstadoEditado(venta.estado); // Inicializar el estado editado
  };

  const handleVerDetalles = (venta) => {
    setVentaDetalle(venta); // Guardar la venta seleccionada para ver detalles
  };

  const confirmarCambioEstado = async () => {
    if (!ventaSeleccionada || !estadoEditado) return;

    try {
      await actualizarEstadoVenta(ventaSeleccionada._id, estadoEditado); // Actualizar el estado
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: "El estado de la venta se ha actualizado correctamente.",
      });
      setVentaSeleccionada(null); // Cerrar el modal
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el estado de la venta.",
      });
    }
  };

  // Lógica para obtener las ventas de la página actual
  const indexOfLastVenta = currentPage * ventasPorPagina;
  const indexOfFirstVenta = indexOfLastVenta - ventasPorPagina;
  const currentVentas = ventas.slice(indexOfFirstVenta, indexOfLastVenta);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(ventas.length / ventasPorPagina);

  // Limitar la paginación a 3 botones visibles
  const pageNumbers = [];
  if (totalPages > 3) {
    const start = currentPage > 1 ? currentPage - 1 : 1;
    const end = currentPage < totalPages ? currentPage + 1 : totalPages;
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Administración de Ventas</h2>
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
            <th>Producto</th>
            <th>Correo del Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th className="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {currentVentas.map((venta) => (
            <tr key={venta._id}>
              <td>{venta.productos[0]?.nombre || "Sin producto"}</td>
              <td>{venta.emailCliente}</td>
              <td>${venta.total.toFixed(2)}</td>
              <td>{venta.estado}</td>
              <td className="text-center">
                <button
                  onClick={() => handleVerDetalles(venta)}
                  className="btn btn-info btn-sm me-2"
                >
                  Ver
                </button>
                <button
                  onClick={() => handleEditarEstado(venta)}
                  className="btn btn-warning btn-sm"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para ver detalles de la venta */}
      {ventaDetalle && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles de la Venta</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setVentaDetalle(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>ID de la Venta:</strong> {ventaDetalle._id}</p>
                <p><strong>Correo del Cliente:</strong> {ventaDetalle.emailCliente}</p>
                <p><strong>Total:</strong> ${ventaDetalle.total.toFixed(2)}</p>
                <p><strong>Estado:</strong> {ventaDetalle.estado}</p>
                <p><strong>Productos:</strong></p>
                <ul>
                  {ventaDetalle.productos.map((producto, index) => (
                    <li key={index}>
                      {producto.nombre} - Cantidad: {producto.cantidad} - Precio: ${producto.precio.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setVentaDetalle(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar el estado */}
      {ventaSeleccionada && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Estado</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setVentaSeleccionada(null)}
                ></button>
              </div>
              <div className="modal-body">
                <select
                  className="form-select"
                  value={estadoEditado}
                  onChange={(e) => setEstadoEditado(e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="completado">Completado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setVentaSeleccionada(null)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmarCambioEstado}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Paginación, solo visible si hay más de 10 productos */}
      {ventas.length > ventasPorPagina && (
        <nav>
          <ul className="pagination justify-content-center">
            {/* Botón "Anterior" */}
            <li className="page-item">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="page-link"
                disabled={currentPage === 1}
              >
                Anterior
              </button>
            </li>

            {/* Botones de números de página */}
            {pageNumbers.map((number) => (
              <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                <button
                  onClick={() => paginate(number)}
                  className="page-link"
                >
                  {number}
                </button>
              </li>
            ))}

            {/* Botón "Siguiente" */}
            <li className="page-item">
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="page-link"
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default ViewVentas;
