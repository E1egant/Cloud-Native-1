# Estado: ms-rutaexpress-bff

**Dueño:** Diego / Claude · **Actualizado:** 2026-09-23

## Hecho
Validación JWT (firma, vigencia, issuer, audience), roles desde `roles` (incluye `Bodega`, ya cubierto por test), 401/403 en JSON, CORS, proxy 1:1 a shipments/catalog/audit/report/notify. **Decisión: se mantiene el proxy 1:1** (no el agregador `/api/bff/*` de `legacy-monorepo`); el frontend ya usa las rutas `/api/*`. 14 pruebas verdes (firma, expiración, issuer, audience, PATCH por rol). `Dockerfile` (Java 21, sin perfil dev inseguro: siempre valida JWT). CI (`.github/workflows/ci.yml`). `.env.example` nuevo.

## Falta
Cache de JWKS y logs de rechazo de token; probar con token real.

## Bloqueos / necesita de otros
`AZURE_TENANT_ID` y `AZURE_API_AUDIENCE` reales (T1, Azure AD).
