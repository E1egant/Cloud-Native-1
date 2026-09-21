# Tareas de Diego / Claude

Última actualización: 2026-09-21. Repos propios: `frontend-rutaexpress`, `ms-rutaexpress-bff`, `ms-rutaexpress-shipments`, `ms-rutaexpress-notify`. Las del compañero están en `companero-opencode.md`.

## Bloqueado hasta que llegue Azure AD (T1 del compañero)
- Probar el login real: frontend → token con `aud`, `iss` v2.0 y `roles` → BFF (200/401/403). Ajustar `VITE_*` y `AZURE_*`.

## Pendiente
| # | Tarea | Repo |
|---|---|---|
| D1 | Consultar al profesor si la BD puede ser PostgreSQL (el caso dice Oracle) y anotarlo en `contratos/diferencias-con-el-caso.md` | — |
| D2 | Decidir con el compañero estados en español (caso) vs inglés y cambiar `PUT`/`PATCH`; primero en `contratos/api-shipments.md` | shipments, bff, frontend |
| D3 | `shipments`: rol `Cliente` (ve solo sus envíos), reserva de capacidad en catálogo al aceptar (coordinar `reserve` con T5), eventos con el actor | shipments |
| D4 | `notify`: 3 colas + 3 DLQ + 3 exchanges + envelope común, ACK/NACK, idempotencia; evaluar quitar la BD ("sin DB" en el caso) | notify |
| D5 | Frontend: vistas reales de catálogo, reportes y auditoría (hoy JSON), Dockerfile + nginx (traer de `legacy-monorepo`), manejo de 401/403 | frontend |
| D6 | BFF: cache de JWKS y logs de rechazo de token; decidir si se suma el agregador `/api/bff/*` de `legacy-monorepo` | bff |
| D7 | CI de GitHub Actions por repo (`./mvnw -B test` / `npm test && npm run build`) | los 4 |
| D8 | `.env.example` en cada repo | los 4 |
