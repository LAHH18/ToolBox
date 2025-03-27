import axios from "axios";

const instance = axios.create({
  baseURL: 'https://toolbox-sigma-black.vercel.app/api',
  withCredentials: true // Esto es esencial para enviar cookies
});

// Interceptor para manejar errores
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Puedes redirigir a login aquí si lo prefieres
      console.error("No autorizado - redirigir a login");
    }
    return Promise.reject(error);
  }
);

export default instance;