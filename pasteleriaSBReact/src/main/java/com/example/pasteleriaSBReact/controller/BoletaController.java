package com.example.pasteleriaSBReact.controller;

import com.example.pasteleriaSBReact.model.Boleta;
import com.example.pasteleriaSBReact.model.Usuario;
import com.example.pasteleriaSBReact.repository.UsuarioRepository;
import com.example.pasteleriaSBReact.service.BoletaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/boletas")
@CrossOrigin(origins = "http://localhost:5173")
public class BoletaController {
    
    @Autowired
    private BoletaService boletaService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/all")
    public List<Boleta> obtenerTodas() {
        return boletaService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public Boleta obtenerPorId(@PathVariable Long id) {
        return boletaService.obtenerPorId(id);
    }

    @PostMapping("/save")
    public Boleta guardar(@RequestBody Boleta boleta, java.security.Principal principal) {
        if (principal != null) {
            String email = principal.getName();
            Usuario u = usuarioRepository.findByEmail(email);
            boleta.setUsuario(u);
        }
        return boletaService.guardar(boleta);
    }

    @PutMapping("/update/{id}")
    public Boleta actualizar(@PathVariable Long id, @RequestBody Boleta boleta) {
        return boletaService.actualizar(id, boleta);
    }

    @DeleteMapping("/delete/{id}")
    public boolean eliminar(@PathVariable Long id) {
        return boletaService.eliminar(id);
    }
}
