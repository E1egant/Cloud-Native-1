# Estado: ms-rutaexpress-notify

**Dueño:** Diego / Claude (código inicial: opencode) · **Actualizado:** 2026-09-21

## Hecho
Consumidor RabbitMQ que registra notificaciones (`GET /api/notifications`). Repo independiente. 7 pruebas verdes. Corregido `audiences`.

## Falta
Topología de 3 colas + DLQ y envelope del caso; quitar BD si se sigue el caso ("sin DB"); validar audience.

## Bloqueos / necesita de otros
Topología RabbitMQ del caso en infra.
