import React, { useState, useEffect, useMemo } from "react";
import ProductosFiltros from "../components/FiltroProductos";
import RenderProductos from "../components/RenderProductos";
import { getProductos } from "../api_rest.jsx"; //importamos la funcion de la api

function CatalogoProductos() {
  const [categorias, setCategorias] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [allProducts, setAllProducts] = useState([]); //estado para guardar los productos de la api

  //cuando el componente se carga, llama a la api para obtener los productos
  useEffect(() => {
    const fetchProductos = async () => {
        try {
            const data = await getProductos();
            setAllProducts(data || []);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };

    fetchProductos();
  }, []);

  const handleFiltersChange = ({ categorias, personas }) => {
    setCategorias(categorias);
    setPersonas(personas);
  };

  //la logica de filtrado ahora usa los productos del estado
  const productosFiltrados = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCat = categorias.length === 0 || categorias.includes(p.categoria);
      const matchPer = personas.length === 0 || personas.includes(Number(p.personas));
      return matchCat && matchPer;
    });
  }, [categorias, personas, allProducts]);

  const totalProductos = productosFiltrados.length;

   return (
    <main className="pagina-productos">
      <div className="contenedor">
        <ProductosFiltros
          categoriasSeleccionadas={categorias}
          personasSeleccionadas={personas}
          onChange={handleFiltersChange}
        />

        <section className="catalogo">
          <h2>
            Tortas <span>{totalProductos} productos</span>
          </h2>
          {/*el componente render ahora recibe los productos de la api*/}
          <RenderProductos productos={productosFiltrados} />
        </section>
      </div>
    </main>
  );
}
export default CatalogoProductos;
