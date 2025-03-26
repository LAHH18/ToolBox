import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isAuthenticated, signin, errors: signinErrors, user } = useAuth();
  
  // Estado para alternar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Primero redirige según el rol
      if (user.rol === 1) {
        navigate('/HomePagePriv');
      } else if (user.rol === 3) {
        navigate('/HomeEmpleados');
      } else {
        navigate('/');
      }
      // Después de redirigir, muestra el toast de bienvenida
      setTimeout(() => {
        Swal.fire({
          title: `¡Bienvenido, ${user.username}!`,
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
          icon: "success"
        });
      }, 100);
    }
  }, [isAuthenticated, navigate, user]);

  // Mostrar errores de autenticación con SweetAlert2
  useEffect(() => {
    if (signinErrors.length > 0) {
      Swal.fire({
        title: "Error de autenticación",
        html: signinErrors.map(error => `<p>${error}</p>`).join(''),
        icon: "error",
        confirmButtonText: "Entendido"
      });
    }
  }, [signinErrors]);

  // Mostrar errores de validación del formulario con SweetAlert2
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorMessages = [];
      
      if (errors.email) {
        errorMessages.push("El correo es requerido");
      }
      
      if (errors.contra) {
        errorMessages.push("La contraseña es requerida");
      }

      if (errorMessages.length > 0) {
        Swal.fire({
          title: "Error en el formulario",
          html: errorMessages.map(msg => `<p>• ${msg}</p>`).join(''),
          icon: "warning",
          confirmButtonText: "Entendido"
        });
      }
    }
  }, [errors]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "8px" }}>
        <h2 className="text-center mb-4 fw-bold">Iniciar Sesión</h2>
        
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Correo:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu usuario"
              {...register("email", { required: true })}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Contraseña:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Ingresa tu contraseña"
                {...register("contra", { required: true })}
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
          
          <button type="submit" className="btn fw-bold boton" style={{ width: "100%" }}>
            Iniciar
          </button>
        </form>
        
        <div className="mt-4 d-flex justify-between">
          <p className="text-decoration-none me-3 text-primary">
            <Link to="/restablecer">¿Has olvidado tu contraseña?</Link>
          </p>
          <p className="text-decoration-none me-3 text-primary">
            <Link to="/register">Registrarse</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;