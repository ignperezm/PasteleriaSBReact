package com.example.pasteleriaSBReact.controller;

import com.example.pasteleriaSBReact.model.Producto;
import com.example.pasteleriaSBReact.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;

    @GetMapping("/all")
    public List<Producto> obtenerTodos() {
        return productoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Producto obtenerPorId(@PathVariable Long id) {
        return productoService.obtenerPorId(id);
    }

    @PostMapping("/save")
    public Producto guardar(@RequestBody Producto producto) {
        return productoService.guardar(producto);
    }

    @PutMapping("/update/{id}")
    public Producto actualizar(@PathVariable Long id, @RequestBody Producto producto) {
        return productoService.actualizar(id, producto);
    }

    @DeleteMapping("/delete/{id}")
    public boolean eliminar(@PathVariable Long id) {
        return productoService.eliminar(id);
    }
}
