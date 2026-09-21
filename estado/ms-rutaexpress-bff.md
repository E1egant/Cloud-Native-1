# Estado: ms-rutaexpress-bff

**Dueño:** Diego / Claude · **Actualizado:** 2026-09-21

## Hecho
Validación JWT (firma, vigencia, issuer, audience), roles desde `roles`, 401/403 en JSON, CORS, proxy 1:1 a shipments/catalog/audit/report. 8 pruebas verdes. Rama `legacy-monorepo` con el BFF agregador de opencode (`/api/bff/*`, `/me`, token relay).

## Falta
Decidir qué API expone el BFF (proxy 1:1 o agregador `/api/bff/*`) y unificar con el frontend; ajustar rutas a lo implementado (`/api/reports`, `PATCH`); rol `Bodega`; probar con token real.

## Bloqueos / necesita de otros
`AZURE_TENANT_ID` y `AZURE_API_AUDIENCE` reales.
