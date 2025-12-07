import React, { useState, useEffect } from 'react';
import '../assets/css/estilo.css';
import { 
    getProductos, saveProducto, updateProducto, deleteProducto, 
    getUsuarios, deleteUsuario, register, updateUsuario 
} from '../api_rest.jsx';

//listas para los seleccionables
const CATEGORIAS = [
  "Tortas Cuadradas", "Tortas Circulares", "Postres individuales", 
  "Productos Sin Azúcar", "Pastelería tradicional", "Productos sin gluten", 
  "Productos Veganos", "Tortas Especiales"
];
const PERSONAS = [10, 15, 20, 25];

function Admin() {
    const [modalActivo, setModalActivo] = useState(null);
    const [formData, setFormData] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const handleCargarDatos = async () => {
        try {
            const [productosData, usuariosData] = await Promise.all([getProductos(), getUsuarios()]);
            setAllProducts(productosData || []);
            setAllUsers(usuariosData || []);
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    };

    useEffect(() => {
        handleCargarDatos();
    }, []);

    const abrirModal = (tipo, data = {}) => {
        setFormData(data);
        setModalActivo(tipo);
    };

    const cerrarModal = () => {
        setModalActivo(null);
        setFormData({});
    };

    const guardar = async () => {
        if (modalActivo === 'productos') {
            await guardarProducto();
        } else if (modalActivo === 'usuarios') {
            await guardarUsuario();
        }
    };

    const eliminar = async () => {
        if (!formData.id) return alert('No hay item seleccionado');
        const confirmar = window.confirm(`¿Seguro que quieres eliminar el item con ID ${formData.id}?`);
        if (!confirmar) return;
        
        try {
            if (modalActivo === 'productos') {
                await deleteProducto(formData.id);
            } else if (modalActivo === 'usuarios') {
                await deleteUsuario(formData.id);
            }
            cerrarModal();
            await handleCargarDatos();
        } catch (error) {
            alert(`Error al eliminar.`);
        }
    };

    const guardarProducto = async () => {
        if (!formData.nombre || !formData.precio || !formData.categoria || !formData.personas) {
            alert('Todos los campos del producto son obligatorios');
            return;
        }
        try {
            if (formData.id) {
                await updateProducto(formData.id, formData);
            } else {
                await saveProducto(formData);
            }
            cerrarModal();
            await handleCargarDatos();
        } catch (error) {
            alert(`Error al guardar producto.`);
        }
    };

    const guardarUsuario = async () => {
        // ... (la logica para guardar usuarios que ya funcionaba)
    };

    return (
        <main>
            {/* ... (el resto del JSX se mantiene igual a la versión que te gustaba) ... */}
            <div className="imgcss-bienvenida"><img src="/img/pastel_index_01.jpg" alt="" className="img-bienvenida" /><div className="texto-bienvenida">Panel de Administración</div></div>
            <section className="acciones-section">
                <h2>Acciones Administrador ❧</h2>
                <div className="botones-acciones" style={{ gridTemplateColumns: '1fr 1fr'}}>
                    <button className="btn-admin primary" onClick={() => abrirModal('productos')}>➤ Gestionar Productos</button>
                    <button className="btn-admin warning" onClick={() => abrirModal('usuarios')}>➤ Gestionar Usuarios</button>
                </div>
            </section>

            <section className="tabla-section"><h2>Gestión de Productos</h2><div className="tabla-productos"><div className="tabla-header"><span>Nombre</span><span>Precio</span><span>Acciones</span></div>{allProducts.map(p => (<div key={p.id} className="tabla-fila"><span>{p.nombre}</span><span>${p.precio}</span><span><button onClick={() => abrirModal('productos', p)}>Editar</button></span></div>))}</div></section>
            <section className="tabla-section"><h2>Gestión de Usuarios</h2><div className="tabla-productos"><div className="tabla-header" style={{gridTemplateColumns: '1fr 1fr 1fr 1fr'}}><span>Email</span><span>Nombre</span><span>Rol</span><span>Acciones</span></div>{allUsers.map(u => (<div key={u.id} className="tabla-fila" style={{gridTemplateColumns: '1fr 1fr 1fr 1fr'}}><span>{u.email}</span><span>{u.nombre}</span><span>{u.role.nombre}</span><span><button onClick={() => abrirModal('usuarios', u)}>Editar</button></span></div>))}</div></section>

            {modalActivo && (
                <div className="modal-overlay">
                    <div className="modal-admin">
                        <div className="modal-header">
                            <h3>{modalActivo === 'productos' ? 'Gestionar Producto' : 'Gestionar Usuario'}</h3>
                            <button className="btn-cerrar" onClick={cerrarModal}>✕</button>
                        </div>
                        <div className="modal-body">
                            {modalActivo === 'productos' ? (
                                <>
                                    <input type="text" placeholder="Nombre del producto" value={formData.nombre || ''} onChange={e => setFormData({...formData, nombre: e.target.value})} />
                                    <input type="number" placeholder="Precio" value={formData.precio || ''} onChange={e => setFormData({...formData, precio: e.target.value})} />
                                    <textarea placeholder="Descripción" value={formData.descripcion || ''} onChange={e => setFormData({...formData, descripcion: e.target.value})} rows="3" />
                                    
                                    <label>Categoría:</label>
                                    <select value={formData.categoria || ''} onChange={e => setFormData({...formData, categoria: e.target.value})}>
                                        <option value="">Selecciona una categoría</option>
                                        {CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>

                                    <label>Personas:</label>
                                    <select value={formData.personas || ''} onChange={e => setFormData({...formData, personas: Number(e.target.value)})}>
                                        <option value="">Selecciona el tamaño</option>
                                        {PERSONAS.map(per => <option key={per} value={per}>{per} personas</option>)}
                                    </select>
                                </>
                            ) : (
                                <>
                                    {/* Mantenemos la lógica de usuarios que funcionaba */}
                                    <input type="text" placeholder="Nombre" value={formData.nombre || ''} onChange={e => setFormData({...formData, nombre: e.target.value})} />
                                    <input type="email" placeholder="Email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} />
                                    {!formData.id && <input type="password" placeholder="Contraseña" onChange={e => setFormData({...formData, password: e.target.value})} />}
                                    <select value={formData.rol || 'USER'} onChange={e => setFormData({...formData, rol: e.target.value})}>
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
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
        </main>
    );
}

export default Admin;
