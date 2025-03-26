import axios from "./axios";

// Actualizar perfil
export const updateProfileRequest = (email, userData) => axios.put(`/updateUser/${email}`, userData);

// Actualizar contraseña
export const updatePasswordRequest = (email, newPassword) => axios.put(`/updatePassword`, { email, newPassword });

// Checar email
export const checkEmailRequest = (email) => axios.post(`/checkEmail`, { email });

// Checar respuesta
export const checkAnswerRequest = (email, respuesta) => axios.post(`/checkAnswer`, { email, respuesta });