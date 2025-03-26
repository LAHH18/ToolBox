import React, { useState } from "react";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";

function CreatFAQ() {
  const { createPregunta } = useEmpresaFaq();
  const [formData, setFormData] = useState({
    pregunta: "",
    respuesta: "",
    estado: true,
  });

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
      await createPregunta(formData);
      Swal.fire("Creado", "La pregunta fue agregada correctamente", "success");

      setFormData({
        pregunta: "",
        respuesta: "",
        estado: true,
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo crear la pregunta", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Crear Nueva Pregunta</h2>
      <form onSubmit={handleSubmit} className="p-4 mt-3 border rounded bg-light shadow">
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
          <label className="form-check-label">Activo</label>
        </div>
        <button type="submit" className="btn bg__fondo text-white fw-bold">Guardar</button>
      </form>
    </div>
  );
}

export default CreatFAQ;
