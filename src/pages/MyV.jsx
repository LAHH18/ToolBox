import React, { useEffect } from "react";
import { useEmpresaFaq } from "../context/dtsEmpContext.jsx"; 

const MyV = () => {
  const { empresa, getEmpresa } = useEmpresaFaq();

  useEffect(() => {
    getEmpresa();
  }, []);

  if (!empresa) return <p className="text-center">Cargando datos de la empresa...</p>;

  return (
    <div className="container mt-5">
      {/* 🔹 Sección Visión */}
      <section className="py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src={empresa.imgVision || "https://via.placeholder.com/600"}
              alt="Nuestra Visión"
              className="img-fluid rounded shadow-lg"
            />
          </div>
          <div className="col-md-6">
            <h2 className="text-form1 fw-bold mb-4">Nuestra Visión</h2>
            <p className="lead text-muted">{empresa.vision || "Cargando visión..."}</p>
          </div>
        </div>
      </section>

      {/* 🔹 Sección Misión */}
      <section className="py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="text-form1 fw-bold mb-4">Nuestra Misión</h2>
            <p className="lead text-muted">{empresa.mision || "Cargando misión..."}</p>
          </div>
          <div className="col-md-6">
            <img
              src={empresa.imgMision || "https://via.placeholder.com/600"}
              alt="Nuestra Misión"
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyV;
