package com.example.pasteleriaSBReact.model;

import io.swagger.v3.oas.annotations.media.Schema; // IMPORTAMOS PARA SWAGGER
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
@Schema(description = "Swagger persona sistema") // PARA SIMULAR
public class Persona {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Schema(description = "Nombre persona", example = "Juan", requiredMode = Schema.RequiredMode.REQUIRED)
    private String nombre;
    
    @Schema(description = "Edad de la persona", example = "25", minimum = "0", maximum = "99")
    private int edad;
    
}
