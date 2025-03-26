import { createContext, useContext, useState } from "react";
import { 
    createProductRequest, 
    getProductsRequest, 
    getProductsCat, 
    getProductRequest, 
    updateProductRequest, 
    deleteProductRequest 
} from "../api/products";

const PrdContext = createContext();

export const useProducts = () => {
    const context = useContext(PrdContext);

    if (!context) {
        throw new Error("useProducts debe usarse dentro de un ProductsProvider");
    }

    return context;
}

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [productDetail, setProductDetail] = useState(null);

    // Obtener todos los productos
    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            setProducts(res.data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    // Obtener productos por categoría
    const getProductsCateg = async (categoria) => {
        try {
            const res = await getProductsCat(categoria);
            setProducts(res.data);
        } catch (error) {
            console.error("Error al obtener productos por categoría:", error);
        }
    };

    // Obtener un producto por ID
    const getProductById = async (id) => {
        try {
            const res = await getProductRequest(id);
            setProductDetail(res.data);
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error);
        }
    };

    // Crear un nuevo producto
    const createProduct = async (productData) => {
        try {
            const res = await createProductRequest(productData);
            setProducts([...products, res.data]);
        } catch (error) {
            console.error("Error al crear el producto:", error);
        }
    };

    // Actualizar un producto por ID
    const updateProduct = async (id, productData) => {
        try {
            const res = await updateProductRequest(id, productData);  
            
            //Actualizar el producto en la lista
            setProducts(products.map(p => (p._id === id ? res.data.updatedProduct : p)));
    
            //También actualizar `productDetail` para reflejar cambios en la vista de edición
            setProductDetail(res.data.updatedProduct);
    
            //Opcional: Volver a obtener la lista de productos para asegurarse de que se reflejan los cambios
            getProducts();
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };

    // Eliminar un producto por ID
    const deleteProduct = async (id) => {
        try {
            await deleteProductRequest(id);
            setProducts(products.filter(p => p._id !== id));
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    return (
        <PrdContext.Provider value={{
            products,
            productDetail,
            getProducts,
            getProductsCateg,
            getProductById,
            createProduct,
            updateProduct,
            deleteProduct
        }}>
            {children}
        </PrdContext.Provider>
    );
}
