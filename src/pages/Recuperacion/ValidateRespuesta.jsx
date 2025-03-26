// ValidateQuestion.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ValidateQuestion() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { checkAnswer } = useUser();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email, question } = state || {};

  const onSubmit = async (data) => {
    try {
      await checkAnswer(email, data.answer);
      // Si la respuesta es correcta, redirige a la vista de restablecer contraseña pasando el email
      navigate("/restablecer/restablecerContra", { state: { email } });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Respuesta incorrecta",
      });
    }
  };

  if (!email || !question) {
    return <p>No se proporcionó información para verificar el email.</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "8px" }}>
        <h2 className="text-center mb-4 fw-bold">Validar respuesta</h2>
        <div className="mb-3">
          <p className="fw-semibold">Pregunta:</p>
          <p>{question}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="answer" className="form-label fw-semibold">Respuesta:</label>
            <input
              type="text"
              id="answer"
              placeholder="Ingresa tu respuesta"
              className="form-control"
              {...register("answer", { required: "La respuesta es requerida" })}
            />
          </div>
          {errors.answer && (
            <div className="text-center p-2 text-danger mb-3">
              {errors.answer.message}
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
