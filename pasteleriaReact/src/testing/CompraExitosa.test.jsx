import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CompraExitosa from "../components/CompraExitosa";

// Mock de react-confetti para evitar errores de canvas
vi.mock("react-confetti", () => ({
  default: () => <div data-testid="confetti" />,
}));

describe("CompraExitosa", () => {
  it("renderiza correctamente los textos", () => {
    render(<CompraExitosa segundos={5} />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/Compra realizada/i)).toBeInTheDocument();
    expect(screen.getByText(/Tu pedido ha sido procesado/i)).toBeInTheDocument();
    expect(screen.getByText(/Serás redirigido al inicio/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Volver ahora/i })).toBeInTheDocument();
  });

  it("ejecuta onFinish al hacer clic en el botón", () => {
    const mockFinish = vi.fn();
    render(<CompraExitosa segundos={5} onFinish={mockFinish} />);

    const boton = screen.getByRole("button", { name: /Volver ahora/i });
    fireEvent.click(boton);

    expect(mockFinish).toHaveBeenCalled();
  });
});

// -----------------------------------------------------------------
describe("CompraExitosa", () => {
  it("ejecuta onFinish automáticamente cuando el contador termina", () => {
    vi.useFakeTimers();
    const mockFinish = vi.fn();

    render(<CompraExitosa segundos={3} onFinish={mockFinish} />);

    // Avanza el tiempo en pasos de 1 segundo para simular el contador
    for (let i = 0; i < 3; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }

    expect(mockFinish).toHaveBeenCalled();
  });
});