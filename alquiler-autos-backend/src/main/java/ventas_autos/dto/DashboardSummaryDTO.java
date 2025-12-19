package ventas_autos.dto;

public class DashboardSummaryDTO {

    private long totalClientes;
    private long totalAutos;
    private long totalSolicitudes;
    private double totalMontoSolicitudes;

    public DashboardSummaryDTO() {
    }

    public DashboardSummaryDTO(long totalClientes, long totalAutos, long totalSolicitudes, double totalMontoSolicitudes) {
        this.totalClientes = totalClientes;
        this.totalAutos = totalAutos;
        this.totalSolicitudes = totalSolicitudes;
        this.totalMontoSolicitudes = totalMontoSolicitudes;
    }

    public long getTotalClientes() {
        return totalClientes;
    }

    public void setTotalClientes(long totalClientes) {
        this.totalClientes = totalClientes;
    }

    public long getTotalAutos() {
        return totalAutos;
    }

    public void setTotalAutos(long totalAutos) {
        this.totalAutos = totalAutos;
    }

    public long getTotalSolicitudes() {
        return totalSolicitudes;
    }

    public void setTotalSolicitudes(long totalSolicitudes) {
        this.totalSolicitudes = totalSolicitudes;
    }

    public double getTotalMontoSolicitudes() {
        return totalMontoSolicitudes;
    }

    public void setTotalMontoSolicitudes(double totalMontoSolicitudes) {
        this.totalMontoSolicitudes = totalMontoSolicitudes;
    }
}