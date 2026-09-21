# Guía para el compañero (opencode) — leer primero

Última actualización: 2026-09-21 · Escrita por Diego/Claude. Si algo de aquí ya no es cierto, corrígelo en este archivo (commit `docs:`) para que Diego y su agente lo vean.

## 1. Qué pasó y por qué el repo cambió

- **El profesor exige un repo por componente** (EP1: "enlaces a GitHub", cada repo con su `.gitignore`). Por eso el monorepo `Cloud-Native-1` se separó el 2026-09-21. `Cloud-Native-1` ahora es solo el **repo central de coordinación** (reglas, contratos, estado, tareas): aquí no hay código.
- **Tu trabajo se conservó completo**: shipments, catalog, notify, audit, report e infra salieron con `git subtree split`, así que **tus commits siguen ahí con tu autoría**.
- **Cada servicio es un proyecto Maven independiente.** Ya no existen el `pom.xml` padre ni el módulo `contracts`: cada repo trae su `mvnw`, usa `spring-boot-starter-parent` 3.3.5 directo y tiene **copiados** los DTOs que usa en `src/main/java/com/rutaexpress/contracts` (mismo paquete, no cambió ningún `import`). Si cambia un DTO compartido, se cambia en cada repo que lo usa **y** en `contratos/`.
- **Tu BFF y tu frontend originales** están en la rama **`legacy-monorepo`** de `ms-rutaexpress-bff` y `frontend-rutaexpress`. La rama `main` de esos dos repos es la versión de Diego, porque la rúbrica de la EP1 (60% MSAL en el frontend, 40% BFF que valida el token) los evalúa a ellos: el BFF valida firma, vigencia, `issuer` **y `audience`**, autoriza por rol y responde 401/403 en JSON; el frontend usa `@azure/msal-react`. Diego los alineó con **tu** API real (PATCH de estado, `/api/reports`, estados en inglés, roles `Operador`/`Bodega`). Si en tu versión hay algo útil (Dockerfile, nginx, `/me`), tráelo a `main` en un commit propio.
- **React (no Angular)** es requisito del profesor. No se reabre.
- **Diego tocó en tus repos solo lo mecánico**: pom independiente, contratos copiados, pruebas, README y (en shipments/notify) el arreglo de `audiences`. No cambió la lógica de negocio.
- Se quitó el CI del monorepo (`.github/workflows/ci.yml`) porque asumía la estructura vieja: **falta un CI por repo** (tarea T7).

## 2. Empezar (10 minutos)

Acepta las invitaciones a los 9 repos de `github.com/E1egant` (llegan por correo) y clónalos en una misma carpeta:

```bash
mkdir rutaexpress && cd rutaexpress
for r in Cloud-Native-1 frontend-rutaexpress ms-rutaexpress-bff ms-rutaexpress-shipments ms-rutaexpress-catalog \
         ms-rutaexpress-notify ms-rutaexpress-audit ms-rutaexpress-report infra; do
  git clone https://github.com/E1egant/$r.git
done
```

Antes de trabajar: `git pull` en **Cloud-Native-1** y lee `AGENTS.md`, `REPOS.md`, `contratos/diferencias-con-el-caso.md` y `estado/<tu repo>.md`. `opencode.json` ya carga `AGENTS.md`. Requisitos: Java 17+ (los `mvnw` bajan Maven solos) y Node 20+.

## 3. Cómo trabajamos (resumen; reglas completas en `AGENTS.md`)

- **Tus repos:** `ms-rutaexpress-catalog`, `ms-rutaexpress-audit`, `ms-rutaexpress-report`, `infra`. Solo tú haces commits ahí; Diego hace los suyos (`frontend`, `bff`, `shipments`, `notify`). Así el profe ve trabajo de los dos.
- Commits atómicos con prefijo (`feat:`, `fix:`, `test:`, `docs:`, `infra:`); mensaje que explique el porqué.
- **Push solo con confirmación de tu persona.**
- Si cambias un contrato, primero en `contratos/` (`docs(contrato): …`), después en el código.
- Al terminar un avance: actualiza `estado/<repo>.md` y agrega una línea a `CHANGELOG.md`, en el repo central.
- **Nunca** subas secretos, tenant IDs ni client IDs reales: van por canal privado y en git solo `.env.example` con `<PLACEHOLDER>`.

## 4. Estado de las pruebas (`./mvnw test` en cada repo, sin brokers ni BD externos)

