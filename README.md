# Cloud-Native-1 — RutaExpress (repo central)

Plataforma unificada de envíos de última milla para una red de couriers PyME: creación y seguimiento de envíos, notificaciones al destinatario y a bodega, panel de operaciones y auditoría de eventos logísticos.

Este repo **no contiene código de los servicios**: es el punto de coordinación entre las dos personas y sus agentes de IA (Claude Code y opencode). El código vive en un repo por componente.

## Repos del proyecto

| Repo | Contenido | Dueño |
|---|---|---|
| [frontend-rutaexpress](https://github.com/E1egant/frontend-rutaexpress) | React + MSAL | Diego / Claude |
| [ms-rutaexpress-bff](https://github.com/E1egant/ms-rutaexpress-bff) | BFF: valida JWT y hace proxy | Diego / Claude |
| [ms-rutaexpress-shipments](https://github.com/E1egant/ms-rutaexpress-shipments) | Envíos y máquina de estados | Diego / Claude |
| [ms-rutaexpress-notify](https://github.com/E1egant/ms-rutaexpress-notify) | Notificaciones vía RabbitMQ | Diego / Claude |
| [ms-rutaexpress-catalog](https://github.com/E1egant/ms-rutaexpress-catalog) | Servicios, tarifas y capacidad | compañero / opencode |
| [ms-rutaexpress-audit](https://github.com/E1egant/ms-rutaexpress-audit) | Timeline de auditoría (Kafka) | compañero / opencode |
| [ms-rutaexpress-report](https://github.com/E1egant/ms-rutaexpress-report) | KPIs (Kafka) | compañero / opencode |
| [infra](https://github.com/E1egant/infra) | Docker Compose, RabbitMQ, Kafka, Azure AD, API Gateway, EC2 | compañero / opencode |

Índice completo con puertos: `REPOS.md`.

## Arquitectura

`JWT (Azure AD) → AWS API Gateway → ms-rutaexpress-bff → microservicio de dominio`, con RabbitMQ para colas de trabajo (notify) y Kafka para streaming (audit, report). Frontend en React (especificado por el profesor). Despliegue en AWS EC2 con Docker Compose.

## Qué hay en este repo

```
.
├── AGENTS.md              # Reglas compartidas para ambos agentes (leer primero)
├── REPOS.md               # Índice de repos, dueños y puertos
├── contratos/             # Endpoints/DTOs, roles, RabbitMQ, Kafka, variables de entorno
├── estado/                # Un archivo por repo: hecho / falta / bloqueos
├── tareas/                # Qué hace cada persona: companero-opencode.md, diego-claude.md
├── planes-cloud-native/   # Planes de cada fase
└── CHANGELOG.md           # Historial de avances por push
```

## Estado

Los servicios se separaron del monorepo original a un repo por componente (historial conservado). BFF y frontend cumplen la base de la EP1 (JWT con audience y roles, login MSAL). Falta alinear los servicios de dominio con el enunciado: ver `contratos/diferencias-con-el-caso.md` y `estado/`.
