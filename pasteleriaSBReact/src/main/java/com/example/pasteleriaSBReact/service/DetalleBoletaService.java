package com.example.pasteleriaSBReact.service;

import com.example.pasteleriaSBReact.model.DetalleBoleta;
import com.example.pasteleriaSBReact.repository.DetalleBoletaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DetalleBoletaService {
    
    @Autowired
    private DetalleBoletaRepository detalleBoletaRepository;

    public DetalleBoleta guardar(DetalleBoleta detalleBoleta) {
        //calculo del subtotal en el backend para seguridad
        int subtotal = detalleBoleta.getPrecioUnitario() * detalleBoleta.getCantidad();
        detalleBoleta.setSubtotal(subtotal);
        return detalleBoletaRepository.save(detalleBoleta);
    }
    
    // ... (resto de metodos)
    public List<DetalleBoleta> obtenerTodos() { return detalleBoletaRepository.findAll(); }
    public DetalleBoleta obtenerPorId(Long id) { return detalleBoletaRepository.findById(id).orElse(null); }
    public DetalleBoleta actualizar(Long id, DetalleBoleta detalleBoleta) { return null; } //no se usa por ahora
    public boolean eliminar(Long id) { 
        if (detalleBoletaRepository.existsById(id)) {
            detalleBoletaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
