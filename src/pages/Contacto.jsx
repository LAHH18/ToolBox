import { useEmpresaFaq } from "../context/dtsEmpContext.jsx";
import { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoritosContext.jsx";
import Swal from "sweetalert2";
import Mapa from "../components/Mapa.jsx";

function Contacto() {
  const { empresa, getEmpresa } = useEmpresaFaq();
  const { sendMessage } = useFavorites();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentario, setComentario] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getEmpresa();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!nombre || !correo || !telefono || !comentario) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Primero envía a tu backend
      await sendMessage(nombre, correo, telefono, comentario);

      // Luego envía a Formspree
      const response = await fetch("https://formspree.io/f/xnnpdppn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
          comentario,
          _subject: "Nuevo mensaje de contacto desde ToolBox"
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Mensaje enviado",
          text: "Tu mensaje ha sido enviado correctamente.",
        });

        // Limpiar formulario
        setNombre("");
        setCorreo("");
        setTelefono("");
        setComentario("");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al enviar el formulario a Formspree");
      }
    } catch (error) {
      console.error("Error completo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      {/* Contacto */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="nuevo-apartado mb-4 p-4">
            <h2 className="text-center mb-3">Contacto</h2>
            <form onSubmit={handleSubmit}>
              {["nombre", "correo", "telefono"].map((field) => (
                <div className="mb-3" key={field}>
                  <label htmlFor={field} className="form-label">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    type={field === "correo" ? "email" : "text"}
                    className="form-control"
                    placeholder={`Tu ${field}`}
                    value={eval(field)}
                    onChange={(e) => {
                      const setter = { nombre: setNombre, correo: setCorreo, telefono: setTelefono }[field];
                      setter(e.target.value);
                    }}
                    required
                  />
                </div>
              ))}
              <div className="mb-3">
                <label htmlFor="comentario" className="form-label">Comentario</label>
                <textarea
                  id="comentario"
                  className="form-control"
                  rows="3"
                  placeholder="Escribe tu mensaje"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn bg__fondo text-white w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </form>

            <div className="mt-4 border-top pt-3 text-center">
              <h3>Atención a Clientes</h3>
              <p><strong>Teléfono:</strong> {empresa?.telefono || "No disponible"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="row justify-content-center mt-3">
        <div className="col-12">
          <Mapa />
        </div>
      </div>
    </div>
  );
}

export default Contacto;