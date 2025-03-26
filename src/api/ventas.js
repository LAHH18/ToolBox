// ventas.js
import axios from "./axios";

// Crear una orden (venta)
export const crearOrdenRequest = (email) => axios.post("/crearOrden", { email });

// Obtener todas las ventas
export const obtenerTodasLasVentasRequest = () => axios.get("/ventas");

// Obtener las ventas de un usuario específico
export const obtenerVentasUsuarioRequest = (email) => axios.get(`/ordenes/${email}`);

// Actualizar el estado de una venta
export const actualizarEstadoVentaRequest = (id, estado) =>
    axios.put(`/ventas/${id}/estado`, { estado });