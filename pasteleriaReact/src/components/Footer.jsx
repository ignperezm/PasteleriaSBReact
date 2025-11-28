import React from "react";

import '../assets/css/estilo.css';

export default function Footer() {
  return (
    <footer className="footer-social">
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/img/Logo.png" alt="Logo" className="footer-logo" />
          <p>Encuéntranos en nuestras redes sociales:</p>
        </div>
        
        <div className="social-links">
          <a href="https://www.duoc.cl/" aria-label="Facebook">📓</a>
          <a href="https://github.com/ignperezm/pasteleria-react" aria-label="Instagram">🔗</a>
          <a href="/Contacto" aria-label="Twitter">✉</a>
          <a href="https://www.instagram.com/duocuc_sedepadrealonsodeovalle/" aria-label="LinkedIn">📸</a>
        </div>

        {/* Sección del Mapa */}
        <div className="map-section">
          <h3>Visítanos en: Padre Alonso de Ovalle 1586, Santiago ❧</h3>
          <div className="map-line">
          <img src="/img/borde2.png" alt="" className="map-decoration left" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.61143506993!2d-70.65228892423973!3d-33.4428909733379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5b025c7b79d%3A0x4a975a0c83b4b2b2!2sPadre%20Alonso%20de%20Ovalle%201586%2C%208330196%20Santiago%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses-419!2sus!4v1700000000000!5m2!1ses-419!2sus"
            width="1250"
            height="250"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Mil Sabores"
          ></iframe>
          <img src="/img/borde1.png" alt="" className="map-decoration right" />
        </div>
      </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Mil Sabores. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}



