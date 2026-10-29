# Estado: frontend-rutaexpress

**Dueño:** Diego / Claude · **Actualizado:** 2026-09-23

## Hecho
React + Vite + TS con MSAL: login/logout, rutas protegidas por rol, cliente HTTP con Bearer y `acquireTokenSilent`. Vistas reales de Catálogo (servicios y flota), Reportería (KPIs por estado) y Auditoría (timeline filtrable por envío) — ya no muestran JSON crudo. `Dockerfile` + `nginx.conf` (multi-stage, nginx sirve `dist/` y proxya `/api/` al BFF). CI (`.github/workflows/ci.yml`: `npm ci && npm test && npm run build`). `.env.example` ya existía. Compila y build de Docker sin probar (sin Docker Desktop en esta sesión); 10 pruebas (Vitest) verdes.

## Falta
Probar login real (bloqueado por Azure AD); imagen Docker sin build real (revisar al desplegar); rol `Cliente` (ver solo sus envíos) no implementado en frontend.

## Bloqueos / necesita de otros
Valores `VITE_*` (tenant, client ids, scope) del compañero — vienen de Azure AD (T1).

## 2026-10-28
Tema visual nuevo (paleta azul/turquesa, barra lateral con marca, login, tablas y botones) solo con CSS y marcado de Login/Layout; 12 pruebas y build verdes. Publicado en S3 (`index.html` + assets con su Content-Type).
