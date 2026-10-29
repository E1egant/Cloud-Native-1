# Cloud-Native-1 — RutaExpress (repo central)

Plataforma unificada de envíos de última milla para una red de couriers PyME: creación y seguimiento de envíos, notificaciones al destinatario y a bodega, panel de operaciones y auditoría de eventos logísticos.

Este repo **no contiene código de los servicios**: es el punto de coordinación entre Diego Miranda y Lucas Alcaino. El código vive en un repo por componente.

## Repos del proyecto

Central: este repo (`Cloud-Native-1`). Componentes (9 repos de código):

| Repo | Contenido | Responsable |
|---|---|---|
| [frontend-rutaexpress](https://github.com/E1egant/frontend-rutaexpress) | React + MSAL | Diego Miranda |
| [ms-rutaexpress-bff](https://github.com/E1egant/ms-rutaexpress-bff) | BFF: valida JWT y hace proxy | Diego Miranda |
| [ms-rutaexpress-shipments](https://github.com/E1egant/ms-rutaexpress-shipments) | Envíos y máquina de estados | Diego Miranda |
| [ms-rutaexpress-notify](https://github.com/E1egant/ms-rutaexpress-notify) | Consumidores RabbitMQ (email, bodega, etiqueta) con ACK y DLQ | Diego Miranda |
| [ms-rutaexpress-rabbit-admin](https://github.com/E1egant/ms-rutaexpress-rabbit-admin) | Administrador REST de RabbitMQ (colas, exchanges, bindings) | Diego Miranda |
| [ms-rutaexpress-catalog](https://github.com/E1egant/ms-rutaexpress-catalog) | Servicios, tarifas y capacidad | Lucas Alcaino |
| [ms-rutaexpress-audit](https://github.com/E1egant/ms-rutaexpress-audit) | Timeline de auditoría (Kafka) | Lucas Alcaino |
| [ms-rutaexpress-report](https://github.com/E1egant/ms-rutaexpress-report) | KPIs (Kafka) | Lucas Alcaino |
| [infra](https://github.com/E1egant/infra) | Docker Compose, RabbitMQ, Kafka, Azure AD, API Gateway, EC2 | Lucas Alcaino |

Índice completo con puertos: `REPOS.md`. Pendiente según la pauta: `ms-rutaexpress-kafka-admin` (Lucas Alcaino).

Cómo probar la entrega de RabbitMQ (EP3/EP4): `PRUEBAS.md`.

## Arquitectura

`JWT (Azure AD) → AWS API Gateway → ms-rutaexpress-bff → microservicio de dominio`, con RabbitMQ para colas de trabajo (notify) y Kafka para streaming (audit, report). Frontend en React (especificado por el profesor). Despliegue en AWS EC2 con Docker Compose.

## Qué hay en este repo

```
.
├── REPOS.md               # Índice de repos, responsables y puertos
├── PRUEBAS.md             # Cómo verificar la entrega de RabbitMQ (3 niveles)
├── contratos/             # Endpoints/DTOs, roles, RabbitMQ, Kafka, variables de entorno
├── estado/                # Un archivo por repo: hecho / falta / bloqueos
├── tareas/                # Qué hace cada persona: lucas-alcaino.md, diego-miranda.md
├── planes-cloud-native/   # Planes de cada fase
└── CHANGELOG.md           # Historial de avances por push
```

## Estado

Los servicios se separaron del monorepo original a un repo por componente (historial conservado). BFF y frontend cumplen la base de la EP1 (JWT con audience y roles, login MSAL). Falta alinear los servicios de dominio con el enunciado: ver `contratos/diferencias-con-el-caso.md` y `estado/`.

## Decisiones del proyecto

- **Frontend en React** (`@azure/msal-react`), no Angular: lo especificó el profesor. Donde la rúbrica diga Angular, `MsalInterceptor` o guards, se usa el equivalente en React. No cuestionar ni reconfirmar.
- Backend: Maven con `mvnw` en cada repo. `ms-rutaexpress-bff`: Spring Boot 4.1.1 / Java 21. Servicios de dominio: Spring Boot 3.3.5 / Java 17. BD: H2 en dev y PostgreSQL en `prod` (el caso pide Oracle: decisión pendiente, ver `contratos/diferencias-con-el-caso.md`).
- Seguridad: JWT de Azure AD validado en API Gateway, BFF y en cada microservicio (firma, vigencia, `issuer`, `audience`, rol). Plantilla con audience, roles y 401/403 en JSON: `ms-rutaexpress-bff/.../security/`. Los servicios de dominio hoy validan solo `issuer` y tienen un perfil dev sin seguridad: hay que alinearlos.
- Los contratos vigentes describen lo **implementado**; lo que falta para cumplir el enunciado está en `contratos/diferencias-con-el-caso.md`.
- Flujo: `JWT → API Gateway → ms-rutaexpress-bff → microservicio de dominio`.

## Normas de trabajo

1. **Commits atómicos**: un cambio por commit, con mensaje claro y prefijo `feat:`, `fix:`, `docs:`, `test:`, `chore:`, `infra:` (opcional alcance: `feat(bff): …`). La otra persona debe entender qué pasó solo leyendo `git log`.
2. **Push solo con confirmación explícita del usuario** (cada integrante confirma con el equipo antes de cada push).
3. **Cambios de contrato primero en este repo** (`docs(contrato): …`) y después se implementan en el repo responsable. Un contrato nunca se cambia solo en el código.
4. **Documentar cada avance**: tras un push, actualizar `estado/<repo>.md` y agregar una línea en `CHANGELOG.md` (`- YYYY-MM-DD | autor | repo | resumen`).
5. **Planes** en `planes-cloud-native/NN-nombre.md` (versionados aquí).
6. **`.gitignore` por tecnología** en cada repo (Java: `target/`; Node: `node_modules/`, `dist/`; siempre `.env`). Solo se sube lo que corresponde a esa tecnología.
7. **Nunca subir secretos**: tenant IDs reales, client IDs, secretos, contraseñas de Oracle/RabbitMQ. Los valores se comparten por canal privado; en git solo `.env.example` con `<PLACEHOLDER>`.
8. **No se sube** `Material Evaluacion/` (enunciados, rúbricas).
9. **README de cada repo siempre actualizado** (qué hace, variables, cómo levantarlo). El README de este repo lleva el índice general.
10. **Requisito mínimo de calidad**: el repo compila y `./mvnw test` (o `npm test` + `npm run build`) pasan antes de cada push. Toda funcionalidad nueva lleva su prueba.

## Evaluaciones (resumen)

- **EP1 (16%)**: entrega de enlaces GitHub. Backend compila, con pruebas básicas, BD cloud, filtros JWT; frontend con login IDaaS y JWT en cada llamada. Rúbrica: MSAL/frontend 60%, BFF valida token 40%.
- **EP2 (24%)**: presentación 5–10 min. API Gateway en la nube con rutas y CORS, JWT válido/ inválido (200/401/403), tenant y usuarios en Azure AD, login con Authorization Code + PKCE, todo desplegado.
