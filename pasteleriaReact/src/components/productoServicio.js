import { productos as productosIniciales } from './dataProductos.js';

class ProductoServicio {
  constructor() {
    this.productos = JSON.parse(localStorage.getItem('productos')) || productosIniciales;
  }

  obtenerProductos() {
    return this.productos;
  }

  agregarProducto(productoData) {
    const nuevoProducto = {
      id: Math.max(...this.productos.map(p => p.id), 0) + 1,
      nombre: productoData.nombre,
      precio: parseInt(productoData.precio),
      descripcion: productoData.descripcion,
      imagen: 'img/torta99.png',
      personas: 15,
      categoria: 'General',
      stock: 15,
      vendidos: 0
    };

    this.productos.push(nuevoProducto);
    this.guardarEnLocalStorage();
    return nuevoProducto;
  }

  eliminarProducto(nombre) {
    this.productos = this.productos.filter(p => p.nombre !== nombre);
    this.guardarEnLocalStorage();
  }

  guardarEnLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  obtenerMasVendidos() {
    return this.productos
      .sort((a, b) => b.vendidos - a.vendidos)
      .slice(0, 8);
  }
}

export const productosService = new ProductoServicio();