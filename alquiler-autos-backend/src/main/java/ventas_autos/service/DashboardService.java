package ventas_autos.service;

import ventas_autos.dto.DashboardSummaryDTO;
import ventas_autos.repository.AutoRepository;
import ventas_autos.repository.ClienteRepository;
import ventas_autos.repository.SolicitudCreditoRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ClienteRepository clienteRepository;
    private final AutoRepository autoRepository;
    private final SolicitudCreditoRepository solicitudCreditoRepository;

    public DashboardService(ClienteRepository clienteRepository,
                            AutoRepository autoRepository,
                            SolicitudCreditoRepository solicitudCreditoRepository) {
        this.clienteRepository = clienteRepository;
        this.autoRepository = autoRepository;
        this.solicitudCreditoRepository = solicitudCreditoRepository;
    }

    public DashboardSummaryDTO getDashboardSummary() {
        long totalClientes = clienteRepository.count();
        long totalAutos = autoRepository.count();
        long totalSolicitudes = solicitudCreditoRepository.count();

        // Suponiendo que SolicitudCredito tiene un atributo 'monto'
        Double totalMontoSolicitudes = solicitudCreditoRepository.sumMontoSolicitudes();
        if (totalMontoSolicitudes == null) {
            totalMontoSolicitudes = 0.0;
        }

        return new DashboardSummaryDTO(
                totalClientes,
                totalAutos,
                totalSolicitudes,
                totalMontoSolicitudes
        );
    }
}