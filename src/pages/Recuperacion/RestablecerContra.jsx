// RestablecerContra.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useUser } from "../../context/UserContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import {
  passwordValidationRules,
  getConfirmPasswordValidationRules,
} from "../../util/passwordValidations.js"; // Ajusta la ruta según corresponda

export default function RestablecerContra() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { updatePassword } = useUser();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state || {};
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await updatePassword(email, data.password);
      Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: "Tu contraseña ha sido actualizada correctamente. Por favor, inicia sesión nuevamente.",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "No se pudo actualizar la contraseña.",
      });
    }
  };

  const onError = (errors) => {
    const errorMessages = Object.values(errors)
      .map((err) => err.message)
      .join("<br/>");
    Swal.fire({
      icon: "error",
      title: "Errores de validación",
      html: errorMessages,
      confirmButtonText: "Aceptar",
    });
  };

  const passwordValue = watch("password");

  if (!email) {
    return <p>No se proporcionó el email para restablecer la contraseña.</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "8px" }}>
        <h2 className="text-center mb-4 fw-bold">Restablecer contraseña</h2>
        <div className="mb-3">
          <p className="fw-semibold">Correo:</p>
          <p>{email}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Nueva contraseña:
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Ingresa tu nueva contraseña"
                className="form-control"
                {...register("password", passwordValidationRules)}
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label fw-semibold">
              Confirmar contraseña:
            </label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirma tu nueva contraseña"
                className="form-control"
                {...register("confirmPassword", getConfirmPasswordValidationRules(passwordValue))}
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
          <button type="submit" className="btn fw-bold boton" style={{ width: "100%" }}>
            Restablecer
          </button>
        </form>
      </div>
    </div>
  );
}
