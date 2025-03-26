import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";

function EditFAQ() {
  const { id } = useParams();
  const { getPreguntaById, updatePregunta, pregunta } = useEmpresaFaq();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pregunta: "",
    respuesta: "",
    estado: true,
  });

  useEffect(() => {
    getPreguntaById(id);
  }, [id]);

  useEffect(() => {

    if (pregunta && Object.keys(pregunta).length > 0) {
        setFormData({
            pregunta: pregunta.pregunta || "",
            respuesta: pregunta.respuesta || "",
            estado: pregunta.estado ?? true,
        });
    }
  }, [pregunta]);

  useEffect(() => {
    if (pregunta) {
      setFormData(pregunta);
    }
  }, [pregunta]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePregunta(id, formData);
      Swal.fire("Actualizado", "La pregunta fue actualizada correctamente", "success");
      navigate("/tblFAQ");
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar la pregunta", "error");
    }
  };

  return (
    <div className="container bg-light p-4 rounded mt-5">
      <h2 className="text-center">Editar Pregunta</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label className="form-label">Pregunta:</label>
          <input
            type="text"
            className="form-control"
            name="pregunta"
            value={formData.pregunta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Respuesta:</label>
          <textarea
            className="form-control"
            name="respuesta"
            value={formData.respuesta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="estado"
            checked={formData.estado}
            onChange={handleChange}
          />
            <label className="form-check-label">
              {formData.estado ? "Activo" : "Inactivo"}
            </label>
        </div>
        <button type="submit" className="btn btn-warning">Actualizar</button>
      </form>
    </div>
  );
}

export default EditFAQ;
