import React, { useEffect, useState } from "react";
import { useEmpresaFaq } from "../../context/dtsEmpContext.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditMyV = () => {
  const { empresa, getEmpresa, updateEmpresa } = useEmpresaFaq();
  const navigate = useNavigate();
  const [myv, setMyv] = useState({
    mision: "",
    imgMision: "",
    vision: "",
    imgVision: "",
  });

  useEffect(() => {
    getEmpresa();
  }, []);

  useEffect(() => {
    if (empresa) {
      setMyv({
        mision: empresa.mision || "",
        imgMision: empresa.imgMision || "",
        vision: empresa.vision || "",
        imgVision: empresa.imgVision || "",
      });
    }
  }, [empresa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyv((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...empresa, ...myv };
    try {
      await updateEmpresa(updatedData);
      Swal.fire("¡Éxito!", "Los datos de Misión y Visión han sido actualizados.", "success");
    } catch (error) {
      Swal.fire("¡Error!", "No se pudieron actualizar los datos.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mb-4">
        <div className="card-header text-center bg__fond_form text-white">
          <h2 className="fw-bold">Editar Misiósn y Visión</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="row">
              {/* Misión */}
              <div className="col-md-6">
                <h5 className="fw-bold">Misión</h5>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Descripción:</label>
                  <textarea
                    className="form-control"
                    name="mision"
                    value={myv.mision}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Imagen URL:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="imgMision"
                    value={myv.imgMision}
                    onChange={handleChange}
                  />
                </div>
                {myv.imgMision && (
                  <img
                    src={myv.imgMision}
                    alt="Misión"
                    className="img-fluid rounded shadow-lg mb-3"
                    style={{ maxHeight: "150px" }}
                  />
                )}
              </div>
              {/* Visión */}
              <div className="col-md-6">
                <h5 className="fw-bold">Visión</h5>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Descripción:</label>
                  <textarea
                    className="form-control"
                    name="vision"
                    value={myv.vision}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Imagen URL:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="imgVision"
                    value={myv.imgVision}
                    onChange={handleChange}
                  />
                </div>
                {myv.imgVision && (
                  <img
                    src={myv.imgVision}
                    alt="Visión"
                    className="img-fluid rounded shadow-lg mb-3"
                    style={{ maxHeight: "150px" }}
                  />
                )}
              </div>
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

export default EditMyV;
