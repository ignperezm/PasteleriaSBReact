import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import BarraNav from "./components/BarraNav.jsx";
import Footer from "./components/Footer.jsx";
import Home from './components/Home.jsx';
import Contacto from './components/Contacto.jsx';
import Blogs from "./components/Blogs.jsx";
import Login from './components/login.jsx';
import Registro from './components/Registro.jsx';
import Nosotros from './components/Nosotros.jsx';
import Productos from './components/Productos.jsx';
import Detalle from './components/Detalle.jsx';
import Admin from './components/Admin.jsx';
import Carrito from './components/Carrito.jsx';
import DesplazarArriba from './components/DesplazarArriba.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <div className="fondo-home">
      <Router>
        <DesplazarArriba />
        <BarraNav />

        <main style={{ marginTop: "80px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/detalle/:id" element={<Detalle />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/nosotros" element={<Nosotros />} />

            <Route 
              path="/admin" 
              element={
                //protege la ruta admin para que solo los admin puedan entrar
                <ProtectedRoute role="ADMIN">
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
