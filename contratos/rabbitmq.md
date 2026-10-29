# RabbitMQ

## Topología (EP3/EP4)

Definida en `infra/rabbitmq/definitions.json` (broker) y declarada como beans `Queue`/`Exchange`/`Binding` en `ms-rutaexpress-notify` (consumidor). Los nombres viven en `application.yml` (`rutaexpress.rabbit.*`), nunca en el código de negocio.

| Exchange | Tipo | Cola | Routing key |
|---|---|---|---|
| `cmd.direct` | direct | `q.cmd.email` | `email.send` |
| `cmd.direct` | direct | `q.cmd.warehouse` | `warehouse.ticket` |
| `cmd.direct` | direct | `q.cmd.label` | `label.gen` |
| `cmd.topic` | topic | `q.cmd.email` | `email.*` |
| `cmd.topic` | topic | `q.cmd.warehouse` | `warehouse.#` |
| `cmd.topic` | topic | `q.cmd.label` | `label.*` |
| `cmd.dead.dlx` | topic | `q.cmd.email.dlq` / `q.cmd.warehouse.dlq` / `q.cmd.label.dlq` | `email.#` / `warehouse.#` / `label.#` |

Las 3 colas de trabajo son durables y llevan `x-dead-letter-exchange: cmd.dead.dlx`. Un mensaje rechazado sin reencolar (`basicNack` con `requeue=false`) llega a su DLQ con la routing key original.

## Envelope común (JSON)

```json
{ "type": "email.send", "eventId": "<uuid>", "timestamp": "<ISO-8601>",
  "traceId": "<uuid>", "correlationId": "<id del envío>", "payload": { } }
```

`eventId` es la clave de idempotencia: un redelivery con el mismo `eventId` se descarta.

## Productores y consumidores

| Evento de negocio (shipments) | Routing key | Payload |
|---|---|---|
| Envío creado | `email.send` | `{ channel, recipient, subject, body }` |
| Envío creado | `label.gen` | `{ trackingNumber, recipient }` |
| Envío `PICKED_UP` | `warehouse.ticket` | `{ trackingNumber, recipient }` |
| Envío `DELIVERED` | `email.send` | `{ channel, recipient, subject, body }` |

Productor: `ms-rutaexpress-shipments` (publica a `cmd.direct`). Consumidor: `ms-rutaexpress-notify`, un listener por dominio (email, warehouse, label) con ACK manual.

## Política de errores del consumidor

- Mensaje inválido (envelope sin `eventId`/`payload`, JSON ilegible): `basicNack(requeue=false)` → DLQ, sin reintentos.
- Error transitorio (BD caída): hasta 3 intentos en proceso; si se agotan, `basicNack(requeue=false)` → DLQ.
- Todo envío a DLQ se registra en el log con `eventId`, cola y causa.

## Administrador (`ms-rutaexpress-rabbit-admin`, puerto 8087)

Rol `Admin`. Recursos REST sobre `/api/rabbit`:

| Método | Ruta | Acción |
|---|---|---|
| POST | `/queues` | crear `{name, durable?, deadLetter?}` (con DLQ `<name>.dlq` opcional) |
| GET | `/queues/{name}` | mensajes y consumidores |
| DELETE | `/queues/{name}` | eliminar |
| POST / DELETE | `/exchanges` · `/exchanges/{name}` | crear (`direct`/`topic`/`fanout`) / eliminar |
| POST / DELETE | `/bindings` | crear / eliminar (cuerpo `{exchange, queue, routingKey}`) |

Validación: nombres no vacíos, `^[A-Za-z0-9._-]{1,200}$`, tipo de exchange permitido; 400 con detalle por campo.

## Clúster

2 nodos RabbitMQ (`rabbit1`, `rabbit2`) con Management UI, levantados con `docker compose` en la EC2 (responsable: `infra`).

Acceso: el BFF expone `/api/rabbit/**` (rol `Admin`) y lo reenvía a `RABBIT_ADMIN_URL` (por defecto `http://localhost:8087`); en el API Gateway, ruta `ANY /api/rabbit/{proxy+}` con el JWT authorizer hacia la misma integración del BFF.
