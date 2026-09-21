# Plan Fase 1 (completar) + Fase 2 — Contratos, esqueleto y dominio base

**Fecha:** 2026-09-21
**Autor:** Compañero / opencode

## Contexto

La parte de infraestructura de Fase 1 (compose con RabbitMQ + Kafka KRaft, `.env.example`, guías Azure AD y EC2) ya está cerrada. Queda pendiente la otra mitad de Fase 1 (contratos de endpoints/DTOs y scaffolding de proyectos) y el arranque de Fase 2 (dominio de envíos + catálogo). Este plan cubre ambos, en commits atómicos.

## Decisiones de arquitectura

- **Backend**: multi-módulo Maven con `pom.xml` padre en la raíz que gestiona el BOM de Spring Boot (3.3.x, Java 17) y agrega los módulos. Un módulo `contracts/` compartido expone DTOs (records), enums y los *paths* canónicos de cada API para evitar duplicar contratos entre servicios.
- **DTOs como records** (Java 17) para request/response; evita Lombok y su configuración extra.
- **Persistencia**: Spring Data JPA con H2 en local (perfil `dev`) y PostgreSQL como objetivo en EC2; H2 mantiene el esqueleto verificable sin infra externa.
- **Mensajería**: RabbitMQ (`spring-amqp`) para colas de trabajo (notificaciones); Kafka (`spring-kafka`) para el stream de eventos de auditoría/reportería. En Fase 1/2 solo se definen los contratos de eventos; los consumidores productores se completan en Fase 3/4.
- **Identidad**: JWT validado por Spring Security OAuth2 Resource Server (Fase 5). En Fase 1/2 los servicios corren sin seguridad (sin dependencia, para no bloquear el dominio). Se deja la configuración lista en `application.yml` comentada.

## Estructura objetivo

```
pom.xml                          # padre + agregador
contracts/                       # DTOs, enums, rutas y eventos compartidos
ms-rutaexpress-shipments/        # CRUD envíos + máquina de estados
ms-rutaexpress-catalog/          # servicios de envío, tarifas y capacidad
ms-rutaexpress-notify/           # notificaciones (RabbitMQ) — Fase 3
ms-rutaexpress-report/           # KPIs (Kafka) — Fase 4
ms-rutaexpress-audit/            # timeline auditoría (Kafka) — Fase 4
ms-rutaexpress-bff/              # backend-for-frontend
frontend/                        # React (Vite)
```

## Contratos (dominio base)

- **Shipment**: `id`, `trackingNumber`, `origin`, `destination`, `courierId`, `status`, `recipient{name,phone,email,address}`, `package{weightKg,volumeM3,description}`, timestamps.
- **Estado de envío** (máquina de estados): `CREATED → ASSIGNED → PICKED_UP → IN_TRANSIT → DELIVERED`, más terminales `CANCELLED` y `FAILED`. Transiciones válidas definidas en un enum `ShipmentStatus`.
- **Catalog**: `ServiceType` (tipo de servicio con tarifa) y `FleetCapacity` (vehículo y su capacidad/estado).

## Pasos (cada bloque = 1+ commits atómicos)

1. `build: pom.xml padre + módulo contracts con DTOs/enums/rutas`
2. `feat(shipments): scaffolding + dominio CRUD + máquina de estados`
3. `feat(catalog): scaffolding + servicios/tarifas + capacidad de flota`
4. `feat(notify|audit|report): skeletons con contratos de eventos`
5. `feat(bff): agregador base`
6. `feat(frontend): scaffold React (Vite) + pantalla base`
7. `infra: docker-compose de apps (microservicios + frontend)`
8. Actualizar `README.md` y `CHANGELOG.md` conforme avanza.

## Fuera de alcance (Fase 5/6/7)

- Azure AD + JWT en los microservicios (Fase 5).
- Pantallas completas del frontend por rol (Fase 6).
- Despliegue real en EC2 (Fase 7).

## Criterio de cierre

- `contracts` compila y expone los DTOs/enums compartidos.
- `shipments` y `catalog` levantan en local (H2) y responden CRUD.
- Los skeletons restantes compilan y declaran sus puertos y dependencias.
- README documenta cómo levantar cada servicio.
