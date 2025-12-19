package ventas_autos.cotroller;

import ventas_autos.model.SolicitudCredito;
import ventas_autos.service.SolicitudCreditoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/solicitud_credito")
public class SolicitudCreditoController {

    private final SolicitudCreditoService solicitudcreditoService;

    public SolicitudCreditoController(SolicitudCreditoService solicitudcreditoService) {
        this.solicitudcreditoService = solicitudcreditoService;
    }

    @GetMapping
    public List<SolicitudCredito> listar() {
        return solicitudcreditoService.listar();
    }

    @GetMapping("/{id}")
    public SolicitudCredito obtener(@PathVariable Long id) {
        return solicitudcreditoService.obtenerPorId(id);
    }

    @PostMapping
    public SolicitudCredito crear(@RequestBody SolicitudCredito solicitudcredito) {
        return solicitudcreditoService.guardar(solicitudcredito);
    }

    @PutMapping("/{id}")
    public SolicitudCredito actualizar(@PathVariable Long id, @RequestBody SolicitudCredito solicitudcredito) {
        solicitudcredito.setId(id);
        return solicitudcreditoService.guardar(solicitudcredito);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        solicitudcreditoService.eliminar(id);
    }
}
