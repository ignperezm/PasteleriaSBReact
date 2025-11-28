import React from "react";
import { Link } from "react-router-dom";

function TarjetaProducto({ producto }) {
  return (
    <div className="tarjeta">
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="info">
        <h4>{producto.nombre}</h4>
        <p className="personas">{producto.personas} Personas</p>
        <Link to={`/detalle/${producto.id}`} className="btn_producto">
          Ver detalles
        </Link>
        <p className="precio">${Number(producto.precio).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default TarjetaProducto;