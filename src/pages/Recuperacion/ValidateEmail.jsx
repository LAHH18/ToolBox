// ValidateEmail.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ValidateEmail() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { checkEmail } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Llama a checkEmail para obtener la pregunta de seguridad
      const res = await checkEmail(data.email);
      // Redirige a la siguiente vista pasando el email y la pregunta
      navigate("/restablecer/pregunta", { state: { email: data.email, question: res.pregunta } });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "No se pudo verificar el email.",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "8px" }}>
        <h2 className="text-center mb-4 fw-bold">Recuperar contraseña</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Correo:</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              className="form-control"
              {...register("email", { required: "El correo es requerido" })}
            />
          </div>
          {errors.email && (
            <div className="text-center p-2 text-danger mb-3">
              {errors.email.message}
            </div>
          )}
          <button type="submit" className="btn fw-bold boton" style={{ width: "100%" }}>
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
