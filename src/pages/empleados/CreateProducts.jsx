import { useProducts } from "../../context/ProductsContext";
import ProductForm from "../../components/ProductsForm";
import { validateProduct } from "../../util/productValidations";
import Swal from "sweetalert2";

function CreateProducts() {
  const { createProduct, getProducts } = useProducts();

  const initialData = {
    nombre: "",
    descripcion: "",
    categoria: "",
    marca: "",
    precio: "",
    stock: "",
    modelo: "",
    estado: "",
    imagenes: { img1: "", img2: "", img3: "", img4: "" },
    codigo: "",
    dimensiones: { ancho: "", alto: "", peso: "" },
  };

  const handleSubmit = async (formData) => {
    const errors = validateProduct(formData);
    if (Object.keys(errors).length > 0) {
      Swal.fire("Error de validación", Object.values(errors)[0], "error");
      return;
    }
    try {
      await createProduct(formData);
      Swal.fire("Creado", "El producto ha sido agregado correctamente.", "success");
      getProducts();
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el producto.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg__fondo text-white text-center">
              <h2 className="mb-0">Agregar Nuevo Producto</h2>
            </div>
            <div className="card-body">
              <ProductForm initialData={initialData} onSubmit={handleSubmit} submitLabel="Guardar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProducts;