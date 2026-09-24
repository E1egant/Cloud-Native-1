# Estado: ms-rutaexpress-report

**Dueño:** compañero / opencode · **Actualizado:** 2026-09-24

## Hecho
Consumidor Kafka (dual `shipment-events` + `shipments.events`). `GET /api/reports/kpis?range=`, `/hourly`, `/leadtime`, `/top-services?range=&limit=`. Repo independiente. 18 pruebas verdes. Audience validada (T2). `Dockerfile` y CI propios.

## Falta
Kafka del caso (3 brokers) en infra; que shipments migre a `shipments.events` (Diego).

## Bloqueos / necesita de otros
Tareas detalladas y criterios de "hecho": `tareas/companero-opencode.md`.
