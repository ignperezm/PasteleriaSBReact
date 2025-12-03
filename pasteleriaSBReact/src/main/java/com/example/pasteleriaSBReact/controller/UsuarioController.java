package com.example.pasteleriaSBReact.controller;

import com.example.pasteleriaSBReact.model.Usuario;
import com.example.pasteleriaSBReact.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/all")
    public List<Usuario> obtenerTodos() {
        return usuarioService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Usuario obtenerPorId(@PathVariable Long id) {
        return usuarioService.obtenerPorId(id);
    }

    @GetMapping("/email/{email}")
    public Usuario obtenerPorEmail(@PathVariable String email) {
        return usuarioService.obtenerPorEmail(email);
    }

    @PostMapping("/save")
    public Usuario guardar(@RequestBody Usuario usuario) {
        return usuarioService.guardar(usuario);
    }

    @PutMapping("/update/{id}")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.actualizar(id, usuario);
    }

    @DeleteMapping("/delete/{id}")
    public boolean eliminar(@PathVariable Long id) {
        return usuarioService.eliminar(id);
    }
}
