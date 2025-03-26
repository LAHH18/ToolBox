import { createContext, useContext, useState } from "react";
import { getSincronizacionesRequest, addSincronizacionRequest, removeSincronizacionRequest,
  getAllSincronizacionesRequest
 } from "../api/sincro.js";

const SincronizacionContext = createContext();

export const useSincronizacion = () => {
  const context = useContext(SincronizacionContext);
  if (!context) {
    throw new Error("useSincronizacion debe usarse dentro de un SincronizacionProvider");
  }
  return context;
};

export function SincronizacionProvider({ children }) {
  const [sincronizaciones, setSincronizaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]); // Estado para manejar errores

  // Limpiar errores después de un tiempo
  const clearErrors = () => {
    setErrors([]);
  };

  // Obtener las sincronizaciones de un usuario
  const getSincronizaciones = async (email) => {
    if (!email || loading) return;
    setLoading(true);
    try {
      const res = await getSincronizacionesRequest(email);
      setSincronizaciones(res.data);
    } catch (error) {
      if (error.response?.status === 404) {
        // No hay sincronizaciones para este usuario
        setSincronizaciones([]); // Limpia las sincronizaciones
      } else {
        console.error("Error al obtener sincronizaciones:", error);
        setErrors(prevErrors => [...prevErrors, error.response?.data?.message || "Error al obtener sincronizaciones."]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Agregar una sincronización y actualizar la lista
  const addSincronizacion = async (email, codigoVentana, nombre) => {
    try {
      const res = await addSincronizacionRequest(email, codigoVentana, nombre);
      if (res.data.message === "El código ya está sincronizado a otro usuario." || res.data.message === "Ya tienes sincronización con ese código.") {
        setErrors(prevErrors => [...prevErrors, res.data.message]); // Maneja el caso de sincronización existente
      } else {
        getSincronizaciones(email); // Refrescar la lista después de agregar
      }
    } catch (error) {
      if (error.response?.status === 400) {
        // Maneja el error 400 como una advertencia
        setErrors(prevErrors => [...prevErrors, error.response?.data?.message || "Error al agregar sincronización."]);
      } else {
        console.error("Error al agregar sincronización:", error);
        setErrors(prevErrors => [...prevErrors, error.response?.data?.message || "Error al agregar sincronización."]);
      }
    }
  };

    // Obtener todas las sincronizaciones
    const getAllSincronizaciones = async () => {
      setLoading(true);
      try {
        const res = await getAllSincronizacionesRequest();
        setSincronizaciones(res.data);
      } catch (error) {
        console.error("Error al obtener todas las sincronizaciones:", error);
        setErrors((prevErrors) => [
          ...prevErrors,
          error.response?.data?.message || "Error al obtener sincronizaciones.",
        ]);
      } finally {
        setLoading(false);
      }
    };

  // Eliminar una sincronización y actualizar la lista
  const removeSincronizacion = async (email, codigoVentana) => {
    try {
      await removeSincronizacionRequest(email, codigoVentana);
      getAllSincronizaciones(); // Refrescar la lista completa después de eliminar
    } catch (error) {
      console.error("Error al eliminar sincronización:", error);
      setErrors((prevErrors) => [
        ...prevErrors,
        error.response?.data?.message || "Error al eliminar sincronización.",
      ]);
    }
  };

  return (
    <SincronizacionContext.Provider
      value={{
        sincronizaciones,
        getSincronizaciones,
        addSincronizacion,
        getAllSincronizaciones,
        removeSincronizacion,
        loading,
        errors,
        clearErrors,
      }}
    >
      {children}
    </SincronizacionContext.Provider>
  );
}