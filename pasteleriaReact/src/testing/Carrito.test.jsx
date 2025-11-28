import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Carrito from "../components/Carrito";

afterEach(cleanup);

describe("Carrito", () => {
  it("renderiza carrito vacío", () => {
    localStorage.clear(); // Asegura que no haya productos

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Finalizar compra/i })).toBeDisabled();
  });
});

// ----------------------------------------------------

afterEach(cleanup);

describe("Carrito", () => {
  beforeEach(() => {
    const producto = [
      {
        id: 1,
        nombre: "Torta de Chocolate",
        precio: 5000,
        cantidad: 1,
        imagen: "/img/ejemplo.jpg",
      },
    ];
    localStorage.setItem("carrito", JSON.stringify(producto));
  });

  it("permite eliminar un producto del carrito", () => {
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    // Verifica que el botón "Eliminar" esté presente
    const botonEliminar = screen.getByRole("button", { name: /eliminar/i });
    expect(botonEliminar).toBeInTheDocument();

    // Simula el clic
    fireEvent.click(botonEliminar);

    // Verifica que el botón ya no esté (producto eliminado)
    expect(screen.queryByRole("button", { name: /eliminar/i })).not.toBeInTheDocument();
  });
});