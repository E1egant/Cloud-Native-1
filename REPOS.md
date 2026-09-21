# Índice de repos

Organización: cuenta `E1egant` en GitHub (privados; colaborador: `lalcaino`). Estado detallado de cada uno en `estado/<repo>.md`.

| Repo | Contenido | Dueño | Puerto local | URL |
|---|---|---|---|---|
| `Cloud-Native-1` | Central: reglas, contratos, estado, planes | ambos | — | https://github.com/E1egant/Cloud-Native-1 |
| `frontend-rutaexpress` | React + MSAL | Diego / Claude | 5173 | https://github.com/E1egant/frontend-rutaexpress |
| `ms-rutaexpress-bff` | BFF, valida JWT, proxy | Diego / Claude | 8080 | https://github.com/E1egant/ms-rutaexpress-bff |
| `ms-rutaexpress-shipments` | Envíos, máquina de estados (Oracle) | Diego / Claude | 8081 | https://github.com/E1egant/ms-rutaexpress-shipments |
| `ms-rutaexpress-notify` | Consumidor RabbitMQ (sin BD) | Diego / Claude | 8085 | https://github.com/E1egant/ms-rutaexpress-notify |
| `ms-rutaexpress-catalog` | Servicios, tarifas, capacidad (Oracle) | compañero / opencode | 8082 | https://github.com/E1egant/ms-rutaexpress-catalog |
| `ms-rutaexpress-audit` | Timeline, consumidor Kafka (Oracle) | compañero / opencode | 8083 | https://github.com/E1egant/ms-rutaexpress-audit |
| `ms-rutaexpress-report` | KPIs, consumidor Kafka (Oracle) | compañero / opencode | 8084 | https://github.com/E1egant/ms-rutaexpress-report |
| `infra` | Compose apps/mq/kafka, Azure AD, API Gateway, EC2 | compañero / opencode | — | https://github.com/E1egant/infra |

Pendientes según la pauta de cada evaluación: `ms-rutaexpress-rabbit-admin` (Diego) y `ms-rutaexpress-kafka-admin` (compañero).

## Contratos vigentes (`contratos/`)

`roles.md` · `api-shipments.md` · `api-catalog.md` · `api-report.md` · `api-audit.md` · `rabbitmq.md` · `kafka.md` · `env-vars.md`
