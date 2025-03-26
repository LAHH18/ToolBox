import axios from "./axios";

// Obtener sincronizaciones de un usuario
export const getSincronizacionesRequest = (email) => axios.get(`/userSync/${email}`);

// Agregar una sincronización
export const addSincronizacionRequest = (email, codigoVentana, nombre) =>
  axios.post("/agregarSync", { email, codigo: codigoVentana, nombre });

// Eliminar una sincronización
export const removeSincronizacionRequest = (email, codigoVentana) =>
  axios.delete("/eliminarSync", { data: { email, codigo: codigoVentana } });

// Obtener todas las sincronizaciones
export const getAllSincronizacionesRequest = () => axios.get("/Sincronizaciones");