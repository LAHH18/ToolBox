import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth.js"; 
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);  
  const [loading, setLoading] = useState(true);

  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
      throw error; 
    }
  };
    
  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
      // Guardar la cookie "user" con una expiración de 7 días
      Cookies.set("user", JSON.stringify(res.data), { expires: 7 });
      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]); 
    }
  };

  const verifyToken = () => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        setUser(userData);
        setIsAuthenticated(true);
        setLoading(false);
        return userData;
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);
        return null;
      }
    } else {
      setLoading(false);
      return null;
    }
  };

  const logout = () => {
    // Eliminar la cookie "user" en lugar de "token"
    Cookies.remove("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Borrar el error después de 3 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);   

  // Ejecutar verifyToken al montar el componente para restaurar la sesión si existe la cookie
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        signup,
        signin,
        loading,
        user, 
        setUser,
        logout,
        isAuthenticated,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
