import React from "react";

function HomeEmpleados() {
  return (
    <div className="container mt-5 flex-grow-1">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <img
            src="https://media.istockphoto.com/id/505365262/es/vector/cajero-mujer-joven-en-el-supermercado.jpg?s=612x612&w=0&k=20&c=c9ZKrVsBFUMPv7cvULysh_r7jB4AvwTzo59a8oMRQQI="
            alt="Empleado"
            className="img-fluid rounded shadow-lg"
            style={{ maxWidth: "500px" }}
          />
          
          <h2 className="mt-3 fw-bold">Bienvenido, empleado</h2>
          <p className="text-muted">
            Aquí puedes gestionar los elementos del sistema de manera eficiente y segura.
          </p>

          <hr className="my-4" />

          <div className="alert alert-info" role="alert">
            Última conexión: <strong>18 de Febrero de 2025</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeEmpleados;
