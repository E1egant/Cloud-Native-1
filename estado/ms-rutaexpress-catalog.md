# Estado: ms-rutaexpress-catalog

**Dueño:** compañero / opencode · **Actualizado:** 2026-09-24

## Hecho
Servicios, tarifas y flota (seeder demo). Repo independiente. 33 pruebas verdes (servicio, API, seguridad).
`PUT /services/{id}` y `POST /fleet/{id}/reserve` con contadores de disponible (BUSY al agotarse, 409 si no alcanza). Audience validada (`audiences`, T2 cerrada).

## Falta
Decidir Oracle vs PostgreSQL.

## Bloqueos / necesita de otros
`ms-rutaexpress-shipments` (Diego) debe llamar a `POST /fleet/{id}/reserve` al aceptar un envío (contrato en `contratos/api-catalog.md`). Tareas: `tareas/companero-opencode.md`.
