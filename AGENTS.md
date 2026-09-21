# AGENTS.md — Reglas compartidas de RutaExpress

Leen este archivo los dos agentes: **Claude Code** (Diego) y **opencode** (`lalcaino`). Es la fuente de verdad de las reglas de trabajo. `Cloud-Native-1` es el repo **central**: aquí solo hay coordinación (reglas, contratos, estado, planes, changelog), nunca código de los servicios.

## Al iniciar cada sesión

1. `git pull` en este repo.
2. Leer `AGENTS.md`, `REPOS.md`, `estado/<tu repo>.md` y los `contratos/` que toques.
3. Leer el final de `CHANGELOG.md` para ver qué hizo el otro.

## Repos y dueños

Cada repo tiene un dueño; solo el dueño hace commits en él (así ambos aparecen trabajando ante el docente). Si necesitas algo de un repo ajeno, se pide vía `contratos/` o `estado/`, no editando su código. Tabla completa en `REPOS.md`.

| Diego / Claude | Compañero / opencode |
|---|---|
| `frontend-rutaexpress`, `ms-rutaexpress-bff`, `ms-rutaexpress-shipments`, `ms-rutaexpress-notify` | `ms-rutaexpress-catalog`, `ms-rutaexpress-audit`, `ms-rutaexpress-report`, `infra` |

## Decisiones fijas

- **Frontend en React** (`@azure/msal-react`), no Angular: lo especificó el profesor. Donde la rúbrica diga Angular, `MsalInterceptor` o guards, se usa el equivalente en React. No cuestionar ni reconfirmar.
- Backend: Spring Boot 4.1, Java 21, Maven (`mvnw` incluido). BD Oracle (perfil de test con H2 para compilar/probar sin Oracle).
- Seguridad: JWT de Azure AD validado en API Gateway, BFF y en cada microservicio (firma, vigencia, `issuer`, `audience`, rol). Plantilla: `ms-rutaexpress-bff/.../security/`.
- Flujo: `JWT → API Gateway → ms-rutaexpress-bff → microservicio de dominio`.

## Reglas de trabajo

1. **Commits atómicos**: un cambio por commit, con mensaje claro y prefijo `feat:`, `fix:`, `docs:`, `test:`, `chore:`, `infra:` (opcional alcance: `feat(bff): …`). El otro agente debe entender qué pasó solo leyendo `git log`.
2. **Push solo con confirmación explícita del usuario** (cada agente confirma con su persona, antes de cada push).
3. **Cambios de contrato primero en este repo** (`docs(contrato): …`) y después se implementan en el repo dueño. Un contrato nunca se cambia solo en el código.
4. **Documentar cada avance**: tras un push, actualizar `estado/<repo>.md` y agregar una línea en `CHANGELOG.md` (`- YYYY-MM-DD | autor | repo | resumen`).
5. **Planes** en `planes-cloud-native/NN-nombre.md` (versionados aquí).
6. **`.gitignore` por tecnología** en cada repo (Java: `target/`; Node: `node_modules/`, `dist/`; siempre `.env`). Solo se sube lo que corresponde a esa tecnología.
7. **Nunca subir secretos**: tenant IDs reales, client IDs, secretos, contraseñas de Oracle/RabbitMQ. Los valores se comparten por canal privado; en git solo `.env.example` con `<PLACEHOLDER>`.
8. **No se sube** `Material Evaluacion/` (enunciados, rúbricas) ni `CLAUDE.md` local.
9. **README de cada repo siempre actualizado** (qué hace, variables, cómo levantarlo). El README de este repo lleva el índice general.
10. **Requisito mínimo de calidad**: el repo compila y `./mvnw test` / `npm run build` pasan antes de cada push.

## Evaluaciones (resumen)

- **EP1 (16%)**: entrega de enlaces GitHub. Backend compila, con pruebas básicas, BD cloud, filtros JWT; frontend con login IDaaS y JWT en cada llamada. Rúbrica: MSAL/frontend 60%, BFF valida token 40%.
- **EP2 (24%)**: presentación 5–10 min. API Gateway en la nube con rutas y CORS, JWT válido/ inválido (200/401/403), tenant y usuarios en Azure AD, login con Authorization Code + PKCE, todo desplegado.
