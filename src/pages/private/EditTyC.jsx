import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";

function EditTyC() {
  const { id } = useParams();
  const { getTyCById, updateTyC, tycDetalle } = useEmpresaFaq();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ contenido: "" });

  useEffect(() => {
    getTyCById(id);
  }, [id]);

  useEffect(() => {
    if (tycDetalle) {
      setFormData({ contenido: tycDetalle.contenido });
    }
  }, [tycDetalle]);

  const handleChange = (e) => {
    setFormData({ contenido: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTyC(id, formData);
      Swal.fire("Actualizado", "El TyC ha sido actualizado.", "success");
      navigate("/tblTyC");
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el TyC.", "error");
    }
  };

  return (
    <div className="container bg-light p-4 rounded mt-5">
      <h2 className="text-center">Editar Términos y Condiciones</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
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
        <button type="submit" className="btn btn-warning">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditTyC;
