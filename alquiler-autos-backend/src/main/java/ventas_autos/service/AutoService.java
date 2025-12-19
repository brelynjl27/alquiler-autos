package ventas_autos.service;

import ventas_autos.model.Auto;
import ventas_autos.model.Cliente;
import ventas_autos.repository.AutoRepository;
import ventas_autos.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class AutoService {

    private final AutoRepository autoRepository;
    private final ClienteRepository clienteRepository;

    public AutoService(AutoRepository autoRepository, ClienteRepository clienteRepository) {
        this.autoRepository = autoRepository;
        this.clienteRepository = clienteRepository;
    }

    public List<Auto> listarTodos() {
        return autoRepository.findAll();
    }

    public Auto buscarPorId(Long id) {
        return autoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Auto no encontrado"));
    }

    public Auto guardar(Auto auto) {
        if (auto.getCliente() != null && auto.getCliente().getId() != null) {
            Cliente cliente = clienteRepository.findById(auto.getCliente().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));
            auto.setCliente(cliente);
        }
        return autoRepository.save(auto);
    }

    public Auto actualizar(Long id, Auto auto) {
        Auto existente = buscarPorId(id);
        existente.setMarca(auto.getMarca());
        existente.setModelo(auto.getModelo());
        existente.setPlaca(auto.getPlaca());
        existente.setPrecio(auto.getPrecio());

        if (auto.getCliente() != null && auto.getCliente().getId() != null) {
            Cliente cliente = clienteRepository.findById(auto.getCliente().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));
            existente.setCliente(cliente);
        } else {
            existente.setCliente(null);
        }

        return autoRepository.save(existente);
    }

    public void eliminar(Long id) {
        autoRepository.deleteById(id);
    }

    public List<Auto> listarPorCliente(Long clienteId) {
        return autoRepository.findByClienteId(clienteId);
    }
   
}
