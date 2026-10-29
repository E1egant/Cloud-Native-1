# Estado: ms-rutaexpress-shipments

**Responsable:** Diego Miranda · **Actualizado:** 2026-09-23

## Hecho
CRUD de envíos, máquina de estados, publicación a RabbitMQ y Kafka, seguridad JWT por perfil `secure`. Repo independiente (Boot 3.3.5). 14 pruebas verdes. Audience corregida (`audiences`). **Decisión: se mantienen estados en inglés y `PATCH`** (no se cambia al enunciado en español/`PUT`; ver `contratos/diferencias-con-el-caso.md`). `Dockerfile` con `SPRING_PROFILES_ACTIVE=secure` por defecto (seguridad por defecto en el contenedor; local sin Docker sigue sin seguridad salvo que se active el perfil). CI (`.github/workflows/ci.yml`). `.env.example` nuevo.

## Falta
Rol `Cliente` (ve solo sus envíos); reserva de capacidad en catálogo al aceptar un envío — depende de un endpoint que **catalog** (Lucas Alcaino) todavía no tiene; decidir Oracle vs PostgreSQL (D1, consultar al profesor).

## Bloqueos / necesita de otros
Endpoint de reserva de capacidad en `ms-rutaexpress-catalog` (pedido a Lucas Alcaino). Valores de Azure AD reales para probar `secure` con token real.

## EP3 (2026-10-28)
Publica `email.send`, `label.gen` (al crear) y `warehouse.ticket` (al pasar a `PICKED_UP`) en `cmd.direct` con envelope (`NotificationPublisher`); un fallo del broker se registra y no afecta el envío. 18 pruebas verdes. Commit local `f2c6736`, **sin push**.

## Fix 2026-10-28
El matcher `PATCH /api/shipments/**/status` era inválido en Spring 6 y respondía 500 con el perfil `secure` (rompía el cambio de estado y el ticket de bodega). Corregido a `/api/shipments/*/status`; 20 pruebas, con regresión. Desplegado.
