# RabbitMQ

## Implementado

- Cola única `rutaexpress.notifications` (`MessagingConstants.NOTIFICATIONS_QUEUE`).
- Productor: `ms-rutaexpress-shipments` (publica `NotificationRequest`). Consumidor: `ms-rutaexpress-notify`, que registra la notificación (`GET /api/notifications`, puerto 8083).
- Broker: RabbitMQ del `docker-compose.base.yml` de `infra`.

## Objetivo del caso (pendiente)

Exchanges `cmd.direct`, `cmd.topic`, `cmd.dead.dlx`; colas `q.cmd.email`, `q.cmd.warehouse`, `q.cmd.label` con sus DLQ (`*.dlq`); bindings direct `email.send`, `warehouse.ticket`, `label.gen` y topic `email.*`, `warehouse.#`, `label.*`; envelope común (`type`, `eventId`, `timestamp`, `traceId`, `correlationId`), ACK/NACK explícitos e idempotencia. Clúster de 2 nodos con Management UI.