| Repo | Pruebas | Qué cubren |
|---|---|---|
| `ms-rutaexpress-catalog` | 17 | servicio, API (H2), seguridad `secure` |
| `ms-rutaexpress-audit` | 9 | servicio, consumidor Kafka (JSON válido/inválido), seguridad |
| `ms-rutaexpress-report` | 9 | KPIs, consumidor Kafka, seguridad |
| `ms-rutaexpress-notify` (Diego) | 7 | servicio, listener RabbitMQ, seguridad |
| `ms-rutaexpress-shipments` (Diego) | 14 | máquina de estados (tuyas), servicio, seguridad |
| `ms-rutaexpress-bff` (Diego) | 14 | 401/403/roles, firma RSA, expiración, issuer, audience |
| `frontend-rutaexpress` (Diego) | 10 (`npm test`) | roles, rutas protegidas, cliente con Bearer |
| `infra` | ninguna automática | solo `smoke-test.sh` (necesita el stack levantado) |

Regla: **no se hace push si `./mvnw test` falla**. Cuando agregues funcionalidad, agrega su prueba en el mismo commit o en uno `test:` contiguo. Las pruebas de seguridad simulan el JWT con `jwt()` (spring-security-test); no necesitan Azure.

## 5. Tus tareas, en orden de prioridad

### P0 — bloquean la EP1/EP2

**T1 · Azure AD (`infra/azure-ad`) — la más urgente, sin esto nadie puede probar el login real.**
- Crear el **tenant** (o usar el existente) y usuarios de prueba.
- **App Registration de la API**: Application ID URI `api://<API_CLIENT_ID>`, scope `access_as_user`, y **App Roles** con estos valores exactos: `Admin`, `Operador`, `Bodega`, `Cliente`, `Auditor` (`Despachador` del caso = `Operador`). Asignar al menos un usuario de prueba por rol.
- **App Registration del SPA**: tipo *Single-page application* (Authorization Code + **PKCE**, sin secreto), redirect URIs `http://localhost:5173` y la URL desplegada; permiso al scope `api://<API_CLIENT_ID>/access_as_user`.
- En el manifest de la API: `accessTokenAcceptedVersion: 2` (así el `issuer` es `https://login.microsoftonline.com/<TENANT_ID>/v2.0`, que es lo que validan los servicios).
- **Hecho cuando:** un usuario inicia sesión en el frontend local y el token trae `aud = api://<API_CLIENT_ID>`, `iss` v2.0 y `roles`. Pasa a Diego, **por canal privado**, `TENANT_ID`, `API_CLIENT_ID`, `SPA_CLIENT_ID` y el usuario de prueba de cada rol.

**T2 · Validar la audiencia en `catalog`, `audit` y `report`.**
- Bug encontrado por Diego: `application.yml` usa `audience: ${AZURE_CLIENT_ID}` y **esa propiedad no existe en Spring Boot** (es `audiences`), así que hoy los servicios aceptan un token emitido para *cualquier* API del tenant. La rúbrica pide validar `audience`.
- Cambio (perfil `secure`, en cada `application.yml`): `audience: ${AZURE_CLIENT_ID}` → `audiences: ${AZURE_API_AUDIENCE}` (valor `api://<API_CLIENT_ID>`). Ya está hecho en `shipments` y `notify`; usa esos como modelo. Las pruebas ya definen `AZURE_API_AUDIENCE`, no hace falta tocarlas.
- **Hecho cuando:** `./mvnw test` pasa y un token con otra `aud` recibe 401 (probar con Postman contra el perfil `secure`).

**T3 · Infra para repos separados (`infra`).**
- `docker-compose.apps.yml` y `Dockerfile.service` usan `context: ..` y `infra/Dockerfile.service` del monorepo: **hoy no construyen**. Opciones: `build.context` con URL git de cada repo (repos privados: necesita token), o clonar los repos al lado de `infra/` y apuntar a `../ms-rutaexpress-*`. Un `Dockerfile` por repo (multi-stage con `./mvnw -q package`) es lo más limpio.
- Ajustar `deploy.sh`, `smoke-test.sh` y `DESPLIEGUE.md`. Los puertos reales: bff 8080, shipments 8081, catalog 8082, notify 8083, report 8084, audit 8085, frontend 5173.
- **Hecho cuando:** `docker compose -f docker-compose.base.yml -f docker-compose.apps.yml up --build` levanta todo desde los repos separados y `smoke-test.sh` pasa.

**T4 · API Gateway apuntando al BFF (`infra/api-gateway`).**
- JWT Authorizer con `issuer https://login.microsoftonline.com/<TENANT_ID>/v2.0` y `audience api://<API_CLIENT_ID>`; rutas `/api/*` → BFF (8080); **CORS** con el origen del frontend, métodos `GET, POST, PUT, PATCH, DELETE, OPTIONS` y headers `Authorization, Content-Type` (el BFF usa PATCH).
- **Hecho cuando:** con token válido responde 200, sin token 401, y con rol sin permiso 403 (esto es lo que se muestra en la presentación de la EP2).

### P1 — alinear con el caso (ver `contratos/diferencias-con-el-caso.md`, una fila por punto)

| # | Tarea | Repo |
|---|---|---|
| T5 | `catalog`: agregar `PUT /api/catalog/services/{id}`; que la capacidad disminuya al aceptar un envío (definir con Diego el endpoint `reserve` y anotarlo en `contratos/api-catalog.md` primero) | catalog |
| T6 | `audit`: filtros usuario/fechas/tipo de evento, rol `Auditor` (hoy solo `Admin`), tópicos `shipments.events` y `audit.timeline` | audit |
| T6b | `report`: envíos por hora, lead time, top-services (`/api/reports/top-services?range=`), rango `range=` | report |
| T6c | `infra`: RabbitMQ con las 3 colas + 3 DLQ y 3 exchanges (`contratos/rabbitmq.md`), Kafka 3 brokers + Zookeeper + Kafka UI, tópicos del caso | infra |
| T7 | CI de GitHub Actions **por repo** (`./mvnw -B test`), en `.github/workflows/ci.yml` de catalog, audit, report; en infra un job que valide los compose (`docker compose config`) | catalog, audit, report, infra |
| T8 | Perfil por defecto: hoy `dev` deja todo **sin seguridad**. Documentar/forzar `SPRING_PROFILES_ACTIVE=prod,secure` en el compose de despliegue | infra, catalog, audit, report |

Los ajustes equivalentes en `shipments` (estados del caso, `PUT`) y `notify` (3 colas, sin BD) son de Diego; no los toques.

### P2 — decisiones que **no** son tuyas ni de Diego solos

- **Base de datos:** el caso dice Oracle; el código usa H2 (dev) y PostgreSQL (`prod`). Diego lo consulta con el profesor. Mientras tanto se mantiene PostgreSQL.
- **Estados del envío** en español del caso (`CREADO → ACEPTADO → EN_BODEGA → EN_RUTA → ENTREGADO/CANCELADO`) o en inglés como hoy: se decide entre ambos y se anota en `contratos/api-shipments.md` antes de tocar código.
- **Roles:** propuesta vigente = `Admin`, `Operador`, `Bodega`, `Cliente`, `Auditor` (`Despachador` = `Operador`). Si no estás de acuerdo, cámbialo en `contratos/roles.md` y avisa.

## 6. Antes de cada push (lista)

1. `git pull` en el repo (por si hay commits del otro).
2. `./mvnw test` (o `npm test`) en verde.
3. Sin secretos ni `.env`; `git status` limpio de archivos generados (`target/`, `node_modules/`).
4. README del repo al día si cambiaste variables, endpoints o cómo se levanta.
5. Confirmación de tu persona; luego `estado/<repo>.md` y `CHANGELOG.md` en el central.

## 7. Preguntas frecuentes

- **¿Por qué el BFF y el frontend "no son los míos"?** Porque la rúbrica de la EP1 los evalúa con criterios muy concretos (audience, 401/403, MSAL con roles) y Diego los construyó contra esa rúbrica. Tu versión sigue en `legacy-monorepo`.
- **¿Por qué versiones distintas de Spring Boot?** El BFF usa Boot 4.1.1/Java 21 (generado hoy con Initializr); los servicios que tú creaste siguen en Boot 3.3.5/Java 17. Funcionan juntos porque solo se hablan por HTTP; no las mezcles en un mismo repo.
- **¿Dónde está `contracts`?** Copiado en cada repo (`src/main/java/com/rutaexpress/contracts`); la fuente de verdad documental es `contratos/` de este repo.
- **¿Por qué las pruebas usan `jwt()` y no un token de Azure?** Para que corran en cualquier máquina y en CI. El flujo real con Azure se prueba a mano cuando T1 esté lista.
- **¿Y si algo choca con lo que dice el enunciado?** Manda `contratos/diferencias-con-el-caso.md`: agrega la fila, propón el cambio y avisa a Diego.
