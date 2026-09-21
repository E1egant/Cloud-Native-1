# API ms-rutaexpress-catalog (puerto 8082)

Contrato **implementado**. Diferencias con el caso: ver `diferencias-con-el-caso.md`.

| Método | Ruta | Cuerpo | Respuesta |
|---|---|---|---|
| GET | `/api/catalog/services` | — | `[ServiceTypeDto]` |
| GET | `/api/catalog/services/{id}` | — | `ServiceTypeDto` |
| POST | `/api/catalog/services` | `ServiceTypeRequest` | `ServiceTypeDto` |
| GET | `/api/catalog/fleet` | — | `[FleetCapacityDto]` |
| POST | `/api/catalog/fleet` | `FleetCapacityRequest` | `FleetCapacityDto` |
| PATCH | `/api/catalog/fleet/{id}/status` | `{ "status": "BUSY" }` | `FleetCapacityDto` |

```
ServiceTypeDto   { id, name, basePrice, pricePerKm, pricePerKg, estimatedHours }
FleetCapacityDto { id, vehicleType, maxWeightKg, maxVolumeM3, status }
FleetStatus      AVAILABLE | BUSY | MAINTENANCE
```

Al arrancar carga datos demo (seeder). Gestión de catálogo: solo Admin (perfil `secure`).
