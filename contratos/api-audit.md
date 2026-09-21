# API ms-rutaexpress-audit (puerto 8085)

Contrato **implementado**. Consume Kafka (`shipment-events`) y persiste.

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/audit` | `[AuditEntryDto]` |

```
AuditEntryDto { id, shipmentId, status, occurredAt }
```

Solo Admin (perfil `secure`). Faltan filtros (usuario, fechas, tipo de evento) y el rol Auditor del caso.
