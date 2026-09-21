# API ms-rutaexpress-report (puerto 8084)

Contrato **implementado**. Consume Kafka (`shipment-events`).

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/reports/kpis` | `{ "byStatus": { "CREATED": 3, ... }, "totalEvents": 12 }` |

Solo Admin (perfil `secure`). Faltan envíos por hora, lead time y `top-services` del caso: ver `diferencias-con-el-caso.md`.
