import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";

function EditPoliticas() {
  const { id } = useParams();
  const { getPoliticaById, updatePolitica, politicaDetalle } = useEmpresaFaq();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ contenido: "" });

  useEffect(() => {
    getPoliticaById(id);
  }, [id]);

  useEffect(() => {
    if (politicaDetalle) {
      setFormData(politicaDetalle);
    }
  }, [politicaDetalle]);

  const handleChange = (e) => {
    setFormData({ ...formData, contenido: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.contenido.length < 45) {
      Swal.fire("Error", "El contenido debe tener al menos 45 caracteres.", "error");
      return;
    }

    try {
      await updatePolitica(id, formData);
      Swal.fire("Actualizado", "La política ha sido actualizada correctamente.", "success");
      navigate("/tblPoliticas");
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar la política.", "error");
    }
  };

  return (
    <div className="container bg-light p-4 rounded mt-5">
      <h2 className="text-center">Editar Política</h2>
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
        <button type="submit" className="btn btn-warning">Actualizar</button>
      </form>
    </div>
  );
}

export default EditPoliticas;
