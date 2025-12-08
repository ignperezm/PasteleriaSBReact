import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductos, guardarBoleta, guardarDetalleBoleta } from "../api_rest";
import Boleta from './Boleta';
import { jwtDecode } from 'jwt-decode';

const Carrito = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [boletaGenerada, setBoletaGenerada] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
        try {
            setIsLoading(true);
            const productosData = await getProductos();
            setProductos(productosData || []);
            const carritoRaw = localStorage.getItem("carrito");
            setCarrito(carritoRaw ? JSON.parse(carritoRaw) : []);
            
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                setUsuario({ nombre: decodedToken.nombre, email: decodedToken.sub });
            }
        } catch (error) {
            console.error("Error al cargar datos iniciales:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchDatos();
  }, []);

  const getProductoInfo = (id) => productos.find(p => p.id === id);

  const eliminarProducto = (productoId) => {
    const nuevoCarrito = carrito.filter((item) => item.productoId !== productoId);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total = carrito.reduce((acc, item) => {
      const producto = getProductoInfo(item.productoId);
      return acc + ((producto?.precio || 0) * item.cantidad);
  }, 0);

  const finalizarCompra = async () => {
    if (carrito.length === 0) return;
    if (!usuario) { 
        alert("Debes iniciar sesión para comprar.");
        navigate("/login");
        return;
    }

    setMensaje("Procesando compra...");
    try {
        const nuevaBoleta = { fecha: new Date().toISOString(), total: total };
        const boletaGuardada = await guardarBoleta(nuevaBoleta);

        const detallesParaMostrar = [];
        for (const item of carrito) {
            const producto = getProductoInfo(item.productoId);
            if(!producto) continue;

            const nuevoDetalle = { boleta: { id: boletaGuardada.id }, producto: { id: producto.id }, cantidad: item.cantidad, precioUnitario: producto.precio };
            const detalleGuardado = await guardarDetalleBoleta(nuevoDetalle);
            detallesParaMostrar.push({ ...detalleGuardado, productoNombre: producto.nombre });
        }

        setMensaje("¡Gracias por tu compra!");
        setBoletaGenerada({ ...boletaGuardada, items: detallesParaMostrar });
        localStorage.removeItem("carrito");
        setCarrito([]);

    } catch (error) {
        console.error("Error al finalizar la compra:", error);
        setMensaje("Error al procesar la compra. Inténtalo de nuevo.");
    }
  };

  if (isLoading) {
    return <main className="contenedor"><h2>Cargando carrito...</h2></main>;
  }

  return (
    <main className="contenedor" style={{ paddingBottom: "160px" }}>
      {boletaGenerada ? (
        <Boleta boleta={boletaGenerada} usuario={usuario} />
      ) : (
        <section id="carrito-contenido">
            <h2>Resumen de tu compra</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Producto</th>
                        <th>Precio Unitario</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                {carrito.length === 0 ? (
                  <tr><td colSpan="6">Tu carrito está vacío.</td></tr>
                ) : (
                  carrito.map((item) => {
                    const producto = getProductoInfo(item.productoId);
                    if (!producto) return <tr key={item.productoId}><td colSpan="6">Cargando producto...</td></tr>;

                    return (
                      <tr key={item.productoId}>
                        <td><img src={`/img/${producto.imagen}`} alt={producto.nombre} style={{ width: "60px" }}/></td>
                        <td>{producto.nombre}</td>
                        <td>${producto.precio.toLocaleString('es-CL')}</td>
                        <td>{item.cantidad}</td>
                        <td>${(producto.precio * item.cantidad).toLocaleString("es-CL")}</td>
                        <td><button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(item.productoId)}>Eliminar</button></td>
                      </tr>
                    );
                  })
                )}
                </tbody>
            </table>
            <div className="total">
                <h3>Total: <span id="carrito-total">${total.toLocaleString("es-CL")}</span></h3>
                <button className="btn btn-success" disabled={carrito.length === 0} onClick={finalizarCompra}>Finalizar Compra</button>
            </div>
            {mensaje && <div className="alert alert-info mt-4 text-center">{mensaje}</div>}
        </section>
      )}
    </main>
  );
};

export default Carrito;
