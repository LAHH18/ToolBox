import axios from "./axios";

// Obtener favoritos de un usuario
export const getFavoritesRequest = (email) => axios.get(`/userFav/${email}`);

// Agregar un producto a favoritos
export const addFavoriteRequest = (email, codigoProducto) =>
  axios.post("/agregarFav", { email, codigoProducto })

// Eliminar un producto de favoritos
export const removeFavoriteRequest = (email, codigoProducto) =>
  axios.delete("/eliminarFav", { data: { email, codigoProducto } });