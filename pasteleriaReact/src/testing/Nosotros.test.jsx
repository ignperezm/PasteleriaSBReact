import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Nosotros from "../components/Nosotros";

//TESTING UNICO - NOSOTROS
/////////////////////////////////////////////////////////////////////////////////////////////////////

describe("Testing Nosotros", () => {
  test("TEST: revisa secciones + record", () => {

    render(<Nosotros />);
    
    ///// verifica que exista 1
    const tituloPrincipal = screen.getByText("¿Quiénes Somos?");
    expect(tituloPrincipal).toBeInTheDocument();
    
    ///// verifica que exista 2
    const subtituloRecord = screen.getByText("Nuestro Récord Guinness");
    expect(subtituloRecord).toBeInTheDocument();
    
   ///// verifica fotos visibles
    const imagenPasteleros = screen.getByAltText("Equipo pastelero");
    const imagenRecord = screen.getByAltText("Celebrando récord Guinness");
    
    expect(imagenPasteleros).toBeVisible();
    expect(imagenRecord).toBeVisible();
  });
});