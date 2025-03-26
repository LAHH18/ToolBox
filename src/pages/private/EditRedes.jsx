import React, { useEffect, useState } from "react";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditEmpresaRedes = () => {
  const { empresa, getEmpresa, updateEmpresa } = useEmpresaFaq();
  const navigate = useNavigate();
  const [redes, setRedes] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
  });

  useEffect(() => {
    getEmpresa();
  }, []);

  useEffect(() => {
    if (empresa && empresa.redes) {
      setRedes(empresa.redes);
    }
  }, [empresa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRedes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...empresa, redes };
    try {
      await updateEmpresa(updatedData);
      Swal.fire("¡Éxito!", "Las redes sociales han sido actualizadas.", "success");
    } catch (error) {
      Swal.fire("¡Error!", "No se pudieron actualizar las redes sociales.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mb-4">
        <div className="card-header text-center bg__fond_form text-white">
          <h2 className="fw-bold">Editar Redes Sociales</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="row">
              {["facebook", "twitter", "instagram"].map((network, index) => (
                <div className="col-md-4" key={index}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      {network.charAt(0).toUpperCase() + network.slice(1)}:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name={network}
                      value={redes[network] || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              ))}
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

export default EditEmpresaRedes;
