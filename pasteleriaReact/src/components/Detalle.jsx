// src/pages/Detalle.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { productos } from "../components/dataProductos";
import ImagenProducto from "../components/ImagenProducto";
import Recomendados from "../components/Recomendados";
import PopupCarrito from "../components/PopupCarrito";
import "../assets/css/detalle.css";

function Detalle() {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const producto = productos.find((p) => p.id === Number(id));

  const agregarAlCarrito = () => {
    if (!producto) return;
    const qty = Math.max(1, Number(cantidad) || 1);
    const raw = localStorage.getItem("carrito");
    const carrito = raw ? JSON.parse(raw) : [];
    const existente = carrito.find((p) => p.id === producto.id);
    if (existente) existente.cantidad += qty;
    else carrito.push({ id: producto.id, cantidad: qty });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    setMostrarPopup(true);
  };

  if (!producto) {
    return (
      <main className="detalle-container">
        <div className="detalle-info">
          <h2>Producto no encontrado</h2>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="detalle-container">
        <div className="detalle-imagen">
          <ImagenProducto src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="detalle-info">
          <h2 id="detalle-nombre">{producto.nombre}</h2>
          <p className="precio" id="detalle-precio">
            ${Number(producto.precio).toLocaleString("es-CL")} CLP
          </p>
          <p className="descripcion" id="detalle-descripcion">{producto.descripcion}</p>

          <div className="acciones">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              min={1}
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <button className="btn_detalle" onClick={agregarAlCarrito}>
              Añadir al Carrito
            </button>
          </div>
        </div>
      </main>

      <Recomendados productos={productos} actualId={id} />

      {mostrarPopup && (
        <PopupCarrito producto={producto} onClose={() => setMostrarPopup(false)} />
      )}
    </>
  );
}

export default Detalle;