# Estado: ms-rutaexpress-shipments

**Dueño:** Diego / Claude (código inicial: opencode) · **Actualizado:** 2026-09-21

## Hecho
CRUD de envíos, máquina de estados, publicación a RabbitMQ y Kafka, seguridad JWT por perfil `secure`. Repo independiente (Boot 3.3.5). 14 pruebas verdes. Corregido `audiences`.

## Falta
Alinear estados y `PUT` con el caso; validar audience; perfil dev seguro por defecto; decidir Oracle vs PostgreSQL; `Dockerfile` y CI propios.

## Bloqueos / necesita de otros
Acuerdo de roles y estados con el compañero.
