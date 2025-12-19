package ventas_autos.repository;

import ventas_autos.model.SolicitudCredito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitudCreditoRepository extends JpaRepository <SolicitudCredito, Long>{

    
    List<SolicitudCredito> findByClienteId(Long clienteId);

    List<SolicitudCredito> findByEstado(String estado);

    @Query("SELECT SUM(s.monto) FROM SolicitudCredito s")
    Double sumMontoSolicitudes();

}
