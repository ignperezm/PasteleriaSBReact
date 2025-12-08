import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductoById, getProductos } from "../api_rest.jsx"; //usamos la api
import ImagenProducto from "../components/ImagenProducto";
import Recomendados from "../components/Recomendados";
import PopupCarrito from "../components/PopupCarrito";
import "../assets/css/detalle.css";

function Detalle() {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [producto, setProducto] = useState(null); //estado para el producto
  const [productos, setProductos] = useState([]); //estado para todos los productos

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await getProductoById(id);
        setProducto(data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
        setProducto(null); //en caso de error, el producto es nulo
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]); //se ejecuta cada vez que el id de la url cambia

  useEffect(() => {
    const fetchAllProductos = async () => {
        try {
            const data = await getProductos();
            setProductos(data || []);
        } catch (error) {
            console.error("Error al cargar todos los productos:", error);
        }
    };
    fetchAllProductos();
  }, []);

  const agregarAlCarrito = () => {
    if (!producto) return;
    const qty = Math.max(1, Number(cantidad) || 1);
    const raw = localStorage.getItem("carrito");
    const carrito = raw ? JSON.parse(raw) : [];
    const existente = carrito.find((p) => p.productoId === producto.id);
    if (existente) {
        existente.cantidad += qty;
    } else {
        carrito.push({ productoId: producto.id, cantidad: qty });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    setMostrarPopup(true);
  };

  if (!producto) {
    return (
      <main className="detalle-container">
        <div className="detalle-info">
          <h2>Producto no encontrado o cargando...</h2>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="detalle-container">
        <div className="detalle-imagen">
          {/*la imagen ahora viene de la api*/}
          <ImagenProducto src={`/img/${producto.imagen}`} alt={producto.nombre} /> 
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

      {/*los productos recomendados tambien se deben cargar de la api*/}
      <Recomendados productos={productos} actualId={id} />

      {mostrarPopup && (
        <PopupCarrito producto={producto} onClose={() => setMostrarPopup(false)} />
      )}
    </>
  );
}

export default Detalle;
