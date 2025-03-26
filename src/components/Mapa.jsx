import React from "react";
import { useEmpresaFaq } from "../context/dtsEmpContext.jsx"; // Importa el contexto de empresa

function Mapa() {
  const { empresa } = useEmpresaFaq(); // Obtén los datos de la empresa

  return (
    <div className="nuevo-apartado p-4">
      <h2 className="mb-3">Encuéntranos</h2>
      <p>Visítanos en nuestra tienda o centro de atención:</p>
      <div style={{ width: "100%", paddingBottom: "30%", position: "relative" }}>
        <iframe
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0, border: "none" }}
          src={`https://maps.google.com/maps?q=${empresa?.ubicacion?.lat},${empresa?.ubicacion?.lon}&z=13&output=embed`}
        />
      </div>
    </div>
  );
}

export default Mapa;