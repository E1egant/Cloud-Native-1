# Cloud-Native-1 — RutaExpress (repo central)

Plataforma unificada de envíos de última milla para una red de couriers PyME: creación y seguimiento de envíos, notificaciones al destinatario y a bodega, panel de operaciones y auditoría de eventos logísticos.

Este repo **no contiene código de los servicios**: es el punto de coordinación entre Diego Miranda (con Claude Code) y Lucas Alcaino (con opencode). El código vive en un repo por componente.

## Repos del proyecto

Central: este repo (`Cloud-Native-1`). Componentes (9 repos de código):

| Repo | Contenido | Dueño |
|---|---|---|
| [frontend-rutaexpress](https://github.com/E1egant/frontend-rutaexpress) | React + MSAL | Diego / Claude |
| [ms-rutaexpress-bff](https://github.com/E1egant/ms-rutaexpress-bff) | BFF: valida JWT y hace proxy | Diego / Claude |
| [ms-rutaexpress-shipments](https://github.com/E1egant/ms-rutaexpress-shipments) | Envíos y máquina de estados | Diego / Claude |
| [ms-rutaexpress-notify](https://github.com/E1egant/ms-rutaexpress-notify) | Consumidores RabbitMQ (email, bodega, etiqueta) con ACK y DLQ | Diego / Claude |
| [ms-rutaexpress-rabbit-admin](https://github.com/E1egant/ms-rutaexpress-rabbit-admin) | Administrador REST de RabbitMQ (colas, exchanges, bindings) | Diego / Claude |
| [ms-rutaexpress-catalog](https://github.com/E1egant/ms-rutaexpress-catalog) | Servicios, tarifas y capacidad | Lucas Alcaino / opencode |
| [ms-rutaexpress-audit](https://github.com/E1egant/ms-rutaexpress-audit) | Timeline de auditoría (Kafka) | Lucas Alcaino / opencode |
| [ms-rutaexpress-report](https://github.com/E1egant/ms-rutaexpress-report) | KPIs (Kafka) | Lucas Alcaino / opencode |
| [infra](https://github.com/E1egant/infra) | Docker Compose, RabbitMQ, Kafka, Azure AD, API Gateway, EC2 | Lucas Alcaino / opencode |

Índice completo con puertos: `REPOS.md`. Pendiente según la pauta: `ms-rutaexpress-kafka-admin` (Lucas Alcaino).

Cómo probar la entrega de RabbitMQ (EP3/EP4): `PRUEBAS.md`.

## Arquitectura

`JWT (Azure AD) → AWS API Gateway → ms-rutaexpress-bff → microservicio de dominio`, con RabbitMQ para colas de trabajo (notify) y Kafka para streaming (audit, report). Frontend en React (especificado por el profesor). Despliegue en AWS EC2 con Docker Compose.

## Qué hay en este repo

```
.
├── AGENTS.md              # Reglas compartidas para ambos agentes (leer primero)
├── REPOS.md               # Índice de repos, dueños y puertos
├── PRUEBAS.md             # Cómo verificar la entrega de RabbitMQ (3 niveles)
├── contratos/             # Endpoints/DTOs, roles, RabbitMQ, Kafka, variables de entorno
├── estado/                # Un archivo por repo: hecho / falta / bloqueos
├── tareas/                # Qué hace cada persona: companero-opencode.md, diego-claude.md
├── planes-cloud-native/   # Planes de cada fase
└── CHANGELOG.md           # Historial de avances por push
```

## Estado

Los servicios se separaron del monorepo original a un repo por componente (historial conservado). BFF y frontend cumplen la base de la EP1 (JWT con audience y roles, login MSAL). Falta alinear los servicios de dominio con el enunciado: ver `contratos/diferencias-con-el-caso.md` y `estado/`.
