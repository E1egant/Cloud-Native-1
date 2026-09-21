package com.rutaexpress.bff.web;

import com.rutaexpress.bff.service.BffService;
import com.rutaexpress.contracts.dto.AuditEntryDto;
import com.rutaexpress.contracts.dto.FleetCapacityDto;
import com.rutaexpress.contracts.dto.KpiReportDto;
import com.rutaexpress.contracts.dto.NotificationDto;
import com.rutaexpress.contracts.dto.ServiceTypeDto;
import com.rutaexpress.contracts.dto.ShipmentRequest;
import com.rutaexpress.contracts.dto.ShipmentResponse;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bff")
public class BffController {

    private final BffService service;

    public BffController(BffService service) {
        this.service = service;
    }

    @GetMapping("/shipments")
    public List<ShipmentResponse> listShipments() {
        return service.listShipments();
    }

    @PostMapping("/shipments")
    @ResponseStatus(HttpStatus.CREATED)
    public ShipmentResponse createShipment(@RequestBody ShipmentRequest request) {
        return service.createShipment(request);
    }

    @GetMapping("/catalog/services")
    public List<ServiceTypeDto> listServices() {
        return service.listServices();
    }

    @GetMapping("/catalog/fleet")
    public List<FleetCapacityDto> listFleet() {
        return service.listFleet();
    }

    @GetMapping("/notifications")
    public List<NotificationDto> listNotifications() {
        return service.listNotifications();
    }

    @GetMapping("/audit")
    public List<AuditEntryDto> listAudit(@RequestParam(required = false) Long shipmentId) {
        return service.listAudit(shipmentId);
    }

    @GetMapping("/reports/kpis")
    public KpiReportDto kpis() {
        return service.kpis();
    }
}
