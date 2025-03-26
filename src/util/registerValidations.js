/**
 * Valida un objeto "usuario" de registro de acuerdo a las reglas especificadas.
 * @param {Object} user - Objeto con la información del registro.
 * @returns {Object} errors - Objeto con cada campo que presenta error y su mensaje.
 */
export function validateRegister(user) {
    const errors = {};
  
    // Validar "nombres": requerido, mínimo 4 caracteres, sin números ni caracteres especiales.
    if (!user.name || !user.name.nombres || user.name.nombres.trim().length < 4) {
      errors["name.nombres"] = "El nombre debe tener al menos 4 letras.";
    } else if (!/^[A-Za-z\s]+$/.test(user.name.nombres.trim())) {
      errors["name.nombres"] = "El nombre solo puede contener letras y espacios.";
    }
  
    // Validar "usuario": requerido, mínimo 4 caracteres.
    if (!user.username || user.username.trim().length < 4) {
      errors.username = "El usuario debe tener al menos 4 caracteres.";
    }
  
    // Validar "correo": requerido y formato de correo.
    if (!user.email) {
      errors.email = "El correo es requerido.";
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      errors.email = "El correo debe ser válido.";
    }
  
    // Validar "contra": requerido y debe cumplir con el regex.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!user.contra) {
      errors.contra = "La contraseña es requerida.";
    } else if (!passwordRegex.test(user.contra)) {
      errors.contra =
        "La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.";
    }
  
    // Validar "confirmContra": requerido y debe coincidir con "contra".
    if (!user.confirmContra) {
      errors.confirmContra = "Confirmar la contraseña es requerido.";
    } else if (user.contra !== user.confirmContra) {
      errors.confirmContra = "Las contraseñas deben coincidir.";
    }
  
    // Validar "pregunta": requerida.
    if (!user.pregunta) {
      errors.pregunta = "La pregunta de seguridad es requerida.";
    }
  
    // Validar "respuesta": requerida, mínimo 4 caracteres.
    if (!user.respuesta || user.respuesta.trim().length < 4) {
      errors.respuesta = "La respuesta debe tener al menos 4 caracteres.";
    }
  
    return errors;
  }
  