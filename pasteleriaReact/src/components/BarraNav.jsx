import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import '../assets/css/estilo.css';

export default function BarraNav() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({ email: decodedToken.sub });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate("/");
    };

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
                    {user ? (
                        <>
                            <span>{user.email}</span> |
                            <a href="#" onClick={handleLogout} style={{cursor: 'pointer'}}>Cerrar Sesión</a> |
                        </>
                    ) : (
                        <>
                            <a href="/login">Iniciar sesión</a> |
                            <a href="/registro">Registrar usuario</a> |
                        </>
                    )}
                    <a href="/carrito" className="carrito">Carrito</a>
                </div>
            </div>
        </header>
    );
}
