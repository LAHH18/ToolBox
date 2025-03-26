import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useFavorites } from "../../context/FavoritosContext.jsx"; // Importa el contexto correcto

function ViewMensajes() {
  const { messages, getMessages, loadingMessages } = useFavorites(); // Usa las funciones y estados del contexto
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [messagesPerPage] = useState(8); // Mensajes por página

  useEffect(() => {
    getMessages();
  }, []);

  const handleView = (mensaje) => {
    Swal.fire({
      title: "Detalles del Mensaje",
      html: `<p><strong>Nombre:</strong> ${mensaje.nombre}</p>
             <p><strong>Correo:</strong> ${mensaje.email}</p>
             <p><strong>Teléfono:</strong> ${mensaje.telefono}</p>
             <p><strong>Mensaje:</strong> ${mensaje.mensaje}</p>
             <p><strong>Fecha:</strong> ${new Date(mensaje.fechaAgregado).toLocaleDateString()}</p>`,
      icon: "info",
      confirmButtonText: "Cerrar",
      width: "600px",
    });
  };

  if (loadingMessages) {
    return <div>Cargando mensajes...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  // Lógica para obtener los mensajes de la página actual
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(messages.length / messagesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Mensajes Recibidos</h2>
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
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha</th>
            <th className="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {currentMessages.map((mensaje) => (
            <tr key={mensaje._id}>
              <td>{mensaje.nombre}</td>
              <td>{mensaje.email}</td>
              <td>{new Date(mensaje.fechaAgregado).toLocaleDateString()}</td>
              <td className="text-center">
                <button
                  onClick={() => handleView(mensaje)}
                  className="btn btn-info btn-sm me-2"
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación, solo visible si hay más de 8 mensajes */}
      {messages.length > messagesPerPage && (
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

export default ViewMensajes;
