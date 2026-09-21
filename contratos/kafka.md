# Kafka

## Implementado

- Tópico `shipment-events` (`MessagingConstants.SHIPMENT_EVENTS_TOPIC`), valor `ShipmentEvent { eventId, shipmentId, status, occurredAt }`.
- Productor: `ms-rutaexpress-shipments`. Consumidores: `ms-rutaexpress-audit` (8085) y `ms-rutaexpress-report` (8084).
- Broker: Kafka en modo KRaft (1 nodo) del `docker-compose.base.yml`.

## Objetivo del caso (pendiente)

Zookeeper (3 nodos) + Kafka (3 brokers) + Kafka UI. Tópicos `shipments.events` (3 part., 3 réplicas, delete, 3–7 días), `audit.timeline` (compact,delete, 14–30 días) y `*.DLT` por consumidor (7–14 días).
