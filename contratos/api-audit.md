# API ms-rutaexpress-audit (puerto 8085)

Contrato **implementado**. Consume Kafka (`shipment-events` y `shipments.events`, ver `kafka.md`) y persiste.

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/audit?shipmentId=&status=&actor=&from=&to=` | `[AuditEntryDto]` |

```
AuditEntryDto { id, shipmentId, status, actor, occurredAt }
```

Filtros opcionales: `shipmentId`, `status`, `actor` (usuario que originó el evento; nulo hasta que el productor lo envíe), `from`/`to` (ISO-8601 sobre `occurredAt`). Roles `Admin` y `Auditor` (perfil `secure`).
