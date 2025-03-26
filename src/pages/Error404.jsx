import React from 'react';

function Error404() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="lead">Lo sentimos, la página que buscas no existe.</p>
        <a href="/" className="btn boton">Volver al inicio</a>
      </div>
    </div>
  );
}

export default Error404;
