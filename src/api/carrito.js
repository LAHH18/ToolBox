import axios from "./axios";

// Obtener carrito de un usuario
export const getCartRequest = (email) => axios.get(`/userCar/${email}`);

// Agregar un producto al carrito
export const addCartRequest = (email, codigoProducto, cantidad) =>
  axios.post("/agregarCar", { email, codigoProducto, cantidad });

// Eliminar un producto del carrito
export const removeCartRequest = (email, codigoProducto) =>
  axios.delete("/eliminarCar", { data: { email, codigoProducto } });