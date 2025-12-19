package ventas_autos.repository;

import ventas_autos.model.Auto;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AutoRepository extends JpaRepository<Auto, Long> {
    List<Auto> findByClienteId(Long clienteId);
}

