package com.example.pasteleriaSBReact.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pasteleriaSBReact.model.Persona;
import com.example.pasteleriaSBReact.repository.PersonaRepository;
import com.example.pasteleriaSBReact.service.PersonaService; //no se esta usando, borrar?



@RestController
@RequestMapping("/api/personas")
@CrossOrigin(origins = "http://localhost:5173")
public class PersonaController {
    
    @Autowired
    private PersonaService personaService;

    @Autowired
    private PersonaRepository personaRepository;

    @PostMapping("/save")
    public Persona savePersona(@RequestBody Persona per) {
        return personaService.savePersona(per);        
    }

    @GetMapping("/all")
    public List<Persona> getAllPersona() {
        return personaService.getAllPersona();
    }

    @DeleteMapping("/delete/{id}")
    public void deletePersona(@PathVariable Long id){
        personaService.deletePersona(id);
    }
    
    @GetMapping("/find/{id}")
    public Optional<Persona> getPersonaById(@PathVariable Long id) {
        return personaService.getPersonaId(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Persona> 
        putPersonaById(@PathVariable Long id, @RequestBody Persona entity) {
        
        return personaRepository.findById(id)
        .map(personaExiste ->{
            personaExiste.setNombre(entity.getNombre());
            personaExiste.setEdad(entity.getEdad());
            Persona personaUpdate = personaRepository.save(personaExiste);
            return ResponseEntity.ok(personaUpdate);
        }).orElseGet(()-> ResponseEntity.notFound().build());
    }
    
    
}

