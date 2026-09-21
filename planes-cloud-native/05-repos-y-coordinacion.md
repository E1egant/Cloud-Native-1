# Plan: separar RutaExpress en repos + repo central de coordinación

## Contexto
La EP1 exige entregar enlaces GitHub por componente (frontend + varios microservicios, cada uno con su `.gitignore`). Hoy todo está en el monorepo `Cloud-Native-1` (BFF y frontend ya hechos, 13 commits locales sin push). Ya se crearon 8 repos privados vacíos bajo `E1egant` y se invitó a `lalcaino` con permiso de escritura. Diego (Claude Code) y su compañero (opencode) deben repartirse el trabajo y que el profe vea commits de ambos. `Cloud-Native-1` pasa a ser el repo central de coordinación.

## Decisiones tomadas
- Repo central = `Cloud-Native-1` (sin repo nuevo).
- División por repos completos:

| Diego / Claude | Compañero / opencode |
|---|---|
| `frontend-rutaexpress` | `ms-rutaexpress-catalog` |
| `ms-rutaexpress-bff` | `ms-rutaexpress-audit` |
| `ms-rutaexpress-shipments` | `ms-rutaexpress-report` |
| `ms-rutaexpress-notify` | `infra` (compose apps/mq/kafka, RabbitMQ, Kafka, Azure AD, API Gateway, EC2) |

- Administradores RabbitMQ/Kafka: se crean cuando la pauta los pida (rabbit-admin con Diego, kafka-admin con el compañero).
- Repos privados; el docente se agrega como colaborador (o se hacen públicos) antes de entregar.

## Pasos (cada uno = commits atómicos; push solo con confirmación explícita de Diego)

### 1. Migrar BFF y frontend a sus repos (conservando historial)
- `git subtree split --prefix=ms-rutaexpress-bff -b split-bff` y `--prefix=frontend-rutaexpress -b split-frontend`.
- Clonar/inicializar carpeta local hermana por repo (`C:\Users\diego\Desktop\<repo>`), traer la rama split, `remote add origin https://github.com/E1egant/<repo>.git`.
- Verificar en cada uno: BFF `./mvnw test` (8 pruebas), frontend `npm run build`. Cada repo ya trae su `.gitignore`.
- Añadir README propio a cada repo (qué es, variables, cómo levantar).
- Push por repo tras confirmación.

### 2. Convertir `Cloud-Native-1` en el repo central
Nuevo contenido versionado:
- `AGENTS.md`: reglas compartidas (commits atómicos, prefijos, push con confirmación, CHANGELOG, React por indicación del profesor, dueños por repo, `.gitignore` por tecnología, no subir secretos ni `Material Evaluacion/`). opencode lo lee de forma nativa. `CLAUDE.md` local queda como puntero a `AGENTS.md` (reemplaza regla 9 en lo que respecta a compartir reglas).
- `REPOS.md`: índice de repos, dueño, estado, puerto local, URL.
- `contratos/`: `roles.md` (Admin/Despachador/Cliente/Auditor, claim `roles`), `api-shipments.md`, `api-catalog.md`, `api-report.md`, `api-audit.md` (endpoints + DTOs), `rabbitmq.md` (exchanges, 6 colas, envelope), `kafka.md` (tópicos), `env-vars.md` (nombres de variables por servicio, sin valores).
- `estado/`: un archivo por repo (o tabla en `REPOS.md`) con "qué hay, qué falta, bloqueos" que cada agente actualiza.
- `CHANGELOG.md` sigue siendo el historial compartido; `planes-cloud-native/` se mantiene (plan 02 = este plan).
- Quitar `ms-rutaexpress-bff/` y `frontend-rutaexpress/` del repo central en un commit aparte (ya viven en sus repos).
- Ajustar `.gitignore` central: ya no ignora `CLAUDE.md`? Se mantiene ignorado; `AGENTS.md` sí se versiona.
- README central: índice y flujo de trabajo.
- Nota: `Cloud-Native-1` es PÚBLICO; no incluir tenant IDs, client IDs reales ni secretos. Recomendar hacerlo privado (decisión de Diego).

### 3. Trabajo de Diego / Claude (repos propios)
- `ms-rutaexpress-shipments`: scaffolding Boot, entidades/repositorios Oracle, máquina de estados (CREADO→ACEPTADO→EN_BODEGA→EN_RUTA→ENTREGADO/CANCELADO, sin EN_RUTA sin ACEPTADO), filtro JWT + roles, tests. Perfil de pruebas con H2 para que compile y pase sin Oracle.
- `ms-rutaexpress-notify`: consumidor RabbitMQ (sin BD), colas email/warehouse/label + DLQ, envelope, ACK/NACK.
- BFF y frontend: ajustar a contratos finales (rutas de auditoría/reportes), y a las variables reales de Azure cuando existan.

### 4. Lo que queda para el compañero / opencode (documentado en `contratos/` y `estado/`)
- `catalog`, `audit`, `report` (mismo patrón de seguridad JWT + Oracle + tests; copiar el filtro del BFF/shipments) e `infra`.
- Azure AD: App Registration, roles de app, scope `access_as_user`, tenant y usuarios de prueba; entregar valores por canal privado, no por git.

### 5. Comunicación entre agentes
Cada sesión empieza con `git pull` del repo central y lectura de `AGENTS.md`, `REPOS.md` y `estado/`. Cada cambio de contrato se hace primero en `contratos/` (commit con prefijo `docs(contrato):`) y luego se implementa en el repo dueño. Al terminar un avance, actualizar `estado/` y `CHANGELOG.md`.

## Archivos críticos
- Origen a migrar: `ms-rutaexpress-bff/` (SecurityConfig, ProxyController, SecurityTests) y `frontend-rutaexpress/` (src/auth, src/api, src/pages).
- Reutilizar como plantilla de seguridad para los demás servicios: `ms-rutaexpress-bff/src/main/java/cl/rutaexpress/bff/security/` (AudienceValidator, JsonSecurityHandlers, SecurityConfig).
- Nuevo en central: `AGENTS.md`, `REPOS.md`, `contratos/*`, `estado/*`, `planes-cloud-native/02-repos-y-coordinacion.md`.

## Verificación
- `git log` de cada repo nuevo muestra el historial migrado; `gh repo view E1egant/<repo>` lista los commits tras el push.
- BFF: `./mvnw test` verde. Frontend: `npm run build` sin errores.
- Repo central: sin carpetas de código; `AGENTS.md`, `REPOS.md`, `contratos/` presentes; opencode (compañero) puede clonar y leer las reglas.
- Confirmar con `gh api repos/E1egant/<repo>/collaborators` que `lalcaino` figura tras aceptar la invitación.
