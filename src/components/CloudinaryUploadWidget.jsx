import React, { useEffect, useRef } from 'react';

const CloudinaryUploadWidget = ({ onUploadSuccess, imgNumber }) => {
  // useRef para poder usar el widget en el botón
  const widgetRef = useRef(null);

  useEffect(() => {
    // Verifica que la librería se haya cargado
    if (!window.cloudinary) {
      console.error('Cloudinary no está disponible. ¿Incluiste el script en index.html?');
      return;
    }

    // Crea el widget
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dr29apyqc',
        uploadPreset: 'toolbox_productos_dev',
        multiple: false,
        // Si tu preset es "unsigned", a veces hace falta agregar:
        // unsigned: true,
        // ...otras configuraciones si deseas
      },
      (error, result) => {
        if (error) {
          console.error('Error en upload:', error);
          return;
        }
        // Cuando se sube exitosamente
        if (result.event === 'success') {
          onUploadSuccess(result.info.secure_url, imgNumber);
        }
      }
    );
  }, [onUploadSuccess, imgNumber]);

  // Al hacer clic en el botón, abrimos el widget
  const handleClick = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      alert('El sistema de carga no está disponible. Recarga la página.');
    }
  };

  return (
    <button 
      type="button" 
      className="btn btn-outline-primary mt-2"
      onClick={handleClick}
    >
      Subir Imagen {imgNumber}
    </button>
  );
};

export default CloudinaryUploadWidget;
