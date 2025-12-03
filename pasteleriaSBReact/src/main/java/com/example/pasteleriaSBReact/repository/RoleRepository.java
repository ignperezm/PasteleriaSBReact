package com.example.pasteleriaSBReact.repository;

import com.example.pasteleriaSBReact.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByNombre(String nombre);
}
