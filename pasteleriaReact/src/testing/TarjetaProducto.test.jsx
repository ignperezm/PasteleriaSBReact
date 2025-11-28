import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";

describe("TarjetaProducto", () => {
  it("muestra los datos del producto", () => {
    const producto = {
      id: 1,
      nombre: "Torta de Chocolate",
      personas: 8,
      precio: 10000,
      imagen: "/img/ejemplo.jpg"
    };

    render(
      <MemoryRouter>
        <TarjetaProducto producto={producto} />
      </MemoryRouter>
    );
    
    // Verificar que se muestran los datos del producto
    expect(screen.getByText("Torta de Chocolate")).toBeInTheDocument();
    expect(screen.getByText(/8\s+Personas/)).toBeInTheDocument();
    
    // Verificar el formato del precio (puede incluir puntos o comas según el formato)
    const precioElement = screen.getByText(/\$\s*10[.,]?000/);
    expect(precioElement).toBeInTheDocument();
    
    // Verificar el enlace de detalles
    const enlace = screen.getByRole('link', { name: /ver detalles/i });
    expect(enlace).toHaveAttribute("href", "/detalle/1");
  });
});
