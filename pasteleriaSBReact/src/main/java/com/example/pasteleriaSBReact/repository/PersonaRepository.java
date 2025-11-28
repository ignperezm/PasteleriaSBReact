package com.example.pasteleriaSBReact.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pasteleriaSBReact.model.Persona;

public interface PersonaRepository extends JpaRepository<Persona,Long> {
  // hereda los medotos de JpaRepository    
} 