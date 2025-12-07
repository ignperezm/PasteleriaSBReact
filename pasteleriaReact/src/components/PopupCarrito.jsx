import React from "react";
import { Link } from "react-router-dom";

function PopupCarrito({ producto, onClose }) {
  //si no hay producto, no hacemos nada para evitar errores graves
  if (!producto) {
    return null;
  }

  //construye la ruta de la imagen solo si existe
  const imageUrl = producto.imagen ? `/img/${producto.imagen.replace("img/", "")}` : null;

  return (
    <div id="popup-carrito" className="popup-oculto" style={{ display: "flex" }}>
      <div className="popup-contenido">
        {/*solo muestra la imagen si la URL fue creada exitosamente*/}
        {imageUrl && (
            <img
              id="popup-imagen"
              src={imageUrl}
              alt={producto.nombre}
            />
        )}
        <h4 id="popup-nombre">{producto.nombre || 'Producto añadido'}</h4>
        {producto.precio && <p id="popup-precio">${Number(producto.precio).toLocaleString("es-CL")} CLP</p>}
        <p>¿Qué deseas hacer?</p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <button className="btn btn-outline-primary" onClick={onClose}>Seguir comprando</button>
          <Link to="/carrito" className="btn btn-success" onClick={onClose}>Ir al carrito</Link>
        </div>
      </div>
    </div>
  );
}

export default PopupCarrito;
