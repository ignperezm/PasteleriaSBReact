import React from "react";

import '../assets/css/estilo.css';

export default function BarraNav() {
  return (
    <header>
            <div className="top-bar">
                <div>
                    <a href="/" className="logo-link">
                    <img src="/img/Logo.png" />
                    </a>
                </div>
                <nav>
                    <a href="/">Home</a>
                    <a href="/productos">Productos</a>
                    <a href="/nosotros">Nosotros</a>
                    <a href="/blogs">Blogs</a>
                    <a href="/contacto">Contacto</a>
                </nav>
                <div className="acciones">
                    <a href="/login">Iniciar sesión</a> |
                    <a href="/registro">Registrar usuario</a> |
                    <a href="/carrito" className="carrito">Carrito</a>
                </div>
            </div>
        </header>
  );
}



