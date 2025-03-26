import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import { useFavorites } from "../context/FavoritosContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Card from "../components/Card.jsx";

const ProductsCategoria = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const { products, getProductsCateg } = useProducts();
  const { favorites, getFavorites, addFavorite, removeFavorite } = useFavorites();
  const { user, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const email = user?.email;

  useEffect(() => {
    getProductsCateg(categoria);
    if (isAuthenticated && email) {
      getFavorites(email);
    }
  }, [categoria, isAuthenticated, email]);

  // Manejo correcto de favoritos
  const handleFavorite = async (productId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!productId) {
      alert("Error: El producto no tiene un código válido.");
      return;
    }

    try {
      const isFav = favorites.some((fav) => fav.producto.codigo === productId);

      if (isFav) {
        await removeFavorite(email, productId);
      } else {
        await addFavorite(email, productId);
      }

      getFavorites(email);
    } catch (error) {
      alert(error.response?.data?.message || "Error al gestionar favoritos.");
    }
  };

  // Paginación
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Productos en {categoria}</h2>
      <div className="p-5 row m__vacio--cards">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => {
            const isFavorite = favorites.some((fav) => fav.producto.codigo === product.codigo);
            return (
              <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-4">
                <Card
                  imagen={product.imagenes.img1}
                  titulo={product.nombre}
                  descripcion={product.descripcion}
                  precio={product.precio}
                  verProduct={() => navigate(`/product/${product._id}`)}
                  isFavorite={isFavorite}
                  productoCodigo={product.codigo}
                  handleFavorite={handleFavorite}
                />
              </div>
            );
          })
        ) : (
          <p className="text-center text-muted">No hay productos en esta categoría.</p>
        )}
      </div>

      {/* Paginación */}
      {products.length > itemsPerPage && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
              </button>
            </li>
            {[...Array(totalPages).keys()].map((number) => (
              <li key={number + 1} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => paginate(number + 1)}>
                  {number + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductsCategoria;
