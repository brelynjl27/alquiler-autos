package ventas_autos.repository;


import ventas_autos.model.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository <Cliente, Long> {
    boolean existsByDni(String dni);
    boolean existsByEmail(String email);
}