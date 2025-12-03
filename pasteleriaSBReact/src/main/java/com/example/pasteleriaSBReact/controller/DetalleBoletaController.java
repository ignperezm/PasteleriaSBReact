package com.example.pasteleriaSBReact.controller;

import com.example.pasteleriaSBReact.model.DetalleBoleta;
import com.example.pasteleriaSBReact.service.DetalleBoletaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/detalles-boletas")
@CrossOrigin(origins = "http://localhost:5173")
public class DetalleBoletaController {
    
    @Autowired
    private DetalleBoletaService detalleBoletaService;

    @GetMapping("/all")
    public List<DetalleBoleta> obtenerTodos() {
        return detalleBoletaService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public DetalleBoleta obtenerPorId(@PathVariable Long id) {
        return detalleBoletaService.obtenerPorId(id);
    }

    @PostMapping("/save")
    public DetalleBoleta guardar(@RequestBody DetalleBoleta detalleBoleta) {
        return detalleBoletaService.guardar(detalleBoleta);
    }

    @PutMapping("/update/{id}")
    public DetalleBoleta actualizar(@PathVariable Long id, @RequestBody DetalleBoleta detalleBoleta) {
        return detalleBoletaService.actualizar(id, detalleBoleta);
    }

    @DeleteMapping("/delete/{id}")
    public boolean eliminar(@PathVariable Long id) {
        return detalleBoletaService.eliminar(id);
    }
}
