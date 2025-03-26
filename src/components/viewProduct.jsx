import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const ViewProduct = () => {
    const images = [
        "https://ferreflex.mx/cdn/shop/products/63372.jpg?v=1709273768&width=750",
        "https://ferreflex.mx/cdn/shop/files/7638.jpg?v=1716848475&width=650",
        "https://ferreflex.mx/cdn/shop/files/62004.jpg?v=1712105450&width=650",
        "https://ferreflex.mx/cdn/shop/files/77243.jpg?v=1712086261&width=750",
        "https://ferreflex.mx/cdn/shop/products/63372.jpg?v=1709273768&width=750"
    ];

    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="container mt-5 producto-detalles">
            <div className="row p-4">
                {/* Galería de imágenes */}
                <div className="col-md-6 border rounded p-2">
                    <div className="row">
                        <div className="col-2">
                            {images.map((img, index) => (
                                <img 
                                    key={index} 
                                    src={img} 
                                    alt={`Imagen ${index + 1}`} 
                                    className="img-thumbnail mb-2" 
                                    onClick={() => setMainImage(img)}
                                    style={{ cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                        <div className="col-10">
                            <img id="mainImage" src={mainImage} className="img-fluid" alt="Imagen seleccionada" />
                        </div>
                    </div>
                </div>
                
                {/* Detalles del producto */}
                <div className="col-md-6">
                    <div>
                        <h3>Nombre del Producto</h3>
                        <p className="precio">$999.99</p>
                        <p><strong>Marca:</strong> Marca Ejemplo</p>
                        <p><strong>Modelo:</strong> Modelo X</p>
                        <p><strong>Peso:</strong> 1.5 kg</p>
                        <p><strong>Tamaño:</strong> 20x10x5 cm</p>
                        <p><strong>Stock:</strong> 20 unidades disponibles</p>
                        <div className="card-buttons d-block">
                            <button className="btn btn-primary me-2" onClick={() => alert('Compra realizada')}>Comprar</button>
                            <button className="btn btn-secondary">Favoritos</button>
                        </div>
                        <div className="mt-4">
                            <h4>Métodos de pago</h4>
                            <ul>
                                <li>Tarjeta de crédito</li>
                                <li>PayPal</li>
                                <li>Transferencia bancaria</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
