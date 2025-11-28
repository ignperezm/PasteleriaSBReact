//filtros para productos
import React from "react";

const CATEGORIAS = [
  "Tortas Cuadradas",
  "Tortas Circulares",
  "Postres individuales",
  "Productos Sin Azúcar",
  "Pastelería tradicional",
  "Productos sin gluten",
  "Productos Veganos",
  "Tortas Especiales",
];

const PERSONAS = [10, 15, 20, 25];

function ProductosFiltros({
  categoriasSeleccionadas,
  personasSeleccionadas,
  onChange,
}) {
  const toggleCategoria = (cat) => {
    const set = new Set(categoriasSeleccionadas);
    set.has(cat) ? set.delete(cat) : set.add(cat);
    onChange({ categorias: Array.from(set), personas: personasSeleccionadas });
  };

  const togglePersonas = (n) => {
    const set = new Set(personasSeleccionadas);
    set.has(n) ? set.delete(n) : set.add(n);
    onChange({ categorias: categoriasSeleccionadas, personas: Array.from(set) });
  };

  return (
    <aside className="filtros">
      <h3>Categorías</h3>
      <ul>
        {CATEGORIAS.map((cat) => (
          <li key={cat}>
            <label>
              <input
                type="checkbox"
                name="categoria"
                value={cat}
                checked={categoriasSeleccionadas.includes(cat)}
                onChange={() => toggleCategoria(cat)}
              />{" "}
              {cat}
            </label>
          </li>
        ))}
      </ul>

      <h3>Cantidad de Personas</h3>
      <ul>
        {PERSONAS.map((n) => (
          <li key={n}>
            <label>
              <input
                type="checkbox"
                name="personas"
                value={n}
                checked={personasSeleccionadas.includes(n)}
                onChange={() => togglePersonas(n)}
              />{" "}
              {n} Personas
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
}
export default ProductosFiltros;