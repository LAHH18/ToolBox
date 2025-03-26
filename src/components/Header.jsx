import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useEmpresaFaq } from "../context/dtsEmpContext.jsx";
import { useProducts } from "../context/ProductsContext.jsx";
import { useFavorites } from "../context/FavoritosContext.jsx"; // Agregado
import "./Header.css";
import NavBarOpt from "./Navbar.jsx";
import NavBarEmp from "./NavbarEmpleado.jsx";
import NavBarAdmin from "./NavBarAdmin.jsx";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { empresa, getEmpresa } = useEmpresaFaq();
  const { products, getProducts } = useProducts();
  const { carrito, getCarrito } = useFavorites(); // Extraído del contexto

  const [nombreEmpresa, setNombreEmpresa] = useState("ToolBox");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  useEffect(() => {
    getEmpresa();
    getProducts();
  }, []);

  useEffect(() => {
    if (empresa?.nombre) setNombreEmpresa(empresa.nombre);
  }, [empresa]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
      return;
    }
    const filtered = products.filter((product) =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchTerm("");
        setFilteredProducts([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?.email && user.rol === 2) {
      getCarrito(user.email); 
    }
  }, [isAuthenticated, user]);

  const handleSearchClick = (id) => {
    setSearchTerm("");
    setFilteredProducts([]);
    navigate(`/product/${id}`);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg p-3">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-3"
            to={
              isAuthenticated && user.rol === 1
                ? "/HomePagePriv"
                : isAuthenticated && user.rol === 3
                ? "/HomeEmpleados"
                : "/"
            }
          >
            {nombreEmpresa}
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSearchAuth"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSearchAuth"
          >
            {(!isAuthenticated || user.rol === 2) && (
              <div className="position-relative me-auto" ref={searchContainerRef}>
                <input
                  className="form-control w-200"
                  type="search"
                  placeholder="Buscar producto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredProducts.length > 0 && (
                  <ul
                    className="list-group position-absolute w-100 mt-1"
                    style={{ zIndex: 1000 }}
                  >
                    {filteredProducts.slice(0, 5).map((product) => (
                      <li
                        key={product._id}
                        className="list-group-item list-group-item-action d-flex align-items-center"
                        onClick={() => handleSearchClick(product._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={product.imagenes.img1}
                          alt={product.nombre}
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                        <div>
                          <div>{product.nombre}</div>
                          <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                            ${product.precio.toFixed(2)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* PERFIL + CARRITO */}
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                {isAuthenticated ? (
                  <>
                    <a
                      className="nav-link dropdown-toggle text-white"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      {user.username}
                    </a>
                    <ul className="dropdown-menu bg__fondo">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Perfil
                        </Link>
                      </li>
                      {user.rol === 2 && (
                        <>
                          <li>
                            <Link
                              className="dropdown-item"
                              to={`/favoritos/${user.email}`}
                            >
                              Favoritos
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/menuVent">
                              IoT
                            </Link>
                          </li>
                        </>
                      )}
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/"
                          onClick={logout}
                        >
                          Cerrar sesión
                        </Link>
                      </li>
                    </ul>
                  </>
                ) : (
                  <Link className="nav-link text-white" to="/login">
                    Iniciar Sesión
                  </Link>
                )}
              </li>

              {isAuthenticated && user.rol === 2 && (
                <li className="nav-item">
                  <Link
                    to={`/carrito/${user.email}`}
                    className="nav-link text-white position-relative"
                  >
                    <div className="position-relative">
                      <FaShoppingCart size={24} />
                      {carrito.length > 0 && (
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {carrito.length}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {isAuthenticated ? (
        user.rol === 1 ? (
          <NavBarAdmin />
        ) : user.rol === 3 ? (
          <NavBarEmp />
        ) : (
          <NavBarOpt />
        )
      ) : (
        <NavBarOpt />
      )}
    </>
  );
}

export default Header;
