package com.example.pasteleriaSBReact.repository;

import com.example.pasteleriaSBReact.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
    List<Usuario> findByRole_Nombre(String nombre);
}
