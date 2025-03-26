import axios from "./axios";

// Enviar un mensaje
export const postMessageRequest = (data) => axios.post("/postContacto", data);

// Obtener todos los mensajes
export const getMessagesRequest = () => axios.get("/getContacto");