package com.rutaexpress.bff.service;

import com.rutaexpress.bff.config.TokenRelayInterceptor;
import com.rutaexpress.contracts.ApiPaths;
import com.rutaexpress.contracts.dto.AuditEntryDto;
import com.rutaexpress.contracts.dto.FleetCapacityDto;
import com.rutaexpress.contracts.dto.KpiReportDto;
import com.rutaexpress.contracts.dto.NotificationDto;
import com.rutaexpress.contracts.dto.ServiceTypeDto;
import com.rutaexpress.contracts.dto.ShipmentRequest;
import com.rutaexpress.contracts.dto.ShipmentResponse;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class BffService {

    private final RestClient shipmentsClient;
    private final RestClient catalogClient;
    private final RestClient notifyClient;
    private final RestClient auditClient;
    private final RestClient reportClient;

    public BffService(
            @Value("${rutaexpress.shipments-url:http://localhost:8081}") String shipmentsUrl,
            @Value("${rutaexpress.catalog-url:http://localhost:8082}") String catalogUrl,
            @Value("${rutaexpress.notify-url:http://localhost:8083}") String notifyUrl,
            @Value("${rutaexpress.audit-url:http://localhost:8085}") String auditUrl,
            @Value("${rutaexpress.report-url:http://localhost:8084}") String reportUrl,
            TokenRelayInterceptor tokenRelay) {
        this.shipmentsClient = RestClient.builder().baseUrl(shipmentsUrl).requestInterceptor(tokenRelay).build();
        this.catalogClient = RestClient.builder().baseUrl(catalogUrl).requestInterceptor(tokenRelay).build();
        this.notifyClient = RestClient.builder().baseUrl(notifyUrl).requestInterceptor(tokenRelay).build();
        this.auditClient = RestClient.builder().baseUrl(auditUrl).requestInterceptor(tokenRelay).build();
        this.reportClient = RestClient.builder().baseUrl(reportUrl).requestInterceptor(tokenRelay).build();
    }

    public List<ShipmentResponse> listShipments() {
        return shipmentsClient.get()
                .uri(ApiPaths.SHIPMENTS)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });
    }

    public ShipmentResponse createShipment(ShipmentRequest request) {
        return shipmentsClient.post()
                .uri(ApiPaths.SHIPMENTS)
                .body(request)
                .retrieve()
                .body(ShipmentResponse.class);
    }

    public List<ServiceTypeDto> listServices() {
        return catalogClient.get()
                .uri(ApiPaths.SERVICES)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });
    }

    public List<FleetCapacityDto> listFleet() {
        return catalogClient.get()
                .uri(ApiPaths.FLEET)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });
    }

    public List<NotificationDto> listNotifications() {
        return notifyClient.get()
                .uri(ApiPaths.NOTIFICATIONS)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });
    }

    public List<AuditEntryDto> listAudit(Long shipmentId) {
        return auditClient.get()
                .uri(uriBuilder -> {
                    var builder = uriBuilder.path(ApiPaths.AUDIT);
                    if (shipmentId != null) {
                        builder = builder.queryParam("shipmentId", shipmentId);
                    }
                    return builder.build();
                })
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });
    }

    public KpiReportDto kpis() {
        return reportClient.get()
                .uri(ApiPaths.REPORTS + "/kpis")
                .retrieve()
                .body(KpiReportDto.class);
    }
}
