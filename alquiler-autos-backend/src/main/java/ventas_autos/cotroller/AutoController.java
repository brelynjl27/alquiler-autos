package ventas_autos.cotroller;

import ventas_autos.model.Auto;
import ventas_autos.service.AutoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/autos")
@CrossOrigin(origins = "http://localhost:4200")
public class AutoController {

    private final AutoService autoService;

    public AutoController(AutoService autoService) {
        this.autoService = autoService;
    }

    @GetMapping
    public List<Auto> listar() {
        return autoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Auto obtenerPorId(@PathVariable Long id) {
        return autoService.buscarPorId(id);
    }

    @PostMapping
    public Auto crear(@RequestBody Auto auto) {
        return autoService.guardar(auto);
    }

    @PutMapping("/{id}")
    public Auto actualizar(@PathVariable Long id, @RequestBody Auto auto) {
        return autoService.actualizar(id, auto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        autoService.eliminar(id);
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Auto> listarPorCliente(@PathVariable Long clienteId) {
        return autoService.listarPorCliente(clienteId);
    }
}
    
