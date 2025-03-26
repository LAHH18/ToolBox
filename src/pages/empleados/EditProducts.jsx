import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import ProductForm from "../../components/ProductsForm.jsx";
import Swal from "sweetalert2";
import { validateProduct } from "../../util/productValidations.js";

function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct, productDetail } = useProducts();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    getProductById(id);
  }, [id]);

  useEffect(() => {
    if (productDetail) {
      setInitialData({
        nombre: productDetail.nombre || "",
        descripcion: productDetail.descripcion || "",
        categoria: productDetail.categoria || "",
        marca: productDetail.marca || "",
        precio: parseFloat(productDetail.precio) || 0,
        stock: parseInt(productDetail.stock, 10) || 0,
        modelo: productDetail.modelo || "",
        estado: productDetail.estado || "",
        dimensiones: {
          ancho: parseInt(productDetail.dimensiones?.ancho, 10) || 0,
          alto: parseInt(productDetail.dimensiones?.alto, 10) || 0,
          peso: parseFloat(productDetail.dimensiones?.peso) || 0.0,
        },
        imagenes: {
          img1: productDetail.imagenes?.img1 || "",
          img2: productDetail.imagenes?.img2 || "",
          img3: productDetail.imagenes?.img3 || "",
          img4: productDetail.imagenes?.img4 || "",
        },
        codigo: productDetail.codigo || "",
      });
    }
  }, [productDetail]);

  const handleSubmit = async (formData) => {
    // Validar el producto antes de enviarlo
    const errors = validateProduct(formData);
    if (Object.keys(errors).length > 0) {
      // Muestra el primer error encontrado (puedes ajustar para mostrar todos)
      Swal.fire("Error de validación", Object.values(errors)[0], "error");
      return;
    }
    try {
      await updateProduct(id, formData);
      Swal.fire("Actualizado", "El producto ha sido actualizado correctamente.", "success");
      navigate("/vwProducts");
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el producto.", "error");
    }
  };

  if (!initialData) return <p className="text-center">Cargando datos...</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg__fondo text-white text-center">
              <h2 className="mb-0">Editar Producto</h2>
            </div>
            <div className="card-body">
              <ProductForm initialData={initialData} onSubmit={handleSubmit} submitLabel="Actualizar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProducts;
