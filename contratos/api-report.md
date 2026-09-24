# API ms-rutaexpress-report (puerto 8084)

Contrato **implementado**. Consume Kafka (`shipment-events` y `shipments.events`, ver `kafka.md`).

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/reports/kpis?range=` | `{ "byStatus": {...}, "totalEvents": 12 }` (acumulado; con `range` filtra ventana) |
| GET | `/api/reports/hourly?range=` | `[{ "hour", "created", "delivered", "total" }]` (envíos por hora) |
| GET | `/api/reports/leadtime?range=` | `{ "averageSeconds", "count" }` (tiempo CREATED→DELIVERED) |
| GET | `/api/reports/top-services?range=&limit=` | `[{ "shipmentId", "eventCount", "firstSeen", "lastStatus", "lastSeen" }]` (envíos con más movimientos) |

`range` = horas hacia atrás (entero positivo; `kpis` sin `range` devuelve el acumulado). Solo Admin (perfil `secure`).
