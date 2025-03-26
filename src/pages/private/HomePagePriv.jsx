import React from 'react';

function HomePagePriv() {
  return (
    <div className="container mt-5 flex-grow-1">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <img
            src="https://img.freepik.com/fotos-premium/presente-imagen-entorno-oficina-minimalista-escritorio-vidrio_958297-8710.jpg"
            alt="Admin"
            className="img-fluid rounded shadow-lg"
            style={{ width: "100%", maxWidth: "500px" }}
          />
          <h2 className="mt-3 fw-bold">Bienvenido al Panel de Administración</h2>
          <p className="text-muted">
            Aquí puedes gestionar los elementos del sistema de manera eficiente y segura.
          </p>
          <hr className="my-4" />
          <div className="alert alert-info mb-4" role="alert">
            Última conexión: <strong>12 de Marzo de 2025</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePagePriv;
