import { useState } from "react";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";

function CreateTyC() {
  const { createTyC, getTyC } = useEmpresaFaq();
  const [formData, setFormData] = useState({ contenido: "" });

  const handleChange = (e) => {
    setFormData({ contenido: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚀 Validación de mínimo 45 caracteres
    if (formData.contenido.length < 45) {
      Swal.fire("Error", "El contenido debe tener al menos 45 caracteres.", "error");
      return; // Evita que se envíe el formulario
    }

    try {
      await createTyC(formData);
      Swal.fire("Creado", "El TyC ha sido agregado correctamente.", "success");
      setFormData({ contenido: "" }); 
      getTyC();
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el TyC.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Crear Nuevo Términos y Condiciones</h2>
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

export default CreateTyC;
