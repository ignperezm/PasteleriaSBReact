import React from 'react';
import '../assets/css/boleta.css'; 
import { useNavigate } from 'react-router-dom';

function Boleta({ boleta, usuario }) {
  const navigate = useNavigate();

  if (!boleta) {
    return <p>No se ha podido generar la boleta.</p>;
  }

  const handleVolver = () => {
    navigate('/home');
  };

  return (
    <div className="boleta-container">
      <div className="boleta-card">
        <div className="boleta-header">
          <h2>Pastelería Mil Sabores</h2>
          <p>RUT: 76.123.456-7</p>
          <p>Av. Siempre Viva 123, Springfield</p>
        </div>

        <div className="boleta-subheader">
            <h3>Boleta Electrónica</h3>
            <p><strong>N° Boleta:</strong> {boleta.id}</p>
            <p><strong>Fecha:</strong> {new Date(boleta.fecha).toLocaleDateString('es-CL')}</p>
        </div>

        {usuario && (
            <div className="boleta-cliente">
                <h4>Datos del Cliente</h4>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
            </div>
        )}

        <div className="boleta-items">
          <div className="boleta-items-header">
            <span>Producto</span>
            <span>Cantidad</span>
            <span>P. Unit.</span>
            <span>Subtotal</span>
          </div>
          {boleta.items && boleta.items.map(item => (
            <div key={item.id} className="boleta-item-row">
              <span>{item.productoNombre}</span>
              <span>{item.cantidad}</span>
              <span>${item.precioUnitario.toLocaleString('es-CL')}</span>
              <span>${(item.cantidad * item.precioUnitario).toLocaleString('es-CL')}</span>
            </div>
          ))}
        </div>

        <div className="boleta-total">
          <h4>Total: ${boleta.total.toLocaleString('es-CL')}</h4>
        </div>
        
        <div className="boleta-footer">
            <p>¡Gracias por tu compra!</p>
            <button onClick={handleVolver} className="btn-volver">
                Volver al inicio
            </button>
        </div>
      </div>
    </div>
  );
}

export default Boleta;
