import { useEffect } from "react";
import { useSincronizacion } from "../../context/SincronizacionContext.jsx";
import Swal from "sweetalert2";

function ViewControlIoT() {
  const {
    sincronizaciones,
    getAllSincronizaciones,
    removeSincronizacion,
    loading,
    errors,
    clearErrors,
  } = useSincronizacion();

  // Obtener todas las sincronizaciones al cargar la vista
  useEffect(() => {
    getAllSincronizaciones();
  }, []);

  // Manejar la eliminación de una sincronización
  const handleDelete = async (email, codigoVentana) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la sincronización permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeSincronizacion(email, codigoVentana);
        Swal.fire("Eliminado", "La sincronización ha sido eliminada.", "success");
        getAllSincronizaciones(); // Refrescar la lista después de eliminar
      }
    });
  };

  // Mostrar errores si existen
  useEffect(() => {
    if (errors.length > 0) {
      Swal.fire({
        title: "Error",
        text: errors.join(", "),
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      clearErrors(); // Limpiar los errores después de mostrarlos
    }
  }, [errors]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Control de Sincronizaciones IoT</h2>
      <div className="text-end mb-3">
        <button
          className="btn bg__fond_form text-white fw-bold"
          onClick={getAllSincronizaciones}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Refrescar"}
        </button>
      </div>
      <table
        className="table table-striped table-bordered"
        style={{
          width: "90%",
          margin: "0 auto",
          fontSize: "0.9rem",
          tableLayout: "fixed",
        }}
      >
        <thead className="table-dark">
          <tr>
            <th>Nombre del Cliente</th>
            <th>Código de la Ventana</th>
            <th>Nombre de la Sincronización</th>
            <th className="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {sincronizaciones.map((sincro) => (
            <tr key={sincro._id}>
              <td>{sincro.usuario?.name?.nombres || "N/A"}</td>
              <td>{sincro.ventana?.codigo || "N/A"}</td>
              <td>{sincro.nombre || "N/A"}</td>
              <td className="text-center">
                <button
                  onClick={() => handleDelete(sincro.usuario?.email, sincro.ventana?.codigo)}
                  className="btn btn-danger btn-sm"
                  disabled={loading}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewControlIoT;