# API ms-rutaexpress-catalog (puerto 8082)

Contrato **implementado**. Diferencias con el caso: ver `diferencias-con-el-caso.md`.

| Método | Ruta | Cuerpo | Respuesta |
|---|---|---|---|
| GET | `/api/catalog/services` | — | `[ServiceTypeDto]` |
| GET | `/api/catalog/services/{id}` | — | `ServiceTypeDto` |
| POST | `/api/catalog/services` | `ServiceTypeRequest` | `ServiceTypeDto` |
| PUT | `/api/catalog/services/{id}` | `ServiceTypeRequest` (reemplazo total de tarifa) | `ServiceTypeDto` |
| GET | `/api/catalog/fleet` | — | `[FleetCapacityDto]` |
| POST | `/api/catalog/fleet` | `FleetCapacityRequest` | `FleetCapacityDto` |
| PATCH | `/api/catalog/fleet/{id}/status` | `{ "status": "BUSY" }` | `FleetCapacityDto` |
| POST | `/api/catalog/fleet/{id}/reserve` | `{ "weightKg": 2.5, "volumeM3": 0.01 }` | `FleetCapacityDto` |

```
ServiceTypeDto   { id, name, basePrice, pricePerKm, pricePerKg, estimatedHours }
FleetCapacityDto { id, vehicleType, maxWeightKg, maxVolumeM3, availableWeightKg, availableVolumeM3, status }
FleetStatus      AVAILABLE | BUSY | MAINTENANCE
```

Reserva de capacidad: `POST /api/catalog/fleet/{id}/reserve` descuenta `weightKg`/`volumeM3` de
`availableWeightKg`/`availableVolumeM3` (al crear, disponible = máximo). Si no alcanza, responde 409.
Si alguna dimensión llega a 0, el vehículo pasa a `BUSY`. Solo `Operador`/`Admin` (perfil `secure`).
La usa `ms-rutaexpress-shipments` al aceptar un envío.

Al arrancar carga datos demo (seeder). Gestión de catálogo: solo Admin (perfil `secure`).
