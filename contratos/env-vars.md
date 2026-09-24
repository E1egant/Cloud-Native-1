# Variables de entorno por servicio (solo nombres; los valores NO van en git)

Cada repo tiene `.env.example` con `<PLACEHOLDER>` y `.env` en su `.gitignore`.

| Servicio | Puerto | Variables |
|---|---|---|
| `ms-rutaexpress-bff` | 8080 | `AZURE_TENANT_ID`, `AZURE_API_AUDIENCE`, `ALLOWED_ORIGINS`, `SHIPMENTS_URL`, `CATALOG_URL`, `AUDIT_URL`, `REPORT_URL` |
| `ms-rutaexpress-shipments` | 8081 | `AZURE_TENANT_ID`, `RABBITMQ_HOST/PORT/USER/PASSWORD`, `KAFKA_BOOTSTRAP_SERVERS`, `DB_HOST/PORT/NAME/USER/PASSWORD` |
| `ms-rutaexpress-catalog` | 8082 | `AZURE_TENANT_ID`, `AZURE_API_AUDIENCE`, `DB_*` |
| `ms-rutaexpress-notify` | 8083 | `AZURE_TENANT_ID`, `RABBITMQ_*`, `DB_*` |
| `ms-rutaexpress-report` | 8084 | `AZURE_TENANT_ID`, `AZURE_API_AUDIENCE`, `KAFKA_BOOTSTRAP_SERVERS` |
| `ms-rutaexpress-audit` | 8085 | `AZURE_TENANT_ID`, `AZURE_API_AUDIENCE`, `KAFKA_BOOTSTRAP_SERVERS`, `DB_*` |
| `frontend-rutaexpress` | 5173 | `VITE_TENANT_ID`, `VITE_SPA_CLIENT_ID`, `VITE_API_SCOPE`, `VITE_API_BASE_URL` |

Perfiles Spring de los servicios de dominio: por defecto H2 sin seguridad (dev); `secure` activa el JWT; `prod` usa PostgreSQL.
