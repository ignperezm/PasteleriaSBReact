import '../assets/css/estilo.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main>
  <div className="imgcss-bienvenida">
    <img src="/img/pastel_index_01.jpg" alt="" className="img-bienvenida" />
    <img src="/img/Logo.png" alt="Logo" className="logo-bienvenida" />
    <div className="texto-bienvenida">Pastelería ganadora del récord Guinness.</div>
  </div>

  <div className="franja-marcas">
        <div className="marcas-contenedor">
          <div className="marcas-slide">
            <img src="/img/marca-01.png" alt="Marca 1" className="logo-marca" />
            <img src="/img/marca-02.png" alt="Marca 2" className="logo-marca" />
            <img src="/img/marca-03.png" alt="Marca 3" className="logo-marca" />
            <img src="/img/marca-04.png" alt="Marca 4" className="logo-marca" />
            <img src="/img/marca-05.png" alt="Marca 5" className="logo-marca" />
            <img src="/img/marca-01.png" alt="Marca 1" className="logo-marca" />
            <img src="/img/marca-02.png" alt="Marca 2" className="logo-marca" />
            <img src="/img/marca-03.png" alt="Marca 3" className="logo-marca" />
            <img src="/img/marca-04.png" alt="Marca 4" className="logo-marca" />
            <img src="/img/marca-05.png" alt="Marca 5" className="logo-marca" />
            <img src="/img/marca-01.png" alt="Marca 1" className="logo-marca" />
            <img src="/img/marca-02.png" alt="Marca 2" className="logo-marca" />
            <img src="/img/marca-03.png" alt="Marca 3" className="logo-marca" />
            <img src="/img/marca-04.png" alt="Marca 4" className="logo-marca" />
            <img src="/img/marca-05.png" alt="Marca 5" className="logo-marca" />
            <img src="/img/marca-01.png" alt="Marca 1" className="logo-marca" />
            <img src="/img/marca-02.png" alt="Marca 2" className="logo-marca" />
            <img src="/img/marca-03.png" alt="Marca 3" className="logo-marca" />
            <img src="/img/marca-04.png" alt="Marca 4" className="logo-marca" />
            <img src="/img/marca-05.png" alt="Marca 5" className="logo-marca" />
          </div>
        </div>
      </div>
      {/* Título para los productos en carrusel */}
      <section className="titulo-seccion">
        <h2>Productos destacados por nuestros clientes ❧</h2>
      </section>

      {/* Tarjetas */}
      <section className="container-fluid my-2">
        <div className="row justify-content-center g-5">

          {/* Tarjeta Torta 1 */}
          <div className="col-md-3">
            <div className="card h-100">
              <img
                src="img/torta7.png"
                className="card-img-top"
                alt="Torta Sin Azúcar de Naranja"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Torta Sin Azúcar de Naranja</h5>
                <p className="card-text">
                  Deliciosa torta sabor naranja natural. Perfecta para quienes buscan opciones sin azúcar.
                </p>
                <Link to="/detalle/7" className="btn btn-damasco">Ir al producto</Link>
              </div>
            </div>
          </div>

          {/* Tarjeta Torta 2 */}
          <div className="col-md-3">
            <div className="card h-100">
              <img
                src="img/torta6.png"
                className="card-img-top"
                alt="Tiramisú Clásico"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Tiramisú Clásico</h5>
                <p className="card-text">
                  Exquisito tiramisú tradicional italiano. Capas de café y crema que conquistan el paladar.
                </p>
                <Link to="/detalle/6" className="btn btn-damasco">Ir al producto</Link>
              </div>
            </div>
          </div>

          {/* Tarjeta Torta 3 */}
          <div className="col-md-3">
            <div className="card h-100">
              <img
                src="img/torta8.png"
                className="card-img-top"
                alt="Cheesecake Sin Azúcar"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Cheesecake Sin Azúcar</h5>
                <p className="card-text">
                  Suave cheesecake sin azúcar añadido. Ideal para compartir y disfrutar sin culpa.
                </p>
                <Link to="/detalle/8" className="btn btn-damasco">Ir al producto</Link>
              </div>
            </div>
          </div>

          {/* Tarjeta Torta 4 */}
          <div className="col-md-3">
            <div className="card h-100">
              <img
                src="img/torta10.png"
                className="card-img-top"
                alt="Tarta de Santiago"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Tarta de Santiago</h5>
                <p className="card-text">
                  Tarta tradicional de almendra con un sabor auténtico. Delicia típica de la pastelería española.
                </p>
                <Link to="/detalle/10" className="btn btn-damasco">Ir al producto</Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Título para el carrusel */}
      <section className="titulo-seccion">
        <h2>Acompaña tus pasteles con algo de lectura ❧</h2>
      </section>

      <Link to="/nosotros" className="enlace-salida">
        <div className="imgcss-salida">
          <img src="/img/pastel_index_02.jpg" alt="" className="img-salida" />
          <img src="/img/Logo.png" alt="Logo" className="logo-salida" />
          <div className="texto-salida">Entérate aquí como ganamos el récord Guinness.</div>
        </div>
      </Link>

      <section className="texto-final">
        <h2>-ˋˏ ༻❁༺ ˎˊ-</h2>
      </section>
  
    </main>
  );
}

export default Home;