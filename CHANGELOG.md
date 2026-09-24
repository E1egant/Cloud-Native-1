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
- 2026-09-21 | Compañero/opencode | Fase 6 | Autorización por roles (`Operador`/`Bodega`/`Admin`): el backend lee roles del JWT y protege endpoints; el frontend oculta pantallas según rol.
- 2026-09-21 | Compañero/opencode | Fase 7 | API Gateway (IaC): plantilla CloudFormation con HTTP API + JWT Authorizer de Azure AD. Plan en `planes-cloud-native/03-fase-7-despliegue.md`.
- 2026-09-21 | Compañero/opencode | Fase 7 | CI con GitHub Actions (backend `mvn test` + frontend `tsc`/build).
- 2026-09-21 | Compañero/opencode | Fase 7 | `deploy.sh` para EC2, compose con perfil `secure` y build args `VITE_AZURE_*` en el Dockerfile del frontend.
- 2026-09-21 | Compañero/opencode | Docs | Corrige cercos de código escapados en guías de infra; actualiza README y CHANGELOG.
- 2026-09-21 | Compañero/opencode | Endurecimiento | Actuator (health) en los 6 servicios y PostgreSQL (perfil `prod`, database-per-service) con compose y `init.sql`.
- 2026-09-21 | Compañero/opencode | Endurecimiento | Plantilla ALB (ruteo `/api/*`→BFF, `/*`→frontend) y smoke test e2e (`infra/smoke-test.sh`).
- 2026-09-21 | Compañero/opencode | Fase 6 | Endpoint `/api/bff/me` y hook `useRoles`; el frontend oculta la creación de envíos al rol `Bodega`.
- 2026-09-21 | Compañero/opencode | Docs | Guía de despliegue paso a paso AWS + Azure en `infra/DESPLIEGUE.md`.


- 2026-09-21 | Diego/Claude | Reorganización | El monorepo se separó en un repo por componente (frontend, bff, shipments, catalog, notify, audit, report, infra) conservando el historial de opencode; cada servicio es ahora un proyecto Maven independiente con sus DTOs copiados. `Cloud-Native-1` queda como repo central (AGENTS.md, REPOS.md, contratos/, estado/). Diferencias con el caso en `contratos/diferencias-con-el-caso.md`. Versiones originales de BFF y frontend en la rama `legacy-monorepo` de cada repo.
- 2026-09-21 | Diego/Claude | Pruebas y guía | Todos los repos tienen pruebas (catalog 17, audit 9, report 9, notify 7, shipments 14, bff 14, frontend 10). BFF y frontend alineados con la API real de los servicios. Corregido `audience`→`audiences` en shipments y notify (en catalog/audit/report queda como tarea T2). Guía y tareas para el compañero en `tareas/companero-opencode.md`.

- 2026-09-23 | Diego/Claude | Pre-demo | Decisiones cerradas: estados en inglés + `PATCH` (D2) y BFF con proxy 1:1 (D6), documentadas en `contratos/diferencias-con-el-caso.md`. Frontend: vistas reales de Catálogo/Reportería/Auditoría (ya no JSON crudo); `Dockerfile`+`nginx.conf`. `Dockerfile` standalone (sin depender del monorepo), `.env.example` y CI (GitHub Actions) en bff, shipments y notify. Notify: idempotencia por `messageId` para no duplicar notificaciones en redelivery (8 pruebas, antes 7). Todos los repos de Diego siguen en verde: shipments 14, bff 14, notify 8, frontend 10 (`npm test` + `npm run build`).

- 2026-09-24 | Compañero/opencode | contratos | PUT services y reserve de capacidad en `api-catalog.md`; filas de audience y capacidad al día.
- 2026-09-24 | Compañero/opencode | ms-rutaexpress-catalog | `PUT /services/{id}` y `POST /fleet/{id}/reserve` con contadores (33 pruebas verdes); fix `audiences` T2.
- 2026-09-24 | Compañero/opencode | ms-rutaexpress-audit, ms-rutaexpress-report | Fix `audiences` T2 (9 pruebas verdes en cada uno).
- 2026-09-24 | Compañero/opencode | infra | Topología RabbitMQ del caso (3 colas + DLQ + exchanges vía `definitions.json`; cola legacy intacta).
- 2026-09-24 | Compañero/opencode | ms-rutaexpress-audit | Filtros shipmentId/status/actor/from/to, rol Auditor y actor en eventos; consumidor dual-topic (16 pruebas verdes).
- 2026-09-24 | Compañero/opencode | ms-rutaexpress-report | Métricas hourly/leadtime/top-services con range (18 pruebas verdes).
- 2026-09-24 | Compañero/opencode | catalog, audit, report | `Dockerfile` propio, mvnw ejecutable y CI de GitHub Actions en los 3.
- 2026-09-24 | Compañero/opencode | infra | Compose por repos hermanos, Dockerfiles genéricos, deploy con perfil seguro y CI (T3, T7, T8); plantilla API Gateway verificada (T4).
