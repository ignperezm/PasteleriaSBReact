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

    public List<DetalleBoleta> obtenerTodos() {
        return detalleBoletaRepository.findAll();
    }

    public DetalleBoleta obtenerPorId(Long id) {
        return detalleBoletaRepository.findById(id).orElse(null);
    }

    public DetalleBoleta guardar(DetalleBoleta detalleBoleta) {
        return detalleBoletaRepository.save(detalleBoleta);
    }

    public DetalleBoleta actualizar(Long id, DetalleBoleta detalleBoleta) {
        DetalleBoleta detalleExistente = detalleBoletaRepository.findById(id).orElse(null);
        if (detalleExistente != null) {
            detalleExistente.setBoleta(detalleBoleta.getBoleta());
            detalleExistente.setProducto(detalleBoleta.getProducto());
            detalleExistente.setCantidad(detalleBoleta.getCantidad());
            detalleExistente.setPrecioUnitario(detalleBoleta.getPrecioUnitario());
            detalleExistente.setSubtotal(detalleBoleta.getSubtotal());
            return detalleBoletaRepository.save(detalleExistente);
        }
        return null;
    }

    public boolean eliminar(Long id) {
        if (detalleBoletaRepository.existsById(id)) {
            detalleBoletaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
