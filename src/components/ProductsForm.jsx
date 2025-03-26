import React, { useState, useEffect } from "react";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget.jsx";

const ProductForm = ({ initialData, onSubmit, submitLabel }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (["precio", "stock"].includes(name)) {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } 
    else if (name.startsWith("dimensiones.")) {
      const dimKey = name.split(".")[1];
      setFormData({
        ...formData,
        dimensiones: { ...formData.dimensiones, [dimKey]: parseFloat(value) || 0 },
      });
    } 
    else if (name.startsWith("imagenes.")) {
      const imgKey = name.split(".")[1];
      setFormData({
        ...formData,
        imagenes: { ...formData.imagenes, [imgKey]: value },
      });
    } 
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (url, imgNumber) => {
    setFormData({
      ...formData,
      imagenes: {
        ...formData.imagenes,
        [`img${imgNumber}`]: url
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderImagePreview = (url) => {
    if (!url) return null;
    return (
      <div className="mt-2">
        <img 
          src={url} 
          alt="Preview" 
          style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "5px" }} 
        />
        <small className="d-block text-muted mt-1">Vista previa</small>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Fila 1: Nombre y Código */}
      <div className="row g-3 mb-3">
        <div className="col-md-8">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <label htmlFor="nombre">Nombre</label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="codigo"
              placeholder="Código"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
            <label htmlFor="codigo">Código</label>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Descripción"
          id="descripcion"
          name="descripcion"
          style={{ height: "100px" }}
          value={formData.descripcion}
          onChange={handleChange}
          required
        ></textarea>
        <label htmlFor="descripcion">Descripción</label>
      </div>

      {/* Fila 2: Categoría y Marca */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <div className="form-floating">
            <select
              className="form-select"
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="Construccion">Construccion</option>
              <option value="Herramientas">Herramientas</option>
              <option value="Electricos">Electricos</option>
              <option value="Jardineria">Jardineria</option>
              <option value="Pinturas">Pinturas</option>
              <option value="Plomeria">Plomeria</option>
            </select>
            <label htmlFor="categoria">Categoría</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <select
              className="form-select"
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una marca</option>
              <option value="Bosch">Bosch</option>
              <option value="Truper">Truper</option>
              <option value="Comex">Comex</option>
              <option value="Metabo">Metabo</option>
              <option value="Makita">Makita</option>
              <option value="Dexter">Dexter</option>
              <option value="Coflex">Coflex</option>
              <option value="Hilti">Hilti</option>
              <option value="Fein">Fein</option>
              <option value="Stihl">Stihl</option>
            </select>
            <label htmlFor="marca">Marca</label>
          </div>
        </div>
      </div>

      {/* Fila 3: Precio y Stock */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="precio"
              placeholder="Precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
            />
            <label htmlFor="precio">Precio</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              id="stock"
              placeholder="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
            <label htmlFor="stock">Stock</label>
          </div>
        </div>
      </div>

      {/* Fila 4: Modelo y Estado */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="modelo"
              placeholder="Modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              required
            />
            <label htmlFor="modelo">Modelo</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <select
              className="form-select"
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            <label htmlFor="estado">Estado</label>
          </div>
        </div>
      </div>

      {/* Dimensiones */}
      <fieldset className="border p-3 mb-3">
        <legend className="w-auto px-2">Dimensiones</legend>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="ancho"
                placeholder="Ancho"
                name="dimensiones.ancho"
                value={formData.dimensiones.ancho}
                onChange={handleChange}
                required
              />
              <label htmlFor="ancho">Ancho (cm)</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="alto"
                placeholder="Alto"
                name="dimensiones.alto"
                value={formData.dimensiones.alto}
                onChange={handleChange}
                required
              />
              <label htmlFor="alto">Alto (cm)</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating">
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="peso"
                placeholder="Peso"
                name="dimensiones.peso"
                value={formData.dimensiones.peso}
                onChange={handleChange}
                required
              />
              <label htmlFor="peso">Peso (g)</label>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Imágenes */}
      <fieldset className="border p-3 mb-3">
        <legend className="w-auto px-2">Imágenes</legend>
        <div className="row g-3">
          {[1, 2, 3, 4].map((imgNum) => (
            <div className="col-md-6" key={imgNum}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id={`img${imgNum}`}
                  placeholder={`Imagen ${imgNum}`}
                  name={`imagenes.img${imgNum}`}
                  value={formData.imagenes[`img${imgNum}`] || ""}
                  onChange={handleChange}
                  required={imgNum === 1}
                />
                <label htmlFor={`img${imgNum}`}>Imagen {imgNum} (URL)</label>
              </div>
              
              <CloudinaryUploadWidget 
                onUploadSuccess={handleImageUpload} 
                imgNumber={imgNum} 
              />
              
              {formData.imagenes[`img${imgNum}`] && (
                <div className="mt-2">
                  <img 
                    src={formData.imagenes[`img${imgNum}`]} 
                    alt={`Preview ${imgNum}`} 
                    style={{ maxWidth: "100%", maxHeight: "150px" }} 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </fieldset>

      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-warning btn-lg" style={{ width: "150px" }}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;