# Cloud-Native-1 — RutaExpress

Plataforma unificada de envíos de última milla para una red de couriers PyME: creación y seguimiento de envíos, notificaciones al destinatario y a bodega, panel de operaciones en tiempo real y auditoría de eventos logísticos.

## Estado del proyecto

**Fase 0 — Setup** (en progreso): estructura del repositorio y reglas de colaboración.

## Stack

- **Frontend**: React (nota: el caso de evaluación original pide Angular; el equipo decidió usar React).
- **Backend**: Spring Boot, microservicios detrás de un BFF y de AWS API Gateway.
  - `ms-rutaexpress-shipments` — CRUD de envíos y máquina de estados.
  - `ms-rutaexpress-catalog` — servicios de envío, tarifas y capacidad de flota.
  - `ms-rutaexpress-notify` — notificaciones (email/push, ticket de bodega) vía RabbitMQ.
  - `ms-rutaexpress-report` — KPIs y analítica, consumidor de Kafka.
  - `ms-rutaexpress-audit` — timeline de auditoría, consumidor de Kafka.
  - `ms-rutaexpress-bff` — backend-for-frontend detrás del API Gateway.
- **Identidad**: Azure AD (IDaaS) con JWT validado en AWS API Gateway y en cada microservicio.
- **Mensajería**: RabbitMQ (colas de trabajo) y Kafka (streaming de eventos/auditoría).
- **Infraestructura**: AWS EC2 con Docker / Docker Compose.

## Equipo y forma de trabajo

Este proyecto lo desarrollan dos personas, cada una con su propio agente de IA:

- Backend + Frontend: a cargo de Diego, con Claude Code.
- Infraestructura (Docker, RabbitMQ, Kafka, Azure AD, API Gateway, despliegue EC2): a cargo de su compañero, con opencode.

Las reglas de colaboración y la división detallada están en `CLAUDE.md` (no versionado en este repo). El registro de avances por push está en `CHANGELOG.md`. Los planes de cada fase se documentan en `planes-cloud-native/`.

## Estructura del repositorio

```
.
├── planes-cloud-native/   # Planes de cada fase/implementación
├── CHANGELOG.md           # Historial de avances por push
├── README.md
└── .gitignore
```

*(Se irá completando con las carpetas de cada microservicio y del frontend a medida que avancen las fases.)*
