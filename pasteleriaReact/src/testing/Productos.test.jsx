import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Productos from "../components/Productos.jsx";

// Mock del servicio de productos
const mockProductos = [
  { id: 1, nombre: "Torta de Chocolate", categoria: "clasica", personas: 8, precio: 10000, imagen: "/img/torta1.png" },
  { id: 2, nombre: "Torta de Vainilla", categoria: "clasica", personas: 10, precio: 12000, imagen: "/img/torta2.png" },
];

vi.mock("../components/productoServicio", () => ({
  productosService: {
    obtenerProductos: vi.fn(() => mockProductos),
  },
}));

// Mock simple de FiltroProductos
vi.mock("../components/FiltroProductos", () => ({
  __esModule: true,
  default: () => <div>Filtros de productos</div>,
}));

describe("Productos", () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    vi.clearAllMocks();
  });

  // Prueba que verifica que se muestran los productos
  it("muestra la lista de productos", async () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    // Verificar que se muestran los productos
    expect(await screen.findByText("Torta de Chocolate")).toBeInTheDocument();
    expect(screen.getByText("Torta de Vainilla")).toBeInTheDocument();
  });

  // Prueba que verifica que se muestra el contador de productos
  it("muestra el contador de productos", async () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    // Verificar que se muestra el contador de productos
    expect(await screen.findByText(/2 productos/i)).toBeInTheDocument();
  });
});
