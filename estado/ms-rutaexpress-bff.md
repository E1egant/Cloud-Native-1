# Estado: ms-rutaexpress-bff

**Dueño:** Diego / Claude · **Actualizado:** 2026-09-21

## Hecho
Validación JWT (firma, vigencia, issuer, audience), roles desde `roles`, 401/403 en JSON, CORS, proxy a shipments/catalog/audit/report. 8 pruebas verdes.

## Falta
Probar con token real de Azure; ajustar rutas si cambian los contratos.

## Bloqueos / necesita de otros
`AZURE_TENANT_ID` y `AZURE_API_AUDIENCE` reales.
