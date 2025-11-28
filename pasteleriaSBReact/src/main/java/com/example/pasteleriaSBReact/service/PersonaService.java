package com.example.pasteleriaSBReact.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pasteleriaSBReact.model.Persona;
import com.example.pasteleriaSBReact.repository.PersonaRepository;

@Service
public class PersonaService {
    
    @Autowired
    private PersonaRepository personaRepository;

    public List<Persona> getAllPersona(){
        return personaRepository.findAll();
    }
    // graba y actualiza
    public Persona savePersona(Persona per){
        per.setId(null); // autoincremental
        return personaRepository.save(per);
    }

    public Optional<Persona> getPersonaId(Long id){
        return personaRepository.findById(id);        
    }

    public void deletePersona(Long id){
        personaRepository.deleteById(id);
    }


}
