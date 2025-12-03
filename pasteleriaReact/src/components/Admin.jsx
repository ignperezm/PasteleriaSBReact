import React, { useState, useEffect } from 'react';
import '../assets/css/estilo.css';
import { loginService } from './loginServicio';
import { productosService } from './productoServicio';
import { getProductos } from '../api_rest.jsx';

function Admin() {
    const [metrics] = useState({
        ventasHoy: { monto: '$840.500', crecimiento: '+12%' },
        productosStock: { total: '16', bajos: '3' },
        pedidosPendientes: { total: '12', urgentes: '2' }
    });

    const [productos, setProductos] = useState([]);
    const [modalActivo, setModalActivo] = useState(null);
    const [formData, setFormData] = useState({});
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const productosCargados = productosService.obtenerMasVendidos();
        setProductos(productosCargados);
    }, []);

    const handleCargarProductos = async () => {
        try {
            const data = await getProductos();
            setAllProducts(data || []);
        } catch (error) {
            console.error('Error cargando productos:', error);
            alert('No se pudieron cargar los productos.');
        }
    };

    const abrirModal = (tipo) => {
        setModalActivo(tipo);
        setFormData({});
    };

    const cerrarModal = () => {
        setModalActivo(null);
        setFormData({});
    };

    const guardar = () => {
        try {
            if (modalActivo === 'usuarios') {
                if (!formData.email || !formData.password) {
                    alert('❌ Completa email y contraseña');
                    return;
                }
                loginService.agregarUsuario(formData.email, formData.password);
                alert('✅ Usuario guardado exitosamente');
            } else if (modalActivo === 'productos') {
                if (!formData.nombre || !formData.precio || !formData.descripcion) {
                    alert('❌ Completa todos los campos');
                    return;
                }
                productosService.agregarProducto({
                    nombre: formData.nombre,
                    precio: formData.precio,
                    descripcion: formData.descripcion
                });
                const productosActualizados = productosService.obtenerMasVendidos();
                setProductos(productosActualizados);
                alert('✅ Producto guardado exitosamente');
            }
            cerrarModal();
        } catch (error) {
            alert(`❌ Error: ${error.message}`);
        }
    };

    const eliminar = () => {
        try {
            if (modalActivo === 'usuarios') {
                if (!formData.email) {
                    alert('❌ Ingresa el email del usuario a eliminar');
                    return;
                }
                if (!window.confirm(`¿Estás seguro de eliminar al usuario ${formData.email}?`)) return;
                loginService.eliminarUsuario(formData.email);
                alert('✅ Usuario eliminado exitosamente');
            } else if (modalActivo === 'productos') {
                if (!formData.nombre) {
                    alert('❌ Ingresa el nombre del producto a eliminar');
                    return;
                }
                if (!window.confirm(`¿Estás seguro de eliminar el producto "${formData.nombre}"?`)) return;
                productosService.eliminarProducto(formData.nombre);
                const productosActualizados = productosService.obtenerMasVendidos();
                setProductos(productosActualizados);
                alert('✅ Producto eliminado exitosamente');
            }
            cerrarModal();
        } catch (error) {
            alert(`❌ Error: ${error.message}`);
        }
    };

    return (
        <main>
            <div className="imgcss-bienvenida">
                <img src="/img/pastel_index_01.jpg" alt="" className="img-bienvenida" />
                <div className="texto-bienvenida">Panel de Administración</div>
            </div>

            <section className="acciones-section">
                <h2>Acciones Administrador ❧</h2>
                <div className="botones-acciones">
                    <button className="btn-admin primary" onClick={() => abrirModal('productos')}>➤ Gestionar Productos</button>
                    <button className="btn-admin warning" onClick={() => abrirModal('usuarios')}>➤ Gestionar Usuarios</button>
                </div>
            </section>

            <section className="dashboard-section">
                <h2>Métricas de negocio ❧</h2>
                <div className="metricas-grid">
                    <div className="metrica-card">
                        <h3>✦ Ventas Hoy</h3>
                        <div className="metrica-valor">{metrics.ventasHoy.monto}</div>
                        <div className="metrica-tendencia positivo">{metrics.ventasHoy.crecimiento}</div>
                    </div>
                    <div className="metrica-card">
                        <h3>✦ Productos en Stock</h3>
                        <div className="metrica-valor">{metrics.productosStock.total}</div>
                        <div className="metrica-alerta">{metrics.productosStock.bajos} bajos</div>
                    </div>
                    <div className="metrica-card">
                        <h3>✦ Pedidos Pendientes</h3>
                        <div className="metrica-valor">{metrics.pedidosPendientes.total}</div>
                        <div className="metrica-urgente">{metrics.pedidosPendientes.urgentes} urgentes</div>
                    </div>
                </div>
            </section>

            <section className="tabla-section">
                <h2>Productos más vendidos ❧</h2>
                <div className="tabla-productos">
                    <div className="tabla-header">
                        <span>Producto</span>
                        <span>Precio</span>
                        <span>Stock</span>
                        <span>Vendidos</span>
                    </div>
                    {productos.map((producto, index) => (
                        <div key={`producto-${index}`} className="tabla-fila">
                            <span>{producto.nombre}</span>
                            <span>${producto.precio.toLocaleString()}</span>
                            <span className={producto.stock < 10 ? 'stock-bajo' : ''}>{producto.stock} unidades</span>
                            <span className="vendidos">{producto.vendidos}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="tabla-section" style={{ padding: '20px', margin: '20px 0', border: '1px solid #ccc', background: '#f9f9f9' }}>
                <h2>Listado General de Productos (desde API) ❧</h2>
                <ul>
                    {allProducts.map((item) => (
                        <li key={item.id}>
                            {item.nombre} - ${item.precio} - {item.descripcion}
                        </li>
                    ))}
                </ul>
                <button onClick={handleCargarProductos} className="btn-admin primary" style={{ marginTop: '10px' }}>Cargar Productos</button>
            </section>

            {modalActivo && (
                <div className="modal-overlay">
                    <div className="modal-admin">
                        <div className="modal-header">
                            <h3>{modalActivo === 'usuarios' ? '➤ Gestión de Usuarios' : '➤ Gestión de Productos'}</h3>
                            <button className="btn-cerrar" onClick={cerrarModal}>✕</button>
                        </div>
                        <div className="modal-body">
                            {modalActivo === 'usuarios' ? (
                                <>
                                    <input type="text" placeholder="Nombre" value={formData.nombre || ''} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                                    <input type="text" placeholder="Apellidos" value={formData.apellidos || ''} onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })} />
                                    <input type="email" placeholder="Email del usuario" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    <input type="password" placeholder="Contraseña" value={formData.password || ''} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                </>
                            ) : (
                                <>
                                    <input type="text" placeholder="Nombre del producto" value={formData.nombre || ''} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                                    <input type="number" placeholder="Precio" value={formData.precio || ''} onChange={(e) => setFormData({ ...formData, precio: e.target.value })} />
                                    <textarea placeholder="Descripción" value={formData.descripcion || ''} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} rows="3" />
                                </>
                            )}
                        </div>
                        <div className="modal-actions">
                            <button className="btn-guardar" onClick={guardar}>💾 Guardar</button>
                            <button className="btn-eliminar" onClick={eliminar}>🗑️ Eliminar</button>
                        </div>
                    </div>
                </div>
            )}

            <section className="texto-final">
                <h2>-ˋˏ ༻❁༺ ˊ-</h2>
            </section>
        </main>
    );
}

export default Admin;