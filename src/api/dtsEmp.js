import axios from './axios';

export const getEmpresaRequest = () => axios.get('/getDatos');  // Obtener datos de la empresa
export const createEmpresaRequest = (data) => axios.post('/dts', data); // Crear datos de la empresa
export const updateEmpresaRequest = (data) => axios.put('/actdts', data); // Actualizar datos de la empresa

// Preguntas y Respuestas
export const getPreguntasRequest = () => axios.get('/gtPreyRes'); // Obtener todas las preguntas
export const createPreguntaRequest = (data) => axios.post('/crtPreyRes', data); // Crear nueva pregunta
export const updatePreguntaRequest = (id, data) => axios.put(`/uptPreyRes/${id}`, data); // Actualizar pregunta
export const deletePreguntaRequest = (id) => axios.delete(`/delPreyRes/${id}`); // Eliminar pregunta
export const getPreguntaByIdRequest = (id) => axios.get(`/gtPryRe/${id}`); //obtenr por id

//TyC
export const getTyCRequest = () => axios.get('/gtTyCs'); //Trae todos
export const getTyCByIdRequest = (id) => axios.get(`/gtTyC/${id}`); //Trae por id
export const createTyCRequest = (data) => axios.post('/crtTyC', data); //Pa crear
export const updateTyCRequest = (id, data) => axios.put(`/uptTyC/${id}`, data); //Actualizar
export const deleteTyCRequest = (id) => axios.delete(`/dltTyC/${id}`); //Elimina

//Politicas
export const getPoliticasRequest = () => axios.get('/gtPoliticas'); //Trae todos
export const getPoliticaByIdRequest = (id) => axios.get(`/gtPol/${id}`); //Trae por id
export const createPoliticaRequest = (data) => axios.post('/crtPoliticas', data); //Pa crear
export const updatePoliticaRequest = (id, data) => axios.put(`/uptPoliticas/${id}`, data); //Actualizar
export const deletePoliticaRequest = (id) => axios.delete(`/dltPoliticas/${id}`); //Elimina
