package com.example.pasteleriaSBReact.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
    private double precio;
    private int stock;
    private String categoria; // Ejemplo: "pastel", "galleta", "postre", etc.
    private String imagenUrl; // URL de la imagen del producto
    
    // Puedes agregar más campos según necesites, como:
    // private boolean disponible;
    // private LocalDate fechaCreacion;
    // private String ingredientes;
    // etc.
}
