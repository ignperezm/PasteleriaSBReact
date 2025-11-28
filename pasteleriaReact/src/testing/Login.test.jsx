import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { BrowserRouter } from 'react-router-dom';
import Login from "../components/Login";
import { loginService } from '../components/loginServicio'

//TESTING NUMERO 1 - LOGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////
describe("Página Login", () => {
  test("TEST 1: render de elementos", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    ///// verifica elementos
    expect(screen.getByPlaceholderText("test@duoc.cl")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("duoc123")).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    
    expect(screen.getByText(/regístrate aquí/i)).toBeInTheDocument();
  });

//TESTING NUMERO 2 - LOGIN CORRECTO
/////////////////////////////////////////////////////////////////////////////////////////////////////
test("TEST 2: verifica que login sea correcto", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  ///// busca por placehodler
  const poneEmail = screen.getByPlaceholderText("test@duoc.cl");
  const ponePass = screen.getByPlaceholderText("duoc123");

  const enviando = screen.getByRole('button', { name: /iniciar sesión/i });

  ///// rellena conc redenciales
  fireEvent.change(poneEmail, { target: { value: "test@duoc.cl" } });
  fireEvent.change(ponePass, { target: { value: "duoc123" } });
  
  ///// dispara click boton
  fireEvent.click(enviando);

  ///// no debe salir error
  const errorMsj = screen.queryByText(/credenciales incorrectas/i);
  expect(errorMsj).not.toBeInTheDocument();
});

//TESTING NUMERO 3 - LOGIN INCORRECTO
/////////////////////////////////////////////////////////////////////////////////////////////////////
test("TEST 3: login que nunca pasó", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  ///// busca por placeholder
  const poneEmail = screen.getByPlaceholderText("test@duoc.cl");
  const ponePass = screen.getByPlaceholderText("duoc123");
  const enviando = screen.getByRole('button', { name: /iniciar sesión/i });

  ///// rellena con cred malas
  fireEvent.change(poneEmail, { target: { value: "usuario@falso.cl" } });
  fireEvent.change(ponePass, { target: { value: "contraseñaMala" } });
  
  ///// dispara click boton
  fireEvent.click(enviando);

  ///// debe salir negativo
  const errorMsj = screen.getByText(/credenciales incorrectas/i); //queryByText (positivo)
  expect(errorMsj).toBeInTheDocument();
});
});
