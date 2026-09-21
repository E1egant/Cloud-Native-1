# Índice de repos

Organización: cuenta `E1egant` en GitHub (privados; colaborador: `lalcaino`). Estado detallado de cada uno en `estado/<repo>.md`.

| Repo | Contenido | Dueño | Puerto local | URL |
|---|---|---|---|---|
| `Cloud-Native-1` | Central: reglas, contratos, estado, planes | ambos | — | https://github.com/E1egant/Cloud-Native-1 |
| `frontend-rutaexpress` | React + MSAL | Diego / Claude | 5173 | https://github.com/E1egant/frontend-rutaexpress |
| `ms-rutaexpress-bff` | BFF, valida JWT, proxy | Diego / Claude | 8080 | https://github.com/E1egant/ms-rutaexpress-bff |
| `ms-rutaexpress-shipments` | Envíos, máquina de estados (Oracle) | Diego / Claude | 8081 | https://github.com/E1egant/ms-rutaexpress-shipments |
| `ms-rutaexpress-notify` | Consumidor RabbitMQ (sin BD) | Diego / Claude | 8083 | https://github.com/E1egant/ms-rutaexpress-notify |
| `ms-rutaexpress-catalog` | Servicios, tarifas, capacidad (Oracle) | compañero / opencode | 8082 | https://github.com/E1egant/ms-rutaexpress-catalog |
| `ms-rutaexpress-audit` | Timeline, consumidor Kafka (Oracle) | compañero / opencode | 8085 | https://github.com/E1egant/ms-rutaexpress-audit |
| `ms-rutaexpress-report` | KPIs, consumidor Kafka (Oracle) | compañero / opencode | 8084 | https://github.com/E1egant/ms-rutaexpress-report |
| `infra` | Compose apps/mq/kafka, Azure AD, API Gateway, EC2 | compañero / opencode | — | https://github.com/E1egant/infra |

Pendientes según la pauta de cada evaluación: `ms-rutaexpress-rabbit-admin` (Diego) y `ms-rutaexpress-kafka-admin` (compañero).

## Contratos vigentes (`contratos/`)

`roles.md` · `api-shipments.md` · `api-catalog.md` · `api-report.md` · `api-audit.md` · `rabbitmq.md` · `kafka.md` · `env-vars.md` · **`diferencias-con-el-caso.md`** (lo que hay que alinear con el enunciado)

## Origen del código

Los servicios shipments, catalog, notify, audit, report e infra vienen del monorepo original (creado por opencode/Deepseek en `Cloud-Native-1`); su historial de commits se conservó al separarlos. Cada servicio se volvió un proyecto Maven independiente (Spring Boot 3.3.5, Java 17) con los DTOs compartidos copiados en `src/main/java/com/rutaexpress/contracts`. `ms-rutaexpress-bff` y `frontend-rutaexpress` son las versiones de Diego/Claude (Boot 4.1.1, Java 21; React + MSAL); las versiones originales del monorepo están en la rama `legacy-monorepo` de cada uno.
