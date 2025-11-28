
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Home from "../components/Home";
import { MemoryRouter } from "react-router-dom";

//TESTING NUMERO 1 - HOME
/////////////////////////////////////////////////////////////////////////////////////////////////////
describe("Pruebas de render", () => {
  test("TEST 1: haremos get by text", () => {

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    ///// Dar texto a buscar
    const textoRecord = screen.getByText(/Pastelería ganadora del récord Guinness/i);

    const tituloProductos = screen.getByText(/Productos destacados por nuestros clientes/i);
  
    const tituloLectura = screen.getByText(/Acompaña tus pasteles con algo de lectura/i);
    
    ////// Verificamos
    expect(textoRecord).toBeInTheDocument();
    expect(tituloProductos).toBeVisible();
    expect(tituloLectura).toBeInTheDocument(); //.toBeVisible()
  });
});


//TESTING NUMERO 2 - HOME
/////////////////////////////////////////////////////////////////////////////////////////////////////
test("TEST 2: Checkeo de img + atributos", () => {

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  
  ///// revisa si hay imagenes + descripción
  const imagenesProductos = screen.getAllByAltText(/torta sin azúcar de naranja|tiramisú clásico|cheesecake sin azúcar|tarta de santiago/i);
  expect(imagenesProductos.length).toBe(4);
  
  imagenesProductos.forEach(imagen => {
    expect(imagen).toHaveAttribute("alt");
  });
  
  ///// Verifica los links
  const enlacesProductos = screen.getAllByRole("link", { name: /ir al producto/i });
  expect(enlacesProductos.length).toBe(4);
});


//TESTING NUMERO 3 - HOME
/////////////////////////////////////////////////////////////////////////////////////////////////////
test("TEST 3: links y marcas comerciales", () => {

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  
  ///// Revisa enlace
  const linkNosotros = screen.getByRole("link", { name: /Entérate aquí como ganamos el récord Guinness/i });
  expect(linkNosotros).toBeInTheDocument();
  expect(linkNosotros).toHaveAttribute("href", "/nosotros");
  
  ///// Verifica cant. marcas
   const logosMarcas = screen.getAllByAltText(/marca [0-5]/i); //+mas numero
  expect(logosMarcas.length).toBeGreaterThan(5);
  
  ///// Que se vean
  logosMarcas.forEach(logo => {
    expect(logo).toBeVisible();
  });
});

