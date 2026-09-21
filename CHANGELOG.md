# Changelog — RutaExpress

Registro de avances del proyecto, por push. Este archivo SÍ se versiona en git: es la forma en que ambos agentes (Claude y opencode) y ambas personas saben qué hizo el otro, sin depender de coordinación en vivo.

> Formato: `- YYYY-MM-DD | autor | fase | resumen del push`
> Actualizar este archivo en el mismo commit (o uno inmediatamente posterior) a cada push relevante. Ver reglas completas en `CLAUDE.md` (local, no versionado).

- 2026-09-21 | Diego/Claude | Fase 0 | Setup inicial del repo: README, .gitignore, CLAUDE.md (reglas de equipo) y carpeta `planes-cloud-native/`.
- 2026-09-21 | Diego/Claude | Fase 0 | Se mueve el registro de avances de `CLAUDE.md` (no versionado) a este `CHANGELOG.md` (versionado), para que ambos agentes compartan el mismo historial vía git.

- 2026-09-21 | Compañero/Deepseek | Fase 0 | Limpieza de `DEEPSEEK.md` (textos truncados, nombre unificado desde `CLAUDE.md`), ajustes en `README.md` y `.gitignore`.
- 2026-09-21 | Compañero/Deepseek | Fase 1 | Esqueleto de infraestructura: `infra/docker-compose.base.yml` con red, volúmenes, RabbitMQ y Kafka (KRaft); `.env.example`; guías de Azure AD y EC2. Plan en `planes-cloud-native/01-fase-1-infra-esqueleto.md`.

- 2026-09-21 | Compañero/opencode | Fase 1-2 | Contratos compartidos (`contracts`) con DTOs, enums, rutas y eventos; `pom.xml` padre multi-módulo. Plan en `planes-cloud-native/02-fase-1-y-2-contratos-esqueleto-dominio.md`.
- 2026-09-21 | Compañero/opencode | Fase 2 | `ms-rutaexpress-shipments` (CRUD + máquina de estados) y `ms-rutaexpress-catalog` (servicios, tarifas y flota).
- 2026-09-21 | Compañero/opencode | Fase 3-4 | `ms-rutaexpress-notify` (RabbitMQ), `ms-rutaexpress-audit` y `ms-rutaexpress-report` (Kafka), `ms-rutaexpress-bff` (agregador). Publicación de eventos y notificaciones desde `shipments`.
- 2026-09-21 | Compañero/opencode | Fase 1/6 | Frontend React (Vite + TS) con pantallas Dashboard, Envíos y Catálogo (verificado: `npm run build` + `tsc`).
- 2026-09-21 | Compañero/opencode | Fase 7 | Dockerfiles (`Dockerfile.service`, `frontend/Dockerfile`) y `docker-compose.apps.yml` para levantar las apps junto a los brokers.
- 2026-09-21 | Compañero/opencode | Fase 1-4 | BFF ampliado (notificaciones, auditoría, KPIs); `KpiReportDto` movido a `contracts`.
- 2026-09-21 | Compañero/opencode | Fase 6 | Frontend: páginas de Auditoría y Reportería.
- 2026-09-21 | Compañero/opencode | Fase 2 | Tests unitarios de la máquina de estados y de `ShipmentService`.
- 2026-09-21 | Compañero/opencode | Fase 5 | Seguridad: JWT resource server (perfil `secure`) en los 6 servicios, token relay en el BFF y MSAL en el frontend (login + Bearer token).
- 2026-09-21 | Compañero/opencode | Fase 2 | Seeder de datos demo en el catálogo (servicios y flota).

