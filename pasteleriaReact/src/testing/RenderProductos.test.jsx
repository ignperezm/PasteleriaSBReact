import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RenderProductos from "../components/RenderProductos";

afterEach(cleanup);

describe("RenderProductos", () => {
  it("renderiza la lista de productos", () => {
    const productos = [
      { id: 1, nombre: "Torta de Chocolate" },
      { id: 2, nombre: "Torta de Vainilla" },
    ];

    render(
      <MemoryRouter>
        <RenderProductos productos={productos} />
      </MemoryRouter>
    );

    // Verifica que los nombres de los productos estén visibles
    expect(screen.getByText(/torta de chocolate/i)).toBeInTheDocument();
    expect(screen.getByText(/torta de vainilla/i)).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay productos", () => {
    render(
      <MemoryRouter>
        <RenderProductos productos={[]} />
      </MemoryRouter>
    );

    // Verifica que se muestra el mensaje de "No hay productos"
    expect(
      screen.getByText((text) =>
        text.toLowerCase().includes("no hay productos")
      )
    ).toBeInTheDocument();
  });
});