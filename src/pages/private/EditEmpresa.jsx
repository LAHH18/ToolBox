import React, { useEffect, useState } from "react";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditEmpresaGenerales = () => {
  const { empresa, getEmpresa, updateEmpresa } = useEmpresaFaq();
  const navigate = useNavigate();
  const [generalData, setGeneralData] = useState({
    nombre: "",
    telefono: "",
  });

  useEffect(() => {
    getEmpresa();
  }, []);

  useEffect(() => {
    if (empresa) {
      setGeneralData({
        nombre: empresa.nombre,
        telefono: empresa.telefono,
      });
    }
  }, [empresa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...empresa, ...generalData };
    try {
      await updateEmpresa(updatedData);
      Swal.fire("¡Éxito!", "Los datos generales han sido actualizados.", "success");
    } catch (error) {
      Swal.fire("¡Error!", "No se pudieron actualizar los datos generales.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mb-4">
        <div className="card-header text-center bg__fond_form text-white">
          <h2 className="fw-bold">Datos Generales</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre de la empresa:</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={generalData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Teléfono:</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={generalData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-warning">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmpresaGenerales;
