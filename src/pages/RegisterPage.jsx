import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validateRegister } from "../util/registerValidations.js"; // Asegúrate de la ruta correcta

function RegisterPage() {
  const navigate = useNavigate();
  const { signup, isAuthenticated, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/");
      Swal.fire({
        icon: "success",
        title: `¡Bienvenido, ${user.username}!`,
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [isAuthenticated, navigate, user]);

  const onSubmit = async (data) => {
    const validationErrors = validateRegister(data);
    if (Object.keys(validationErrors).length > 0) {
      const errorMessages = Object.values(validationErrors)
        .map((msg) => `<li>${msg}</li>`)
        .join("");
      Swal.fire({
        icon: "error",
        title: "Errores de validación",
        html: `<ul style="text-align: left;">${errorMessages}</ul>`,
      });
      return;
    }
    try {
      await signup(data);
      // La redirección y el toast se manejan en el useEffect
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Error en el registro",
          text: "El correo ya está registrado",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en el registro",
          text: error.response?.data?.message || "No se pudo registrar el usuario.",
        });
      }
    }
  };

  return (
    <div
      className="container mt-5 mb-5 bg-light rounded shadow-lg p-4"
      style={{ maxWidth: "600px" }}
    >
      <h2 className="text-center fw-bold pt-3">Registro de Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {/* Nombres */}
        <div className="mb-3">
          <label htmlFor="nombres" className="form-label">Nombres</label>
          <input
            type="text"
            id="nombres"
            className="form-control"
            placeholder="Ingresa tus nombres"
            {...register("name.nombres")}
          />
        </div>

        {/* Usuario */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Usuario</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Ingresa tu usuario"
            {...register("username")}
          />
        </div>

        {/* Correo Electrónico */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Ingresa tu correo electrónico"
            {...register("email")}
          />
        </div>

        {/* Contraseña */}
        <div className="mb-3">
          <label htmlFor="contra" className="form-label">Contraseña</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="contra"
              className="form-control"
              placeholder="Ingresa tu contraseña"
              {...register("contra")}
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </span>
          </div>
        </div>

        {/* Confirmar Contraseña */}
        <div className="mb-3">
          <label htmlFor="confirmContra" className="form-label">Confirmar Contraseña</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmContra"
              className="form-control"
              placeholder="Confirma tu contraseña"
              {...register("confirmContra")}
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? "Ocultar" : "Mostrar"}
            </span>
          </div>
        </div>

        {/* Pregunta de Seguridad */}
        <div className="mb-3">
          <label htmlFor="pregunta" className="form-label">Pregunta de Seguridad</label>
          <select className="form-select" {...register("pregunta")}>
            <option value="">Selecciona una pregunta</option>
            <option value="¿Cuál es tu color favorito?">¿Cuál es tu color favorito?</option>
            <option value="¿Cuál es el nombre de tu primera mascota?">¿Cuál es el nombre de tu primera mascota?</option>
            <option value="¿Cuál es tu comida favorita?">¿Cuál es tu comida favorita?</option>
          </select>
        </div>

        {/* Respuesta */}
        <div className="mb-3">
          <label htmlFor="respuesta" className="form-label">Respuesta</label>
          <input
            type="text"
            id="respuesta"
            className="form-control"
            placeholder="Ingresa la respuesta"
            {...register("respuesta")}
          />
        </div>

        <button type="submit" className="btn w-100 fw-bold boton">Registrar</button>
      </form>

      <div className="mt-3 text-center">
        <Link to="/login" className="text-decoration-none text-primary">¿Ya tienes cuenta?</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
