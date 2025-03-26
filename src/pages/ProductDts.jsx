  import React, { useState, useEffect } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
  import { getProductRequest } from "../api/products";
  import { useAuth } from "../context/AuthContext.jsx";
  import { useFavorites } from "../context/FavoritosContext.jsx";

  const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { favorites, getFavorites, addFavorite, removeFavorite, addCart } = useFavorites(); // Se agregó addCart

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(0);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const res = await getProductRequest(id);
          setProduct(res.data);
          if (res.data.imagenes && res.data.imagenes.img1) {
            setMainImage(res.data.imagenes.img1);
          }
        } catch (error) {
          console.error("Error al obtener el producto:", error);
        }
      };

      fetchProduct();
    }, [id]);

    useEffect(() => {
      if (isAuthenticated) {
        getFavorites(user.email);
      }
    }, [isAuthenticated]);

    const handleDecreaseQuantity = () => {
      setSelectedQuantity((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const handleIncreaseQuantity = () => {
      setSelectedQuantity((prev) =>
        prev < product.stock ? prev + 1 : product.stock
      );
    };

    const handleAddToCart = async () => {
      if (!isAuthenticated) {
        Swal.fire({
          title: "Inicia sesión",
          text: "Debes iniciar sesión para agregar productos al carrito.",
          icon: "info",
          confirmButtonText: "Ir a Login",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
        return;
      }

      if (selectedQuantity <= 0) {
        Swal.fire({
          title: "Cantidad inválida",
          text: "Debes seleccionar al menos 1 unidad.",
          icon: "error",
          confirmButtonText: "Entendido",
        });
        return;
      }

      try {
        await addCart(user.email, product.codigo, selectedQuantity); // Agrega al carrito

        Swal.fire({
          title: "¡Producto agregado!",
          text: `Has agregado ${selectedQuantity} unidad(es) al carrito.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al agregar el producto al carrito.",
          icon: "error",
          confirmButtonText: "Entendido",
        });
      }
    };

    if (!product) return <div>Cargando...</div>;

    const isFavorite = favorites.some((fav) => fav.producto.codigo === product.codigo);

    const handleFavorite = async () => {
      if (!isAuthenticated) {
        Swal.fire({
          title: "Inicia sesión",
          text: "Debes iniciar sesión para agregar productos a favoritos.",
          icon: "info",
          confirmButtonText: "Ir a Login",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
        return;
      }

      try {
        if (isFavorite) {
          await removeFavorite(user.email, product.codigo);
          Swal.fire({
            title: "Eliminado de favoritos",
            text: "Este producto ha sido eliminado de tus favoritos.",
            icon: "warning",
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: "top-end",
          });
        } else {
          await addFavorite(user.email, product.codigo);
          Swal.fire({
            title: "Agregado a favoritos",
            text: "Este producto ha sido añadido a tus favoritos.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: "top-end",
          });
        }
        getFavorites(user.email);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al gestionar el favorito.",
          icon: "error",
          confirmButtonText: "Entendido",
        });
      }
    };

    return (
      <div className="container bg-light mt-5 rounded producto-detalles">
        <div className="row p-4">
          {/* 🔍 Galería de imágenes con miniaturas */}
          <div className="col-md-6 border rounded p-2">
            <div className="row">
              <div className="col-2 d-flex flex-column">
                {["img1", "img2", "img3", "img4"].map((imgKey, index) =>
                  product.imagenes && product.imagenes[imgKey] ? (
                    <img
                      key={index}
                      src={product.imagenes[imgKey]}
                      alt={`Imagen ${index + 1}`}
                      className="img-thumbnail mb-2"
                      onClick={() => setMainImage(product.imagenes[imgKey])}
                      style={{ cursor: "pointer" }}
                    />
                  ) : null
                )}
              </div>
              <div className="col-10">
                <img
                  id="mainImage"
                  src={mainImage}
                  className="img-fluid"
                  alt="Imagen seleccionada"
                />
              </div>
            </div>
          </div>

          {/* 📌 Detalles del producto */}
          <div className="col-md-6">
            <div>
              <h3>{product.nombre}</h3>
              <p className="precio">${product.precio}</p>
              <p><strong>Descripción:</strong> {product.descripcion}</p>
              <p><strong>Marca:</strong> {product.marca}</p>
              <p><strong>Modelo:</strong> {product.modelo}</p>
              <p><strong>Tamaño:</strong> {product.dimensiones.ancho} x {product.dimensiones.alto}</p>

              {/* 📦 Selector de cantidad con botones */}
              <div className="mb-3">
                <label className="form-label"><strong>Cantidad:</strong></label>
                <div className="d-flex align-items-center">
                  <button className="btn btn-secondary" onClick={handleDecreaseQuantity}>-</button>
                  <input
                    type="text"
                    readOnly
                    value={selectedQuantity}
                    className="form-control mx-2 text-center"
                    style={{ width: "60px" }}
                  />
                  <button className="btn btn-secondary" onClick={handleIncreaseQuantity}>+</button>
                </div>
                <small className="text-muted">Stock disponible: {product.stock}</small>
              </div>

              {/* 🎯 Botones de acción */}
              <div className="card-buttons d-block">
                <button className="btn btn-ver-mas" onClick={handleAddToCart}>
                  Agregar al carrito
                </button>
                <button
                  className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
                  style={{
                    backgroundColor: isFavorite ? "#4d82be" : "#8AB3CF",
                    color: "white",
                    border: "none",
                  }}
                  onClick={handleFavorite}
                >
                  {isFavorite ? "En Favoritos" : "Añadir a Favoritos"}
                </button>
              </div>

              <div className="mt-4">
                <h4>Métodos de pago</h4>
                <ul>
                  <li>Tarjeta de crédito</li>
                  <li>PayPal</li>
                  <li>Transferencia bancaria</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductDetails;
