import { useFavorites } from "../context/FavoritosContext.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

function Favoritos() {
  const { email } = useParams();
  const { favorites, getFavorites, setFavorites, removeFavorite } = useFavorites();

  useEffect(() => {
    if (email) {
      setFavorites([]);
      getFavorites(email);
    }
  }, [email]);

  const handleRemoveFavorite = async (codigoProducto) => {
    try {
      await removeFavorite(email, codigoProducto);

      getFavorites(email);

      Swal.fire({
        title: "Eliminado",
        text: "El producto ha sido eliminado de tus favoritos.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el producto de favoritos.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="nuevo-apartado">
        <h2 className="mb-4">Favoritos</h2>
        <div className="row">
          {favorites.length > 0 ? (
            favorites.map((producto) => (
              <div className="col-md-12 mb-3" key={producto.producto._id}>
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-3 d-flex align-items-center justify-content-center">
                      <img
                        src={producto.producto.imagenes?.img1 || "placeholder.jpg"}
                        className="img-fluid"
                        alt={producto.producto.nombre}
                        style={{ maxWidth: "100px", height: "auto" }}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title">{producto.producto.nombre}</h5>
                        <p className="card-text">${producto.producto.precio}</p>
                        <button
                          className="btn btn-link text-primary"
                          onClick={() => handleRemoveFavorite(producto.producto.codigo)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No tienes productos en favoritos.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favoritos;
