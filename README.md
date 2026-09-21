# Cloud-Native-1 — RutaExpress

Plataforma unificada de envíos de última milla para una red de couriers PyME: creación y seguimiento de envíos, notificaciones al destinatario y a bodega, panel de operaciones en tiempo real y auditoría de eventos logísticos.

## Estado del proyecto

**Fase 1-7 avanzada**: contratos compartidos, los seis microservicios, mensajería (RabbitMQ + Kafka), frontend React con autorización por rol, seguridad Azure AD/JWT (resource server + MSAL), API Gateway (IaC), CI y script de despliegue EC2. Pendiente: endurecer el despliegue productivo (ALB, PostgreSQL, secret manager).

## Stack

- **Frontend**: React (Vite + TypeScript). Nota: el caso de evaluación original pide Angular; el equipo decidió usar React.
- **Backend**: Spring Boot 3.3 (Java 17), multi-módulo Maven detrás de un BFF y de AWS API Gateway.
  - `contracts` — DTOs, enums, rutas y eventos compartidos.
  - `ms-rutaexpress-shipments` — CRUD de envíos y máquina de estados (publica eventos y notificaciones).
  - `ms-rutaexpress-catalog` — servicios de envío, tarifas y capacidad de flota.
  - `ms-rutaexpress-notify` — notificaciones (email/push, ticket de bodega) vía RabbitMQ.
  - `ms-rutaexpress-report` — KPIs y analítica, consumidor de Kafka.
  - `ms-rutaexpress-audit` — timeline de auditoría, consumidor de Kafka.
  - `ms-rutaexpress-bff` — backend-for-frontend detrás del API Gateway.
- **Identidad**: Azure AD (IDaaS) con JWT validado en AWS API Gateway y en cada microservicio (Fase 5).
- **Mensajería**: RabbitMQ (cola de notificaciones) y Kafka (topic de eventos de envío).
- **Infraestructura**: AWS EC2 con Docker / Docker Compose.

## Equipo y forma de trabajo

Este proyecto lo desarrollan dos personas, cada una con su propio agente de IA:

- Backend + Frontend: a cargo de Diego, con Claude Code.
- Infraestructura (Docker, RabbitMQ, Kafka, Azure AD, API Gateway, despliegue EC2): a cargo de su compañero, con opencode.

Las reglas de colaboración y la división detallada están en `CLAUDE.md` (no versionado en este repo). El registro de avances por push está en `CHANGELOG.md`. Los planes de cada fase se documentan en `planes-cloud-native/`.

## Estructura del repositorio

```
.
├── .github/workflows/         # CI (GitHub Actions)
├── contracts/                 # DTOs, enums, rutas y eventos compartidos
├── ms-rutaexpress-shipments/  # microservicio de envíos (8081)
├── ms-rutaexpress-catalog/    # microservicio de catálogo (8082)
├── ms-rutaexpress-notify/     # microservicio de notificaciones (8083)
├── ms-rutaexpress-report/     # microservicio de KPIs (8084)
├── ms-rutaexpress-audit/      # microservicio de auditoría (8085)
├── ms-rutaexpress-bff/        # backend-for-frontend (8080)
├── frontend/                  # React (Vite + TS), dev en :3000
├── infra/                     # Compose, Dockerfiles, ALB y API Gateway (IaC), smoke test, guía de despliegue
├── planes-cloud-native/       # Planes de cada fase/implementación
├── CHANGELOG.md
├── README.md
├── pom.xml
├── .gitattributes
└── .gitignore
```

## Cómo levantar el entorno

### Infraestructura local (brokers)

```bash
cd infra
cp .env.example .env
docker compose -f docker-compose.base.yml up -d
```

- RabbitMQ: http://localhost:15672 (user/pass en `.env`).
- Kafka: `localhost:9092`.

### Backend (requiere JDK 17 y Maven)

```bash
# desde la raíz del repo
mvn -pl ms-rutaexpress-shipments -am spring-boot:run   # puerto 8081
mvn -pl ms-rutaexpress-catalog -am spring-boot:run     # puerto 8082
# ... etc. para notify (8083), report (8084), audit (8085) y bff (8080)
```

Cada servicio usa H2 en memoria en local (consola en `http://localhost:<puerto>/h2-console`, JDBC URL según `application.yml`). El catálogo se siembra con datos demo al arrancar.

### Seguridad (Fase 5, opcional en local)

En desarrollo los servicios corren **sin** seguridad. Para activar la validación JWT de Azure AD, arrancar con el perfil `secure`:

```bash
mvn -pl ms-rutaexpress-bff -am spring-boot:run -Dspring-boot.run.profiles=secure
```

Con el perfil `secure` se exige JWT (issuer `https://login.microsoftonline.com/<tenant>/v2.0`, audience = `AZURE_CLIENT_ID`). En el frontend, el login MSAL envía el token como `Authorization: Bearer`; el BFF lo reenvía a los servicios aguas abajo (token relay).

**Roles**: se leen del claim `roles` del JWT (App roles de Azure AD). `Operador` y `Admin` crean envíos; `Operador`/`Bodega`/`Admin` cambian estado; solo `Admin` gestiona catálogo y ve auditoría/reportería. En el frontend, esas pantallas se muestran únicamente al rol `Admin`.

### Frontend

```bash
cd frontend
npm install
npm run dev   # http://localhost:3000 (proxea /api al BFF en :8080)
```

### Todo junto (apps + brokers, vía Docker)

```bash
cd infra
cp .env.example .env
docker compose -f docker-compose.base.yml -f docker-compose.apps.yml up -d --build
```

En Docker el perfil por defecto es `prod` (PostgreSQL). Para activar JWT, usar
`SPRING_PROFILES_ACTIVE=prod,secure` con `AZURE_TENANT_ID`/`AZURE_CLIENT_ID` definidos.

### Verificación rápida

```bash
./infra/smoke-test.sh    # crea un envío y verifica auditoría, KPIs y notificaciones
```

Guías detalladas: `infra/azure-ad/README.md`, `infra/ec2/README.md` y `infra/api-gateway/README.md`.

## Despliegue en AWS + Azure

El paso a paso completo (Azure AD, EC2, ALB, API Gateway) está en **`infra/DESPLIEGUE.md`**.
