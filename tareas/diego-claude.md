# Tareas de Diego / Claude

Última actualización: 2026-09-23. Repos propios: `frontend-rutaexpress`, `ms-rutaexpress-bff`, `ms-rutaexpress-shipments`, `ms-rutaexpress-notify`. Las del compañero están en `companero-opencode.md`.

## Bloqueado hasta que llegue Azure AD (T1 del compañero)
- Probar el login real: frontend → token con `aud`, `iss` v2.0 y `roles` → BFF (200/401/403). Ajustar `VITE_*` y `AZURE_*`.
- Diego hace Azure AD (T1) y el despliegue en AWS (T3/T6 de infra) — se coordina con el compañero cuál de los dos las ejecuta finalmente.

## Hecho (2026-09-23)
| # | Tarea | Repo |
|---|---|---|
| D2 | Decisión: se mantiene inglés + `PATCH` (ya implementado en los 4 repos y en catalog/audit/report del compañero) | — |
| D5 (parcial) | Vistas reales de catálogo, reportes y auditoría (antes JSON); Dockerfile + nginx (trae el patrón de `legacy-monorepo`, adaptado a las env vars de `main`) | frontend |
| D6 (parcial) | Confirmado: BFF usa proxy 1:1 (no el agregador `/api/bff/*`); rol `Bodega` ya estaba cubierto | bff |
| D7 | CI de GitHub Actions por repo (`./mvnw -B test` / `npm ci && npm test && npm run build`) | los 4 |
| D8 | `.env.example` en bff, shipments, notify (frontend ya lo tenía) | bff, shipments, notify |
| — | Dockerfile standalone en bff, shipments, notify (build con `mvnw` propio, sin depender del monorepo) | bff, shipments, notify |
| — | Idempotencia en notify: dedup por `messageId` (evita duplicar notificaciones en redelivery) | notify |

## Pendiente
| # | Tarea | Repo |
|---|---|---|
| D1 | Consultar al profesor si la BD puede ser PostgreSQL (el caso dice Oracle) y anotarlo en `contratos/diferencias-con-el-caso.md` | — |
| D3 | `shipments`: rol `Cliente` (ve solo sus envíos), reserva de capacidad en catálogo al aceptar — **depende de un endpoint nuevo en `catalog` (pedir al compañero)** | shipments |
| D4 | `notify`: 3 colas + 3 DLQ + 3 exchanges + envelope — **depende de que infra (compañero) reconfigure RabbitMQ**; evaluar quitar la BD ("sin DB" en el caso) | notify |
| D5 | Frontend: rol `Cliente` en las vistas; probar Docker build real (no se probó en esta sesión, sin Docker Desktop) | frontend |
| D6 | BFF: cache de JWKS y logs de rechazo de token | bff |

## Para Azure AD y AWS (los hace Diego, guiado paso a paso)
Ver `tareas/companero-opencode.md` §5 (T1 Azure AD) y la guía de despliegue de `infra/DESPLIEGUE.md` para AWS. Nota: `infra/docker-compose.apps.yml` y `Dockerfile.service` todavía asumen el monorepo viejo (`context: ..`) — pedir al compañero que los reescriba para repos separados, o usar los `Dockerfile` standalone nuevos de cada repo como alternativa mientras tanto.
