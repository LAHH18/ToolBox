// passwordValidation.js

// Regex para validar la contraseña: mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial.
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Reglas de validación para el campo "password"
export const passwordValidationRules = {
  required: "La contraseña es requerida.",
  pattern: {
    value: passwordRegex,
    message:
      "La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.",
  },
};

// Función que retorna las reglas de validación para "confirmPassword"
// basándose en el valor actual del campo "password"
export function getConfirmPasswordValidationRules(passwordValue) {
  return {
    required: "Confirmar la contraseña es requerido.",
    validate: (value) =>
      value === passwordValue || "Las contraseñas deben coincidir.",
  };
}
