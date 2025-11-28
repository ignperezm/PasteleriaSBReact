// src/components/Recomendados.jsx
import React from "react";
import { Link } from "react-router-dom";

function Recomendados({ productos, actualId }) {
  const recomendados = [3, 8, 2]
    .filter((id) => id !== Number(actualId))
    .map((id) => productos.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="recomendados">
      <h3>Productos Recomendados</h3>
      <div className="grid">
        {recomendados.map((rec) => (
          <div key={rec.id} className="card">
            <img src={`/img/${rec.imagen.replace("img/", "")}`} alt={rec.nombre} />
            <h4>{rec.nombre}</h4>
            <p>${Number(rec.precio).toLocaleString("es-CL")} CLP</p>
            <Link to={`/detalle/${rec.id}`} className="btn_detalle">Ver Detalles</Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Recomendados;