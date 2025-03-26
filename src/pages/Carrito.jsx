// Carrito.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx"; 
import { useFavorites } from "../context/FavoritosContext.jsx"; 
import Swal from "sweetalert2";

function Carrito() {
  const { user, isAuthenticated } = useAuth(); 
  const { carrito, getCarrito, removeCart, realizarCompra } = useFavorites();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      getCarrito(user.email); 
    }
  }, [isAuthenticated, user?.email]);

  useEffect(() => {
    calcularTotal(carrito);
  }, [carrito]);

  const calcularTotal = (productos) => {
    const totalCalculado = productos.reduce(
      (acc, prod) => acc + prod.producto.precio * prod.cantidad,
      0
    );
    setTotal(totalCalculado);
  };

  const eliminarProducto = async (codigoProducto) => {
    if (!isAuthenticated || !user?.email) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión para gestionar tu carrito.",
        icon: "info",
        confirmButtonText: "Ir a Login",
      });
      return;
    }

    try {
      await removeCart(user.email, codigoProducto);
      Swal.fire({
        title: "Producto eliminado",
        text: "Se ha eliminado del carrito.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el producto del carrito.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  const handleProcederAlPago = async () => {
    if (!isAuthenticated || !user?.email) {
      return Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión para realizar una compra.",
        icon: "info",
        confirmButtonText: "Ir a Login",
      });
    }
  
    if (carrito.length === 0) {
      return Swal.fire({
        title: "Carrito vacío",
        text: "No hay productos en el carrito.",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
    }
  
    try {
      // Opcional: mostrar loader mientras se procesa
      Swal.fire({
        title: "Procesando compra...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
  
      await realizarCompra(user.email);
  
      // Cerrar loader y mostrar éxito
      Swal.close();
      Swal.fire({
        title: "¡Compra realizada!",
        text: "Gracias por tu compra.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
  
      // Refrescar carrito (o vaciarlo según tu lógica)
      getCarrito(user.email);
    } catch (error) {
      console.error("Error al proceder al pago:", error);
      Swal.close();
      Swal.fire({
        title: "Error",
        text: "No se pudo completar la compra. Intenta de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };
  

  return (
    <div className="container rounded bg-light p-4 mt-5 mb-5">
      <h2 className="text-center">Carrito de Compras</h2>
      {carrito.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {carrito.map(({ producto, cantidad }) => (
            <div
              key={producto._id}
              className="d-flex align-items-center p-3 shadow-sm rounded border"
            >
              <img
                src={producto.imagenes.img1}
                alt={producto.nombre}
                className="rounded me-3"
                style={{ width: "80px" }}
              />
              <div className="flex-grow-1">
                <h5 className="mb-1">{producto.nombre}</h5>
                <p className="mb-1">Cantidad: {cantidad}</p>
                <p className="fw-bold">Precio: ${producto.precio}</p>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => eliminarProducto(producto.codigo)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No hay productos en el carrito.</p>
      )}

      <div className="text-end mt-4">
        <h4>Total: ${total.toFixed(2)}</h4>
        <button className="btn btn-success" onClick={handleProcederAlPago}>
          Proceder al Pago
        </button>
      </div>
    </div>
  );
}

export default Carrito; 