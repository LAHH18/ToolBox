import React, { useEffect, useState } from "react";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditUbicacion = () => {
  const { empresa, getEmpresa, updateEmpresa } = useEmpresaFaq();
  const navigate = useNavigate();

  const [ubicacion, setUbicacion] = useState({
    calle: "",
    colonia: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    lat: "",
    lon: "",
  });

  useEffect(() => {
    getEmpresa();
  }, []);

  useEffect(() => {
    if (empresa && empresa.ubicacion) {
      setUbicacion(empresa.ubicacion);
    }
  }, [empresa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUbicacion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...empresa, ubicacion };
    try {
      await updateEmpresa(updatedData);
      Swal.fire("¡Éxito!", "La ubicación ha sido actualizada.", "success");
    } catch (error) {
      Swal.fire("¡Error!", "No se pudo actualizar la ubicación.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mb-4">
        <div className="card-header text-center bg__fond_form text-white">
          <h2 className="fw-bold">Editar Ubicación</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="row">
              {["calle", "colonia", "ciudad", "estado", "codigoPostal", "lat", "lon"].map((field, index) => (
                <div
                  className={`col-md-${field === "codigoPostal" || field === "lat" || field === "lon" ? "4" : "6"}`}
                  key={index}
                >
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <input
                      type={field === "lat" || field === "lon" ? "number" : "text"}
                      className="form-control"
                      name={field}
                      value={ubicacion[field] || ""}
                      onChange={handleChange}
                      required
                      step="any"
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

export default EditUbicacion;
