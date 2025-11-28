package com.example.pasteleriaSBReact.controller;

import com.example.pasteleriaSBReact.model.Producto;
import com.example.pasteleriaSBReact.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos();
    }

    @PostMapping("/save")
    public Producto saveProducto(@RequestBody Producto producto) {
        return productoService.saveProducto(producto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
    }
    
    @GetMapping("/find/{id}")
    public Optional<Producto> getProductoById(@PathVariable Long id) {
        return productoService.getProductoById(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Producto> updateProducto(
            @PathVariable Long id, 
            @RequestBody Producto productoActualizado) {
        
        return productoService.getProductoById(id)
            .map(producto -> {
                producto.setNombre(productoActualizado.getNombre());
                producto.setDescripcion(productoActualizado.getDescripcion());
                producto.setPrecio(productoActualizado.getPrecio());
                producto.setStock(productoActualizado.getStock());
                producto.setCategoria(productoActualizado.getCategoria());
                producto.setImagenUrl(productoActualizado.getImagenUrl());
                Producto productoUpdate = productoService.saveProducto(producto);
                return ResponseEntity.ok(productoUpdate);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
