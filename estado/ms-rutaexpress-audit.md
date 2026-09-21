# Estado: ms-rutaexpress-audit

**Dueño:** compañero / opencode · **Actualizado:** 2026-09-21

## Hecho
Consumidor Kafka + `GET /api/audit`. Repo independiente. Compila; sin pruebas.

## Falta
Pruebas; filtros (usuario, fechas, tipo); rol Auditor; tópicos `shipments.events`/`audit.timeline`; validar audience.

## Bloqueos / necesita de otros
Kafka del caso (3 brokers) en infra.
