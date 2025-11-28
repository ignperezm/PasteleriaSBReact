import React from "react";
import '../assets/css/estilo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Nosotros() {
    return (
        <main className="nosotros-page">
            <section className="nosotros-section">
                <h1>¿Quiénes Somos?</h1>
                
                {/* SECCION SOMOS */}
                <div className="seccion-contenedor">
                    <img src="/img/borde1.png" alt="" className="borde-decorativo izquierda" />
                    <article className="nosotros-articulo">
                        <p>
                            Pastelería Mil Sabores nació hace más de cinco décadas con el sueño de compartir momentos dulces
                            y memorables con cada familia chilena. Desde nuestros inicios en una pequeña cocina de barrio
                            hasta convertirnos en un referente nacional, hemos mantenido intacta nuestra pasión por la
                            repostería artesanal, la calidad de nuestros ingredientes y el cariño en cada preparación.
                        </p>
                        <p>
                            Hoy, celebramos nuestro 50 aniversario con una mirada al futuro. Renovamos nuestra plataforma digital para que
                            nuestros clientes puedan disfrutar de nuestras delicias desde cualquier rincón del país, con opciones personalizadas,
                            beneficios especiales y una experiencia de compra cálida y cercana.
                        </p>
                        <p>
                            Más que una pastelería, somos un espacio de encuentro, tradición y aprendizaje. Apoyamos activamente a
                            estudiantes de gastronomía, compartimos recetas, consejos y promovemos el talento local. Cada compra que haces con nosotros
                            es también un aporte a la formación de nuevos reposteros que sueñan con transformar el mundo, un pastel a la vez.
                        </p>
                        <p>
                            Bienvenidos a Mil Sabores. Donde cada torta tiene una historia, y cada historia merece ser celebrada.
                        </p>
                    </article>
                    <img src="/img/borde1.png" alt="" className="borde-decorativo derecha" />
                </div>
                
                {/* IMAGEN 01 */}
                <div className="imagen-container">
                    <img
                        src="/img/pastelerosnosotros.jpg"
                        alt="Equipo pastelero"
                        className="imagen-nosotros"
                    />
                </div>
                
                {/* SECCION RECORD */}
                <div className="seccion-contenedor">
                    <img src="/img/borde1.png" alt="" className="borde-decorativo izquierda" />
                    <article className="nosotros-articulo">
                        <h2>Nuestro Récord Guinness</h2>
                        <p>
                            En 1995, fuimos parte de un hito histórico: la creación de la torta más grande del mundo, un récord Guinness
                            que no solo nos llenó de orgullo, sino que reafirmó nuestro compromiso con la creatividad y la colaboración
                            comunitaria.
                        </p>
                        <p>
                            Este logro representó meses de planificación, la participación de más de 100 pasteleros voluntarios y el apoyo
                            de toda la comunidad. La torta medía más de 25 metros de largo y utilizamos más de 2,000 kilos de ingredientes
                            de la más alta calidad.
                        </p>
                        <p>
                            Este reconocimiento internacional nos impulsó a seguir innovando y nos recordó que, cuando trabajamos juntos,
                            podemos lograr cosas extraordinarias. Seguimos inspirándonos en este logro para crear experiencias dulces
                            únicas para nuestros clientes.
                        </p>
                    </article>
                    <img src="/img/borde1.png" alt="" className="borde-decorativo derecha" />
                </div>
                
                {/* IMAGEN 02 */}
                <div className="imagen-container">
                    <img
                        src="/img/pastelerosnosotros2.jpg"
                        alt="Celebrando récord Guinness"
                        className="imagen-nosotros"
                    />
                </div>
            </section>
            <section className="texto-final">
                <h2>-ˋˏ ༻❁༺ ˎˊ-</h2>
            </section>
        </main>
    );
}

export default Nosotros;