// src/components/Carrito.jsx
import React, { useEffect, useState } from "react";
import { productos } from "./dataProductos";
import { Link, useNavigate } from "react-router-dom";
import CompraExitosa from "./CompraExitosa";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [mensajeCompra, setMensajeCompra] = useState("");
  const [mostrarExito, setMostrarExito] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("carrito");
    const data = raw ? JSON.parse(raw) : [];
    setCarrito(data);
  }, []);

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const calcularSubtotal = (id, cantidad) => {
    const producto = productos.find((p) => p.id === id);
    return producto ? producto.precio * cantidad : 0;
  };

  const total = carrito.reduce(
    (acc, item) => acc + calcularSubtotal(item.id, item.cantidad),
    0
  );

  const finalizarCompra = () => {
    setMensajeCompra("¡Gracias por tu compra! Tu pedido ha sido procesado.");
    localStorage.removeItem("carrito");
    setCarrito([]);
    setMostrarExito(true);
  };

  return (
    <main className="contenedor" style={{ paddingBottom: "160px" }}>
      <section id="carrito-contenido">
        <h2>Resumen de tu compra</h2>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {carrito.length === 0 ? (
              <tr>
                <td colSpan="6">Tu carrito está vacío.</td>
              </tr>
            ) : (
              carrito.map((item) => {
                const producto = productos.find((p) => p.id === item.id);
                if (!producto) return null;
                return (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio.toLocaleString("es-CL")}</td>
                    <td>{item.cantidad}</td>
                    <td>
                      ${calcularSubtotal(item.id, item.cantidad).toLocaleString("es-CL")}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarProducto(item.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="total">
          <h3>Total: <span id="carrito-total">${total.toLocaleString("es-CL")}</span></h3>
          <button
            className="btn btn-success"
            disabled={carrito.length === 0}
            onClick={finalizarCompra}
          >
            Finalizar Compra
          </button>
        </div>

        {mensajeCompra && (
          <div className="alert alert-success mt-4 text-center" role="alert">
            {mensajeCompra}
          </div>
        )}
        {mostrarExito && (
          <CompraExitosa onFinish={() => navigate("/")} />
        )}
      </section>
    </main>
  );
};

export default Carrito;