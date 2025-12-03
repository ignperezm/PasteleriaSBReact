package com.example.pasteleriaSBReact.repository;

import com.example.pasteleriaSBReact.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
