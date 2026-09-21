# Estado: ms-rutaexpress-audit

**Dueño:** compañero / opencode · **Actualizado:** 2026-09-21

## Hecho
Consumidor Kafka + `GET /api/audit`. Repo independiente. 9 pruebas verdes (servicio, consumidor Kafka, seguridad).

## Falta
Filtros (usuario, fechas, tipo); rol Auditor; tópicos `shipments.events`/`audit.timeline`; validar audience.

## Bloqueos / necesita de otros
Tareas detalladas y criterios de "hecho": `tareas/companero-opencode.md`.
Kafka del caso (3 brokers) en infra.
