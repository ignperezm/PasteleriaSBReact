package com.example.pasteleriaSBReact.repository;

import com.example.pasteleriaSBReact.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
}
