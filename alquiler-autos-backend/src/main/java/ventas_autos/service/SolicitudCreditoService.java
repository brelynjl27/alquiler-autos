package ventas_autos.service;

import ventas_autos.model.SolicitudCredito;
import ventas_autos.repository.SolicitudCreditoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitudCreditoService {

    private final SolicitudCreditoRepository solicitudcreditoRepository;

    public SolicitudCreditoService(SolicitudCreditoRepository solicitudcreditoRepository) {
        this.solicitudcreditoRepository = solicitudcreditoRepository;
    }

    public List<SolicitudCredito> listar() {
        return solicitudcreditoRepository.findAll();
    }

    public SolicitudCredito obtenerPorId(Long id) {
        return solicitudcreditoRepository.findById(id).orElse(null);
    }

    public SolicitudCredito guardar(SolicitudCredito solicitudCredito) {
        return solicitudcreditoRepository.save(solicitudCredito);
    }

    public void eliminar(Long id) {
        solicitudcreditoRepository.deleteById(id);
    }
}
