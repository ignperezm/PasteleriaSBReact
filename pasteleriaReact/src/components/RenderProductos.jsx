import React from "react";
import TarjetaProducto from "./TarjetaProducto";
import "../assets/css/productos.css";

function RenderProductos({ productos }) {
  if (!productos || productos.length === 0) {
    return <p>No hay productos que coincidan con los filtros.</p>;
  }

  return (
    <div className="productos-container">
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default RenderProductos;