# Plan Fase 1 — BFF seguro + Frontend con login (Evaluación Parcial 1)

**Fecha:** 2026-09-21
**Autor:** Diego / Claude

## Qué pide la EP1 (16%, encargo en parejas, entrega = enlaces GitHub)

- Backend: varios microservicios Spring Boot que **compilen, sigan buenas prácticas y respondan a pruebas básicas**.
- Backend con BD cloud (Oracle): entidades, repositorios y propiedades de conexión.
- Backend con **filtros que validen el JWT** del IDaaS.
- Frontend completo, modular, sin errores de compilación, vistas funcionales, **login con IDaaS y JWT en cada llamada**.
- `.gitignore` correcto en cada componente.

Rúbrica (2 indicadores):

| Indicador | Peso | Muy buen desempeño |
|---|---|---|
| MSAL + frontend: login/logout, guards, interceptor, tokens, roles/scopes desde claims | 60% | flujo completo sin fallas, consume API Gateway |
| BFF valida token con el IDaaS y solo deja pasar si es válido | 40% | valida firma, vigencia, issuer, audience; autoriza por rol; códigos 401/403 correctos |

## Frontend: React (especificado por el profesor)

El profesor indicó que el frontend se hace en **React**. La rúbrica nombra Angular, `MsalInterceptor` y guards; su equivalente aquí es `@azure/msal-react` (`MsalProvider`), rutas protegidas por rol y un cliente HTTP que adjunta el Bearer.

## Orden de implementación

1. `ms-rutaexpress-bff`: scaffolding (Spring Initializr, Boot 4.1, Java 21).
2. BFF: `SecurityConfig` — decoder JWT (firma vía JWKS de Azure, issuer, audience, expiración), roles desde claim `roles`, autorización por ruta/método, respuestas 401/403 en JSON, CORS.
3. BFF: proxy hacia los microservicios de dominio (`/api/shipments|catalog|report|audit/**`).
4. BFF: pruebas (sin token → 401, rol incorrecto → 403, rol correcto → pasa, audience inválida → rechazada).
5. Frontend React (Vite + TS + `@azure/msal-react`): login, rutas protegidas por rol, cliente HTTP con Bearer, vistas base.
6. Microservicios de dominio (shipments, catalog) con Oracle + JWT — Fase 2.

## Variables de configuración (las entrega infra/Azure AD del compañero)

`AZURE_TENANT_ID`, `AZURE_API_AUDIENCE` (`api://<API_CLIENT_ID>`), `AZURE_SPA_CLIENT_ID`, URLs de microservicios.
