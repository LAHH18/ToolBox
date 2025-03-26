import { createContext, useState, useContext, useEffect } from "react";
import { 
  updateProfileRequest, 
  updatePasswordRequest, 
  checkEmailRequest, 
  checkAnswerRequest 
} from "../api/user.js";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Actualizar perfil
  const updateProfile = async (email, userData) => {
    try {
      setLoading(true);
      const res = await updateProfileRequest(email, userData);
      return res.data; // Devuelve los datos actualizados del usuario
    } catch (error) {
      setErrors(error.response.data);
      throw error; // Lanza el error para que lo capture el componente
    } finally {
      setLoading(false);
    }
  };

  // Actualizar contraseña
  const updatePassword = async (email, newPassword) => {
    try {
      setLoading(true);
      const res = await updatePasswordRequest(email, newPassword);
      return res.data; // Devuelve un mensaje de éxito
    } catch (error) {
      setErrors(error.response.data);
      throw error; // Lanza el error para que lo capture el componente
    } finally {
      setLoading(false);
    }
  };

  // Checar email
  const checkEmail = async (email) => {
    try {
      setLoading(true);
      const res = await checkEmailRequest(email);
      return res.data; // Devuelve la pregunta de seguridad
    } catch (error) {
      setErrors(error.response.data);
      throw error; // Lanza el error para que lo capture el componente
    } finally {
      setLoading(false);
    }
  };

  // Checar respuesta
  const checkAnswer = async (email, respuesta) => {
    try {
      setLoading(true);
      const res = await checkAnswerRequest(email, respuesta);
      return res.data; // Devuelve un mensaje de éxito o error
    } catch (error) {
      setErrors(error.response.data);
      throw error; // Lanza el error para que lo capture el componente
    } finally {
      setLoading(false);
    }
  };

  // Limpiar errores después de un tiempo
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000); // Limpia los errores después de 5 segundos
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <UserContext.Provider
      value={{
        updateProfile,
        updatePassword,
        checkEmail,
        checkAnswer,
        loading,
        errors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};