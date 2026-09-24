# Estado: ms-rutaexpress-audit

**Dueño:** compañero / opencode · **Actualizado:** 2026-09-24

## Hecho
Consumidor Kafka (dual `shipment-events` + `shipments.events`) + `GET /api/audit` con filtros shipmentId/status/actor/from/to. Roles Admin y Auditor. Actor persistido (nulo hasta que shipments lo envíe). Repo independiente. 16 pruebas verdes. Audience validada (T2). `Dockerfile` y CI propios.

## Falta
Kafka del caso (3 brokers) en infra; que shipments publique `actor` y migre a `shipments.events` (Diego).

## Bloqueos / necesita de otros
Tareas detalladas y criterios de "hecho": `tareas/companero-opencode.md`.
