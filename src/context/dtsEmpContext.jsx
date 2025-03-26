import { createContext, useContext, useState } from "react";
import {
    getEmpresaRequest, createEmpresaRequest, updateEmpresaRequest,
    getPreguntasRequest, getPreguntaByIdRequest, createPreguntaRequest, updatePreguntaRequest, deletePreguntaRequest,
    getTyCRequest, getTyCByIdRequest, createTyCRequest, updateTyCRequest, deleteTyCRequest,
    getPoliticasRequest, getPoliticaByIdRequest, createPoliticaRequest, updatePoliticaRequest, deletePoliticaRequest
} from "../api/dtsEmp.js";

const EmpresaFaqContext = createContext();

export const useEmpresaFaq = () => {
    const context = useContext(EmpresaFaqContext);
    if (!context) {
        throw new Error("useEmpresaFaq debe usarse dentro de un EmpresaFaqProvider");
    }
    return context;
};

export function EmpresaFaqProvider({ children }) {
    const [empresa, setEmpresa] = useState(null);
    const [preguntas, setPreguntas] = useState([]);
    const [tyc, setTyC] = useState([]);
    const [politicas, setPoliticas] = useState([]);
    const [pregunta, setPregunta] = useState(null);
    const [tycDetalle, setTyCDetalle] = useState(null);
    const [politicaDetalle, setPoliticaDetalle] = useState(null);

    // Obtener datos de la empresa
    const getEmpresa = async () => {
        try {
            const res = await getEmpresaRequest();
            setEmpresa(res.data);
        } catch (error) {
            console.error("Error al obtener datos de la empresa:", error);
        }
    };

    // Actualizar datos de la empresa
    const updateEmpresa = async (data) => {
        try {
            const res = await updateEmpresaRequest(data);
            setEmpresa(res.data);
        } catch (error) {
            console.error("Error al actualizar datos de la empresa:", error);
        }
    };

    // Preguntas y Respuestas
    const getPreguntas = async () => {
        try {
            const res = await getPreguntasRequest();
            setPreguntas(res.data);
        } catch (error) {
            console.error("Error al obtener preguntas:", error);
        }
    };

    const getPreguntaById = async (id) => {
        try {
            const res = await getPreguntaByIdRequest(id);
            setPregunta(res.data);
        } catch (error) {
            console.error("Error al obtener pregunta por ID:", error);
        }
    };
    

    const createPregunta = async (data) => {
        try {
            const res = await createPreguntaRequest(data);
            setPreguntas([...preguntas, res.data]);
        } catch (error) {
            console.error("Error al crear pregunta:", error);
        }
    };

    const updatePregunta = async (id, data) => {
        try {
            const res = await updatePreguntaRequest(id, data);
            setPreguntas(preguntas.map(p => p._id === id ? res.data : p));
        } catch (error) {
            console.error("Error al actualizar pregunta:", error);
        }
    };

    const deletePregunta = async (id) => {
        try {
            await deletePreguntaRequest(id);
            setPreguntas(preguntas.filter(p => p._id !== id));
        } catch (error) {
            console.error("Error al eliminar pregunta:", error);
        }
    };

    // Términos y Condiciones
    const getTyC = async () => {
        try {
            const res = await getTyCRequest();
            setTyC(res.data);
        } catch (error) {
            console.error("Error al obtener TyC:", error);
        }
    };

    const getTyCById = async (id) => {
        try {
            const res = await getTyCByIdRequest(id);
            setTyCDetalle(res.data);
        } catch (error) {
            console.error("Error al obtener TyC por ID:", error);
        }
    };

    const createTyC = async (data) => {
        try {
            const res = await createTyCRequest(data);
            setTyC([...tyc, res.data]);
        } catch (error) {
            console.error("Error al crear TyC:", error);
        }
    };

    const updateTyC = async (id, data) => {
        try {
            const res = await updateTyCRequest(id, data);
            setTyC(tyc.map(t => t._id === id ? res.data : t));
        } catch (error) {
            console.error("Error al actualizar TyC:", error);
        }
    };

    const deleteTyC = async (id) => {
        try {
            await deleteTyCRequest(id);
            setTyC(tyc.filter(t => t._id !== id));
        } catch (error) {
            console.error("Error al eliminar TyC:", error);
        }
    };

    // Políticas
    const getPoliticas = async () => {
        try {
            const res = await getPoliticasRequest();
            setPoliticas(res.data);
        } catch (error) {
            console.error("Error al obtener políticas:", error);
        }
    };

    const getPoliticaById = async (id) => {
        try {
            const res = await getPoliticaByIdRequest(id);
            setPoliticaDetalle(res.data);
        } catch (error) {
            console.error("Error al obtener política por ID:", error);
        }
    };

    const createPolitica = async (data) => {
        try {
            const res = await createPoliticaRequest(data);
            setPoliticas([...politicas, res.data]);
        } catch (error) {
            console.error("Error al crear política:", error);
        }
    };

    const updatePolitica = async (id, data) => {
        try {
            const res = await updatePoliticaRequest(id, data);
            setPoliticas(politicas.map(p => p._id === id ? res.data : p));
        } catch (error) {
            console.error("Error al actualizar política:", error);
        }
    };

    const deletePolitica = async (id) => {
        try {
            await deletePoliticaRequest(id);
            setPoliticas(politicas.filter(p => p._id !== id));
        } catch (error) {
            console.error("Error al eliminar política:", error);
        }
    };

    return (
        <EmpresaFaqContext.Provider value={{
            empresa, getEmpresa, updateEmpresa,
            preguntas, pregunta, getPreguntas, getPreguntaById, createPregunta, updatePregunta, deletePregunta,
            tyc, getTyC, getTyCById, createTyC, updateTyC, deleteTyC,
            politicas, tycDetalle, politicaDetalle, getPoliticas, getPoliticaById, createPolitica, updatePolitica, deletePolitica
        }}>
            {children}
        </EmpresaFaqContext.Provider>
    );
}
