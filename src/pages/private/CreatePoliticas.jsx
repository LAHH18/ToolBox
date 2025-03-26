import { useState } from "react";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";

function CreatePoliticas() {
  const { createPolitica, getPoliticas } = useEmpresaFaq();
  const [formData, setFormData] = useState({ contenido: "" });

  const handleChange = (e) => {
    setFormData({ contenido: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.contenido.length < 45) {
      Swal.fire("Error", "El contenido debe tener al menos 45 caracteres.", "error");
      return;
    }

    try {
      await createPolitica(formData);
      Swal.fire("Creado", "La política ha sido agregada correctamente.", "success");
      setFormData({ contenido: "" });
      getPoliticas();
    } catch (error) {
      Swal.fire("Error", "No se pudo crear la política.", "error");
    }
  };  
  
  return (
    <div className="container mt-5">
      <h2 className="text-center">Crear Nueva Política</h2>
      <form onSubmit={handleSubmit} className="p-4 mt-3 bg-light border rounded shadow">
        <div className="mb-3">
          <label className="form-label">Contenido:</label>
          <textarea
            className="form-control"
            name="contenido"
            value={formData.contenido}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn bg__fondo text-white fw-bold">Guardar</button>
      </form>
    </div>
  );
}

export default CreatePoliticas;
