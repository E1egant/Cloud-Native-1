package com.rutaexpress.bff.service;

import com.rutaexpress.contracts.ApiPaths;
import com.rutaexpress.contracts.dto.FleetCapacityDto;
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

    public BffService(
            @Value("${rutaexpress.shipments-url:http://localhost:8081}") String shipmentsUrl,
            @Value("${rutaexpress.catalog-url:http://localhost:8082}") String catalogUrl) {
        this.shipmentsClient = RestClient.builder().baseUrl(shipmentsUrl).build();
        this.catalogClient = RestClient.builder().baseUrl(catalogUrl).build();
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
}
