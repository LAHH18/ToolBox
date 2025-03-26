import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useProducts } from "../../context/ProductsContext";
import { Link } from "react-router-dom";

function ViewProducts() {
  const { products, getProducts, deleteProduct } = useProducts();
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [productsPerPage] = useState(10); // Productos por página

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(id);
        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
        getProducts();
      }
    });
  };

  const handleView = (product) => {
    const imageUrl = product.imagenes?.img1 || "https://via.placeholder.com/150";
    const html = `
      <div style="display: flex; justify-content: center; align-items: center; padding: 10px;">
        <div style="width: 100%; max-width: 600px; background: #f7f7f7; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${imageUrl}" alt="Imagen del producto" style="max-width: 150px; border-radius: 8px;" />
          </div>
          <div style="text-align: left; line-height: 1.5;">
            <h3 style="margin-top: 0; margin-bottom: 10px;">${product.nombre}</h3>
            <p style="margin: 0;"><strong>Descripción:</strong> ${product.descripcion || 'N/A'}</p>
            <p style="margin: 0;"><strong>Categoría:</strong> ${product.categoria || 'N/A'}</p>
            <p style="margin: 0;"><strong>Marca:</strong> ${product.marca || 'N/A'}</p>
            <p style="margin: 0;"><strong>Precio:</strong> ${product.precio ? Number(product.precio).toFixed(2) : 'No disponible'}</p>
            <p style="margin: 0;"><strong>Stock:</strong> ${product.stock || 0}</p>
            <p style="margin: 0;"><strong>Modelo:</strong> ${product.modelo || 'N/A'}</p>
            <p style="margin: 0;"><strong>Estado:</strong> ${product.estado || 'N/A'}</p>
            <p style="margin: 5px 0 0;"><strong>Dimensiones:</strong></p>
            <ul style="margin: 0 0 5px 20px; padding: 0;">
              <li>Ancho: ${product.dimensiones?.ancho || 0}</li>
              <li>Alto: ${product.dimensiones?.alto || 0}</li>
              <li>Peso: ${product.dimensiones?.peso ? Number(product.dimensiones.peso).toFixed(2) : 'No disponible'}</li>
            </ul>
            <p style="margin: 0;"><strong>Código:</strong> ${product.codigo || 'N/A'}</p>
          </div>
        </div>
      </div>
    `;
    Swal.fire({
      title: 'Detalle del Producto',
      html,
      width: '700px'
    });
  };

  // Lógica para obtener los productos de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calcular los botones de la paginación (3 botones visibles máximo)
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
    <div className="container mt-5 mb-4">
      <h2 className="text-center">Gestión de Productos</h2>
      <div className="text-end mb-3">
        <Link to="/crtProduct" className="btn bg__fond_form text-white fw-bold">
          Agregar Producto
        </Link>
      </div>

      <table
        className="table table-bordered mb-4"
        style={{
          width: "80%",          // Ancho total de la tabla
          margin: "0 auto",     
          fontSize: "0.9rem",    
          tableLayout: "fixed"   // Se respetan los anchos fijos en los <th>
        }}
      >
        <thead className="table-dark">
          <tr>
            <th style={{ width: "45%" }}>Nombre</th>
            <th style={{ width: "15%" }} className="text-center">Precio</th>
            <th style={{ width: "10%" }} className="text-center">Stock</th>
            <th style={{ width: "25%" }} className="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((item) => (
            <tr key={item._id}>
              <td
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.nombre}
              </td>
              <td
                className="text-center"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                ${item.precio ? Number(item.precio).toFixed(2) : "No disponible"}
              </td>
              <td className="text-center">{item.stock}</td>
              <td className="text-center">
                <button
                  onClick={() => handleView(item)}
                  className="btn btn-info btn-sm me-2"
                >
                  Ver
                </button>
                <Link
                  to={`/edtProtuc/${item._id}`}
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
          ))}
        </tbody>
      </table>

      {/* Paginación, solo visible si hay más de 10 productos */}
      {products.length > productsPerPage && (
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

export default ViewProducts;
