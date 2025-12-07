import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api_rest";
import '../assets/css/estilo.css';
import '../assets/css/registro.css';

function Registro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: ''
,        email: ''
,        password: ''
,        confirmPassword: ''
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            //en el backend se asigna el rol de USER por defecto
            await register({ 
                nombre: formData.nombre, 
                email: formData.email, 
                password: formData.password 
            });

            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            navigate("/login");

        } catch (err) {
            console.error("Error en el registro:", err);
            if (err.response && err.response.data) {
                setError(err.response.data.message || "El correo ya está en uso o hubo un error.");
            } else {
                setError("No se pudo conectar con el servidor.");
            }
        }
    };

    return (
        <section id="formulario" className="registro-section">
            <h1>Crear una cuenta</h1>
            <p className="texto-arriba">
                ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
            </p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Correo electrónico:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <input type="submit" value="Registrarse" className="btn-guardar" />
            </form>
        </section>
    );
}

export default Registro;
