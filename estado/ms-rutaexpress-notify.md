# Estado: ms-rutaexpress-notify

**Dueño:** Diego / Claude (código inicial: opencode) · **Actualizado:** 2026-09-23

## Hecho
Consumidor RabbitMQ que registra notificaciones (`GET /api/notifications`). Repo independiente. Audience corregida (`audiences`). **Idempotencia agregada**: `NotificationRequest.id()` (UUID que ya generaba el publisher) se guarda como `messageId` único; un reintento/redelivery del broker con el mismo id se descarta sin duplicar la notificación (`NotificationService.process`, con su prueba). 8 pruebas verdes (antes 7). `Dockerfile` con `SPRING_PROFILES_ACTIVE=secure` por defecto. CI (`.github/workflows/ci.yml`). `.env.example` nuevo.

## Falta
Topología de 3 colas + DLQ y envelope del caso — **depende de que infra (compañero) reconfigure RabbitMQ**; hoy sigue con 1 cola (`rutaexpress.notifications`). Evaluar quitar la BD si se sigue el caso al pie de la letra ("sin DB").

## Bloqueos / necesita de otros
Topología RabbitMQ (3 colas + 3 DLQ + 3 exchanges) en `infra` — pedido al compañero, no se puede avanzar del lado de notify hasta que exista.
