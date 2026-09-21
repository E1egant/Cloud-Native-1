# API ms-rutaexpress-shipments (puerto 8081)

Contrato **implementado** (fuente: `ms-rutaexpress-shipments`). Diferencias con el caso: ver `diferencias-con-el-caso.md`.

| Método | Ruta | Cuerpo | Respuesta |
|---|---|---|---|
| GET | `/api/shipments` | — | `[ShipmentResponse]` |
| GET | `/api/shipments/{id}` | — | `ShipmentResponse` |
| POST | `/api/shipments` | `ShipmentRequest` | `ShipmentResponse` (estado `CREATED`) |
| PATCH | `/api/shipments/{id}/status` | `{ "status": "ASSIGNED" }` | `ShipmentResponse` |

```
ShipmentRequest  { origin, destination, courierId, recipient: RecipientDto, packageInfo: PackageDto }
ShipmentResponse { id, trackingNumber, origin, destination, courierId, status, recipient, packageInfo, createdAt, updatedAt }
RecipientDto     { name, phone, email, address }
PackageDto       { weightKg, volumeM3, description }
```

## Estados (`ShipmentStatus`)

`CREATED → ASSIGNED → PICKED_UP → IN_TRANSIT → DELIVERED`; `CANCELLED` desde `CREATED`/`ASSIGNED`; `FAILED` desde `PICKED_UP`/`IN_TRANSIT`. Estados finales: `DELIVERED`, `CANCELLED`, `FAILED`. Transición inválida → error.

Cada cambio publica un `ShipmentEvent` a Kafka y una notificación a RabbitMQ (ver `kafka.md`, `rabbitmq.md`).

Seguridad (perfil `secure`): POST → Operador, Admin; PATCH status → Operador, Bodega, Admin; resto autenticado.
