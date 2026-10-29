# Estado: ms-rutaexpress-notify

**Dueño:** Diego / Claude (código inicial: opencode) · **Actualizado:** 2026-09-23

## Hecho
EP3 (2026-10-28): topología del caso como beans (`config/RabbitConfig`: 3 exchanges, 3 colas + 3 DLQ, bindings direct y topic), nombres en `application.yml` (`rutaexpress.rabbit.*`), consumidores por dominio (`messaging/email|warehouse|label`) con ACK manual, 3 intentos en proceso y NACK sin reencolar a DLQ + log (`AckSupport`), idempotencia por `eventId` del envelope. Cola legacy eliminada. 12 pruebas verdes. Commit local `0d0b747`, **sin push**.

## Falta
Probar contra el broker real (compose de infra con `definitions.json`) y forzar un mensaje a la DLQ para la demo. Evaluar quitar la BD ("sin DB" en el caso).

## Bloqueos / necesita de otros
Clúster de 2 nodos y compose en la EC2 (infra, Lucas Alcaino).
