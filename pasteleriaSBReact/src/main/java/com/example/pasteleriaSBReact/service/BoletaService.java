package com.example.pasteleriaSBReact.service;

import com.example.pasteleriaSBReact.model.Boleta;
import com.example.pasteleriaSBReact.repository.BoletaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BoletaService {
    
    @Autowired
    private BoletaRepository boletaRepository;

    public List<Boleta> obtenerTodas() {
        return boletaRepository.findAll();
    }

    public Boleta obtenerPorId(Long id) {
        return boletaRepository.findById(id).orElse(null);
    }

    public Boleta guardar(Boleta boleta) {
        return boletaRepository.save(boleta);
    }

    public Boleta actualizar(Long id, Boleta boleta) {
        Boleta boletaExistente = boletaRepository.findById(id).orElse(null);
        if (boletaExistente != null) {
            boletaExistente.setFecha(boleta.getFecha());
            boletaExistente.setTotal(boleta.getTotal());
            return boletaRepository.save(boletaExistente);
        }
        return null;
    }

    public boolean eliminar(Long id) {
        if (boletaRepository.existsById(id)) {
            boletaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
