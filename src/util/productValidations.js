/**
 * Valida un objeto "producto" de acuerdo a las reglas especificadas.
 * @param {Object} product - Objeto con la información del producto.
 * @returns {Object} errors - Objeto con las claves de cada campo con error y su mensaje.
 */
export function validateProduct(product) {
  const errors = {};

  // Nombre: mínimo 8 caracteres
  if (!product.nombre || product.nombre.trim().length < 8) {
    errors.nombre = "El nombre debe tener mínimo 8 caracteres.";
  }

  // Código: mínimo 10 caracteres
  if (!product.codigo || product.codigo.trim().length < 10) {
    errors.codigo = "El código debe tener mínimo 10 caracteres.";
  }

  // Descripción: mínimo 20 caracteres
  if (!product.descripcion || product.descripcion.trim().length < 20) {
    errors.descripcion = "La descripción debe tener mínimo 20 caracteres.";
  }

  // Modelo: mínimo 8 caracteres
  if (!product.modelo || product.modelo.trim().length < 8) {
    errors.modelo = "El modelo debe tener mínimo 8 caracteres.";
  }

  // Precio: no puede ser negativo
  if (typeof product.precio !== "number" || product.precio < 0) {
    errors.precio = "El precio no puede ser negativo.";
  }

  // Stock: no puede ser negativo
  if (typeof product.stock !== "number" || product.stock < 0) {
    errors.stock = "El stock no puede ser negativo.";
  }

  // Dimensiones: ancho, alto y peso no pueden ser negativos
  if (product.dimensiones) {
    if (typeof product.dimensiones.ancho === "number" && product.dimensiones.ancho < 0) {
      errors.ancho = "El ancho no puede ser negativo.";
    }
    if (typeof product.dimensiones.alto === "number" && product.dimensiones.alto < 0) {
      errors.alto = "El alto no puede ser negativo.";
    }
    if (typeof product.dimensiones.peso === "number" && product.dimensiones.peso < 0) {
      errors.peso = "El peso no puede ser negativo.";
    }
  }
  // Las URLs de las imágenes no se validan en este caso

  return errors;
}
