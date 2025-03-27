import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js";
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
      setUser(res.data);
      setIsAuthenticated(true);
      return res.data;
    } catch (error) {
      setErrors(error.response?.data || [{ message: "Error desconocido" }]);
      throw error;
    }
  };

  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      setIsAuthenticated(true);
      setUser(res.data);
      return res.data;
    } catch (error) {
      setErrors(error.response?.data || [{ message: "Error de autenticación" }]);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("token", { 
      path: "/", 
      domain: window.location.hostname.includes("vercel.app") 
            ? ".vercel.app" 
            : "localhost"
    });
    setIsAuthenticated(false);
    setUser(null);
  };

  // Limpiar errores después de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Obtener cookie considerando el dominio
        const token = Cookies.get("token") || 
                     Cookies.get("token", { domain: ".vercel.app" });
        
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        const res = await verifyTokenRequest();
        if (res.data) {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        Cookies.remove("token", { 
          path: "/", 
          domain: window.location.hostname.includes("vercel.app") 
                ? ".vercel.app" 
                : "localhost"
        });
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      signup,
      signin,
      logout,
      loading,
      user,
      isAuthenticated,
      errors
    }}>
      {children}
    </AuthContext.Provider>
  );
};