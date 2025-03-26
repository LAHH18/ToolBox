import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import { useFavorites } from "../context/FavoritosContext.jsx";
import { useEmpresaFaq } from "../context/dtsEmpContext.jsx"; // Importa el contexto de empresa
import Card from "../components/Card.jsx";
import { Link } from "react-router-dom";

function HomePage() {
  const { getProducts, products } = useProducts();
  const { getFavorites, addFavorite, removeFavorite, favorites, setFavorites } = useFavorites();
  const { user, isAuthenticated } = useAuth();
  const { empresa, getEmpresa } = useEmpresaFaq(); // Obtén los datos de la empresa
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const email = user?.email;

  // Estado para el filtro de precios definidos
  const [rangoPrecio, setRangoPrecio] = useState("");

  useEffect(() => {
    getProducts();
    getEmpresa(); // Obtén los datos de la empresa
    if (isAuthenticated && email) {
      getFavorites(email);
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, email]);

  // Filtrar productos según el rango de precios seleccionado
  const productosFiltrados = products.filter((product) => {
    const precio = product.precio;
    switch (rangoPrecio) {
      case "menos-500":
        return precio < 500;
      case "500-1000":
        return precio >= 500 && precio <= 1000;
      case "1000-2000":
        return precio >= 1000 && precio <= 2000;
      case "mas-2000":
        return precio > 2000;
      default:
        return true; // Si no hay filtro, mostrar todos los productos
    }
  });

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

  // Paginación con productos filtrados
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div id="welcomeCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <div style={{ width: "100%", margin: 0, padding: 0 }}>
        <section className="hero-banner d-flex align-items-center" style={{
          width: "100%",
          background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://www.prolisur.com/wp-content/uploads/2020/10/ventanas-inteligentes-1280x640.jpg') center/cover no-repeat",
          minHeight: "35vh"
        }}>
          <div style={{ width: "100%" }} className="text-center text-white">
            <h2 className="bd__text display-4 mb-3" style={{ color: "var(--headerForm)" }}>¡Bienvenido a ToolBox!</h2>
            <p className="lead mb-4" style={{ color: "#E4EBF0" }}>Encuentra las mejores herramientas y productos para tus proyectos.</p>
            <Link to="/menuVent" className="btn btn-lg" style={{
              backgroundColor: "var(--btnForm)",
              color: "#fff",
              borderRadius: "50px",
              transition: "transform 0.2s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
              Controla tu Ventana
            </Link>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>

      <div className="container">
 
        {/* Filtros de precios definidos */}
        <div className="padleft m__vacio--cards row mb-4">
          <div className="col-md-6">
            <select
              className="form-select"
              value={rangoPrecio}
              onChange={(e) => setRangoPrecio(e.target.value)}
            >
              <option value="">Todos los precios</option>
              <option value="menos-500">Menos de $500</option>
              <option value="500-1000">$500 - $1000</option>
              <option value="1000-2000">$1000 - $2000</option>
              <option value="mas-2000">Más de $2000</option>
            </select>
          </div>
        </div>

        {/* Lista de productos filtrados */}
        <div className="p-5 row  m__vacio--cards">
          {currentProducts.map((product) => {
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
          })}
        </div>

        {/* Paginación */}
        {productosFiltrados.length > itemsPerPage && (
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
    </div>
  );
}

export default HomePage;