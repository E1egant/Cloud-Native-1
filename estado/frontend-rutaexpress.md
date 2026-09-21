# Estado: frontend-rutaexpress

**Dueño:** Diego / Claude · **Actualizado:** 2026-09-21

## Hecho
React + Vite + TS con MSAL: login/logout, rutas protegidas por rol (roles del ID token), cliente HTTP con Bearer y `acquireTokenSilent`, vistas base. Compila. Rama `legacy-monorepo` con la versión de opencode (usa `/api/bff/me` para roles, Dockerfile y nginx).

## Falta
Alinear con el BFF y los contratos vigentes (rutas `/api/bff/*` vs `/api/*`, estados en inglés, `PATCH` de estado); traer Dockerfile/nginx de `legacy-monorepo`; vistas reales de catálogo/reportes/auditoría; probar login real; pruebas.

## Bloqueos / necesita de otros
Valores `VITE_*` (tenant, client ids, scope) del compañero.
