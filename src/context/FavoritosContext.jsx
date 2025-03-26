import { createContext, useContext, useState } from "react";
import {
  getFavoritesRequest,
  addFavoriteRequest,
  removeFavoriteRequest,
} from "../api/favoritos.js";

import {
  getCartRequest,
  addCartRequest,
  removeCartRequest,
} from "../api/carrito.js";

import { postMessageRequest, getMessagesRequest } from "../api/mensajes.js"; 

import {
  crearOrdenRequest,
  obtenerTodasLasVentasRequest,
  obtenerVentasUsuarioRequest,
  actualizarEstadoVentaRequest
} from "../api/ventas.js"; // Importar las funciones de ventas

const FavContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  }
  return context;
};

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [loadingCar, setLoadingCar] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [ventas, setVentas] = useState([]); 
  const [loadingVentas, setLoadingVentas] = useState(false); 

  // Obtener los favoritos del usuario
  const getFavorites = async (email) => {
    if (!email || loading) return;
    setLoading(true);
    try {
      const res = await getFavoritesRequest(email);
      setFavorites(res.data);
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  // Agregar un producto a favoritos y actualizar la lista
  const addFavorite = async (email, codigoProducto) => {
    try {
      await addFavoriteRequest(email, codigoProducto);
      getFavorites(email); // Refresca la lista después de agregar
    } catch (error) {
      console.error("Error al agregar favorito:", error);
    }
  };

  // Eliminar un producto de favoritos y actualizar la lista
  const removeFavorite = async (email, codigoProducto) => {
    try {
      await removeFavoriteRequest(email, codigoProducto);
      
      //  Actualiza el estado eliminando el producto manualmente
      setFavorites((prevFavorites) => 
        prevFavorites.filter((fav) => fav.producto.codigo !== codigoProducto)
      );
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

// FavoritosContext.jsx
const getCarrito = async (email) => {
    if (!email || loadingCar) return;
    setLoadingCar(true);
    try {
        const res = await getCartRequest(email);
        setCarrito(res.data || []); 
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        setCarrito([]); 
    } finally {
        setLoadingCar(false);
    }
};

  // Agregar un producto al carrito y actualizar la lista
  const addCart = async (email, codigoProducto, cantidad = 1) => {
    try {
      await addCartRequest(email, codigoProducto, cantidad);
      await getCarrito(email); 
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  //Eliminar un producto del carrito y actualizar la lista
  const removeCart = async (email, codigoProducto) => {
    try {
      await removeCartRequest(email, codigoProducto);
      setCarrito((prevCarrito) =>
        prevCarrito.filter((item) => item.producto.codigo !== codigoProducto)
      );
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  };

    // Enviar un mensaje
    const sendMessage = async (nombre, email, telefono, mensaje) => {
      try {
        await postMessageRequest({ nombre, email, telefono, mensaje });
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    };
  
  const getMessages = async () => {
    setLoadingMessages(true); // Activa el estado de carga
    try {
      const res = await getMessagesRequest();
      if (res.data) {
        setMessages(res.data); // Actualiza los mensajes
      } else {
        throw new Error("No se recibieron datos");
      }
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los mensajes. Inténtalo de nuevo más tarde.",
      });
    } finally {
      setLoadingMessages(false); 
    }
  };

  const realizarCompra = async (email) => {
    try {
        const res = await crearOrdenRequest(email); 
        if (res.data) {
            setCarrito([]);
        }
    } catch (error) {
        console.error("Error al realizar la compra:", error);
    }
  };

    // Obtener todas las ventas
    const obtenerTodasLasVentas = async () => {
      setLoadingVentas(true);
      try {
        const res = await obtenerTodasLasVentasRequest();
        setVentas(res.data);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
        setVentas([]);
      } finally {
        setLoadingVentas(false);
      }
    };

  // Obtener las ventas de un usuario específico 
  const obtenerVentasUsuario = async (email) => {
    setLoadingVentas(true);
    try {
      const res = await obtenerVentasUsuarioRequest(email);
      setVentas(res.data);
    } catch (error) {
      console.error("Error al obtener las ventas del usuario:", error);
      setVentas([]);
    } finally {
      setLoadingVentas(false);
    }
  };

  const actualizarEstadoVenta = async (id, estado) => {
    try {
      const res = await actualizarEstadoVentaRequest(id, estado); // Usa la nueva función
      if (res.data) {
        setVentas((prevVentas) =>
          prevVentas.map((venta) =>
            venta._id === id ? { ...venta, estado } : venta
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la venta:", error);
    }
  };

  return (
    <FavContext.Provider
    value={{
      favorites,
      getFavorites,
      addFavorite,
      removeFavorite,
      setFavorites,
      loading,  
      carrito,
      getCarrito,
      addCart,
      removeCart,
      setCarrito,
      loadingCar,
      messages, 
      loadingMessages, 
      sendMessage, 
      getMessages, 
      realizarCompra, // Función para realizar la compra
      ventas, // Estado para almacenar las ventas
      obtenerTodasLasVentas, // Función para obtener todas las ventas
      obtenerVentasUsuario, 
      actualizarEstadoVenta,
      loadingVentas, 
    }}
    >
      {children}
    </FavContext.Provider>
  );
}
