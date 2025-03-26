import axios from './axios'

export const getProductsRequest = () => axios.get('/products');

export const getProductRequest = (id) => axios.get(`/product/${id}`);

export const createProductRequest = (products) => axios.post(`/productsCre`,products);

export const updateProductRequest = (id, productData) => axios.put(`/productsUpd/${id}`, productData);

export const deleteProductRequest = (id) => axios.delete(`/productsDel/${id}`);

export const getProductsCat = (categoria) => axios.get(`/categoria/${categoria}`);
