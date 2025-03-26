import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useUser } from "../context/UserContext.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, setUser, isAuthenticated } = useAuth(); // Se asume que user y isAuthenticated vienen de AuthContext
  const { updateProfile } = useUser(); // Obtén la función para actualizar perfil
  const [formData, setFormData] = useState({
    nombre: "",
    apellidopaterno: "",
    apellidomaterno: "",
    telefono: "",
    direccion: "",
    ciudad: "",
  });
  const navigate = useNavigate(); // hook para la redirección

  // Al cargar el componente, se inicializa el estado con los datos del usuario
  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.name?.nombres || "",
        apellidopaterno: user.name?.apellidopaterno || "",
        apellidomaterno: user.name?.apellidomaterno || "",
        telefono: user.telefono || "",
        direccion: user.direccion || "",
        ciudad: user.ciudad || "",
      });
    }
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Transforma el formData si es necesario (por ejemplo, para encajar en la estructura de 'name')
      const userData = {
        name: {
          nombres: formData.nombre,
          apellidopaterno: formData.apellidopaterno,
          apellidomaterno: formData.apellidomaterno,
        },
        telefono: formData.telefono,
        direccion: formData.direccion,
        ciudad: formData.ciudad,
      };
  
      const updatedUser = await updateProfile(user.email, userData);
      setUser(updatedUser); // Actualiza el estado global
      Swal.fire({
        icon: "success",
        title: "Perfil actualizado",
        text: "Tu perfil ha sido actualizado correctamente.",
      });

      // Redirección condicional
      if (isAuthenticated) {
        if (user.rol === 1) {
          navigate("/HomePagePriv"); // Redirige al home privado para rol 1
        } else if (user.rol === 3) {
          navigate("/HomeEmpleados"); // Redirige al home de empleados para rol 3
        } else {
          navigate("/"); // Redirige al home público si el rol no es 1 ni 3
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el perfil. Intenta nuevamente.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mb-4 col-md-6 mx-auto">
        <div className="card-header text-center bg__fond_form text-white">
          <h2 className="fw-bold">Perfil de Usuario</h2>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {[ 
              { label: "Nombre", name: "nombre" },
              { label: "Apellido Paterno", name: "apellidopaterno" },
              { label: "Apellido Materno", name: "apellidomaterno" },
              { label: "Teléfono", name: "telefono", type: "tel" },
              { label: "Dirección", name: "direccion" },
              { label: "Ciudad", name: "ciudad" },
            ].map(({ label, name, type = "text" }) => (
              <div className="mb-3" key={name}>
                <label htmlFor={name} className="form-label fw-semibold">
                  {label}:
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  className="form-control"
                  value={formData[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-warning">
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
