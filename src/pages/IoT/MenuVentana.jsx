import React, { useEffect } from 'react';
import { CgAdd, CgInpicture, CgTrash } from "react-icons/cg";
import Swal from 'sweetalert2';
import { useSincronizacion } from "../../context/SincronizacionContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx"; 
import { useNavigate } from 'react-router-dom';

function MenuVentana() {
  const { user } = useAuth();
  const email = user?.email;
  const navigate = useNavigate();

  const {
    sincronizaciones,
    getSincronizaciones,
    addSincronizacion,
    removeSincronizacion,
    loading,
    errors,
    clearErrors,
  } = useSincronizacion();

  useEffect(() => {
    const showErrors = async () => {
      if (errors.length > 0) {
        for (const error of errors) {
          await Swal.fire({
            title: "Error",
            text: error,
            icon: "error",
            confirmButtonText: "Entendido",
          });
        }
        clearErrors();
      }
    };
    showErrors();
  }, [errors, clearErrors]);

  useEffect(() => {
    if (email) {
      getSincronizaciones(email);
    }
  }, [email]);

  const handleAddDevice = () => {
    Swal.fire({
      title: 'Agregar Ventana',
      html: `
        <input id="codigoVentana" class="swal2-input" placeholder="Código de la ventana" />
        <input id="nombreVentana" class="swal2-input" placeholder="Nombre de la ventana" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const codigo = document.getElementById('codigoVentana').value;
        const nombre = document.getElementById('nombreVentana').value;

        if (!codigo || !nombre) {
          Swal.showValidationMessage('Por favor ingresa un código y un nombre');
          return false;
        }
        handleSynchronize(codigo, nombre);
      }
    });
  };

  const handleSynchronize = async (codigo, nombre) => {
    try {
      await addSincronizacion(email, codigo, nombre);
      Swal.fire('Sincronización Exitosa', `Ventana ${nombre} sincronizada con éxito!`, 'success');
      getSincronizaciones(email);
    } catch (error) {
      // Los errores se manejan en el contexto
    }
  };

  const handleIconClick = (codigo) => {
    if (codigo === "VTN1-MR25") {
      navigate("/controlVentana");
    } else if (codigo === "MR24-VTN2") {
      navigate("/controlVentana2");
    } else {
      navigate("/controlVentana");
    }
  };

  if (loading) {
    return <p>Cargando sincronizaciones...</p>;
  }

  return (
    <>
      <style>{`
        .hover-effect {
          transition: transform 0.3s ease;
        }
        .hover-effect:hover {
          transform: translateY(-10px);
          z-index: 10;
        }
      `}</style>
      <div className="container nuevo-apartado">
        <div className="text-end mb-4 card__icon--border-bottom">
          <CgAdd size={35} onClick={handleAddDevice} />
        </div>

        <div className="row row-cols-2">
          {sincronizaciones.length > 0 ? (
            sincronizaciones.map((sincronizacion) => (
              <div key={sincronizacion._id} className="col mb-4">
                <div className="card shadow border-0 hover-effect">
                  <div className="card-body bg__fond_card rounded">
                    <div className="d-flex justify-content-between mb-2">
                      <CgInpicture
                        size={30}
                        onClick={() => handleIconClick(sincronizacion.ventana.codigo)}
                        style={{ cursor: 'pointer' }}
                      />
                      <button
                        className="btn p-0 border-0"
                        onClick={() => removeSincronizacion(email, sincronizacion.ventana.codigo)}
                      >
                        <CgTrash size={30} />
                      </button>
                    </div>
                    <h5 className="card-title mb-1">{sincronizacion.nombre}</h5>
                    <p className="card-text text-muted">Conectado</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No tienes ventanas sincronizadas.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MenuVentana;
