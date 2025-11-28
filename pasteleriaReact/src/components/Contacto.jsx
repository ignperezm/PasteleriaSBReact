
import React, { useState } from "react";
import '../assets/css/estilo.css';
 
function Contacto() {
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        asunto: "",
        mensaje: "",
    });

    // Maneja los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Validación básica del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.correo || !formData.mensaje) {
            alert("Por favor completa todos los campos obligatorios.");
            return;
        }
        alert("Formulario enviado correctamente ✅");
        console.log(formData);
    };

    const handleReset = () => {
        setFormData({
            nombre: "",
            correo: "",
            asunto: "",
            mensaje: "",
        });
    };

    return (
        <section id="formulario">
            <div className="formulario-container">
                <h1>Contacto</h1>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="nombre">Nombre Completo:</label></td>
                                <td colSpan="2">
                                    <input
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="correo">Correo:</label></td>
                                <td colSpan="2">
                                    <input
                                        type="email"
                                        name="correo"
                                        id="correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="asunto">Asunto:</label></td>
                                <td colSpan="2">
                                    <input
                                        type="text"
                                        name="asunto"
                                        id="asunto"
                                        value={formData.asunto}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="mensaje">Mensaje:</label></td>
                                <td colSpan="2">
                                    <textarea
                                        name="mensaje"
                                        id="mensaje"
                                        cols="30"
                                        rows="5"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center" }}>
                                    <input type="submit" value="Enviar Mensaje" className="btn-guardar" />
                                    <input type="reset" value="Limpiar" className="btn-limpiar" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </section>
    );
}

export default Contacto;
