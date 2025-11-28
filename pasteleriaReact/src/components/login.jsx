import React, { useState } from "react";
import { loginService } from './loginServicio';
import '../assets/css/estilo.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
        setError("Por favor completa todos los campos.");
        return;
    }

    if (loginService.verificarCredenciales(email, password)) {
        ///// DETECTA LOGIN Y USUARIO TIPO
        if (email === "admin@duoc.cl") {
            alert("✅ Bienvenido Administrador");
            navigate("/admin");
          
        } else {
            alert(`✅ Bienvenido ${email}`);
            navigate("/home");
        }
    } else {
        setError("❌ Credenciales incorrectas ❌");
    }
};

    const handleReset = () => {
        setEmail("");
        setPassword("");
        setShowPassword(false);
        setError("");
    };

    return (
        <div className="login-contenedor">
            <img src="/img/borde1.png" alt="" className="borde-decorativo izquierda" />
            <section className="login-section">
                <h1>Iniciar sesión</h1>
                <p className="texto-arriba">
                    ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
                </p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div className="form-group">
                        <label>Correo electrónico:</label>
                        <input
                            type="email"
                            placeholder="test@duoc.cl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña:</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="duoc123"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🚫" : "🧿"}
                            </button>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-guardar">
                            Iniciar sesión
                        </button>
                        <button type="reset" className="btn-limpiar">
                            Limpiar
                        </button>
                    </div>

                    <div className="texto-links">
                        <p><a href="#">¿Olvidó su contraseña?</a></p>
                    </div>
                </form>
            </section>
            <img src="/img/borde1.png" alt="" className="borde-decorativo derecha" />
        </div>
    );
}

export default Login;