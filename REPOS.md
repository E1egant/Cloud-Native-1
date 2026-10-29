# Índice de repos

Organización: cuenta `E1egant` en GitHub (privados; colaborador: `lalcaino` (Lucas Alcaino)). Estado detallado de cada uno en `estado/<repo>.md`.

| Repo | Contenido | Responsable | Puerto local | URL |
|---|---|---|---|---|
| `Cloud-Native-1` | Central: reglas, contratos, estado, planes | ambos | — | https://github.com/E1egant/Cloud-Native-1 |
| `frontend-rutaexpress` | React + MSAL | Diego Miranda | 5173 | https://github.com/E1egant/frontend-rutaexpress |
| `ms-rutaexpress-bff` | BFF, valida JWT, proxy | Diego Miranda | 8080 | https://github.com/E1egant/ms-rutaexpress-bff |
| `ms-rutaexpress-shipments` | Envíos, máquina de estados (Oracle) | Diego Miranda | 8081 | https://github.com/E1egant/ms-rutaexpress-shipments |
| `ms-rutaexpress-notify` | Consumidor RabbitMQ (sin BD) | Diego Miranda | 8083 | https://github.com/E1egant/ms-rutaexpress-notify |
| `ms-rutaexpress-catalog` | Servicios, tarifas, capacidad (Oracle) | Lucas Alcaino | 8082 | https://github.com/E1egant/ms-rutaexpress-catalog |
| `ms-rutaexpress-audit` | Timeline, consumidor Kafka (Oracle) | Lucas Alcaino | 8085 | https://github.com/E1egant/ms-rutaexpress-audit |
| `ms-rutaexpress-report` | KPIs, consumidor Kafka (Oracle) | Lucas Alcaino | 8084 | https://github.com/E1egant/ms-rutaexpress-report |
| `ms-rutaexpress-rabbit-admin` | Administrador REST de RabbitMQ (colas, exchanges, bindings) | Diego Miranda | 8087 | https://github.com/E1egant/ms-rutaexpress-rabbit-admin |
| `infra` | Compose apps/mq/kafka, Azure AD, API Gateway, EC2 | Lucas Alcaino | — | https://github.com/E1egant/infra |

Pendiente según la pauta: `ms-rutaexpress-kafka-admin` (Lucas Alcaino). `ms-rutaexpress-rabbit-admin` (Diego, puerto 8087) creado y subido el 2026-10-28.

## Tareas

`tareas/lucas-alcaino.md` (contexto, setup y tareas priorizadas de Lucas Alcaino) y `tareas/diego-miranda.md`.

## Contratos vigentes (`contratos/`)

`roles.md` · `api-shipments.md` · `api-catalog.md` · `api-report.md` · `api-audit.md` · `rabbitmq.md` · `kafka.md` · `env-vars.md` · **`diferencias-con-el-caso.md`** (lo que hay que alinear con el enunciado)

## Origen del código

Los servicios shipments, catalog, notify, audit, report e infra vienen del monorepo original (en `Cloud-Native-1`); su historial de commits se conservó al separarlos. Cada servicio se volvió un proyecto Maven independiente (Spring Boot 3.3.5, Java 17) con los DTOs compartidos copiados en `src/main/java/com/rutaexpress/contracts`. `ms-rutaexpress-bff` y `frontend-rutaexpress` son las versiones de Diego Miranda (Boot 4.1.1, Java 21; React + MSAL); las versiones originales del monorepo están en la rama `legacy-monorepo` de cada uno.
