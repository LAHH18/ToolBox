import React from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext.jsx";

const Card = ({
  imagen,
  titulo,
  descripcion,
  precio,
  isOffer = false,
  porcentaje,
  newPrecio,
  verProduct,
  productoCodigo,
  isFavorite,
  handleFavorite,
}) => {
  const { isAuthenticated } = useAuth();

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión para agregar productos a favoritos.",
        icon: "info",
        confirmButtonText: "Ir a Login",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) window.location.href = "/login";
      });
      return;
    }

    await handleFavorite(productoCodigo);

    Swal.fire({
      title: isFavorite ? "Eliminado de favoritos" : "Agregado a favoritos",
      text: isFavorite
        ? "Este producto ha sido eliminado de tus favoritos."
        : "Este producto ha sido añadido a tus favoritos.",
      icon: isFavorite ? "warning" : "success",
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  return (
    <>
      <style>
        {`
          .responsive-img {
            width: 384px;
            height: 380px;
            object-fit: cover;
          }
          @media (max-width: 576px) {
            .responsive-img {
              width: 316px;
              height: 300px;
              object-fit: cover;
            }
          }
        `}
      </style>

      <div className="card bg__fond_card">
        <img
          src={imagen}
          className="card-img-top responsive-img"
          alt={titulo}
        />
        <div className="card-body">
          {isOffer && (
            <div className="d-flex">
              <p className="card-text text-white bg-danger rounded p-1">
                {porcentaje}%
              </p>
              <p className="card-text text-danger fw-bold pl-3">
                Promoción
              </p>
            </div>
          )}
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text text-limited">{descripcion}</p>
          <div className="d-flex justify-content-between p-2">
            <p className="card-text h3">${precio}</p>
            {isOffer && <p className="card-text h3">${newPrecio}</p>}
          </div>
          <div className="card-buttons">
            <button className="btn btn-ver-mas" onClick={verProduct}>
              Ver más
            </button>
            <button
              className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
              style={{
                backgroundColor: isFavorite ? "#4d82be" : "#8AB3CF",
                color: "white",
                border: "none",
              }}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? "En Favoritos" : "Añadir a Favoritos"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
