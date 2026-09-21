# Plan Fase 1 — Esqueleto de infraestructura

**Fecha:** 2026-09-21
**Autor:** Compañero / Deepseek

## Objetivo

Dejar levantable un entorno local con brokers de mensajería y la base de configuración de identidad (Azure AD) y despliegue (EC2), listo para que Diego/Claude conecten los microservicios en Fase 2+.

## Alcance (mi parte)

1. Carpeta `infra/` con `docker-compose.base.yml` (red + volúmenes).
2. RabbitMQ (`3-management`) como cola de trabajo.
3. Kafka en modo **KRaft** (sin Zookeeper) para streaming/auditoría.
4. `.env.example` con variables de brokers, Azure AD y despliegue.
5. Documento `infra/azure-ad/README.md` con pasos de App Registration + MSAL.
6. Notas de despliegue EC2 (security groups, docker compose en la instancia).
7. API Gateway: dejar anotado el uso de JWT Authorizer (se materializa en Fase 5/7).

## Pasos (cada uno = 1 commit atómico)

1. `infra: crea estructura base y docker-compose con red y volúmenes`
2. `infra: agrega RabbitMQ al compose`
3. `infra: agrega Kafka en modo KRaft al compose`
4. `infra: agrega .env.example con brokers, Azure AD y despliegue`
5. `docs: agrega guía de Azure AD (App Registration + MSAL) en infra/azure-ad`
6. `docs: agrega notas de despliegue EC2 y JWT Authorizer`
7. Actualizar `CHANGELOG.md` (entrada Fase 1) y `README.md` (sección "Cómo levantar la infra").

## Fuera de alcance (queda para Diego/Claude)

- Microservicios Spring Boot y BFF.
- Frontend React.
- Contratos DTOs/endpoints.

## Criterio de cierre de Fase 1

- `docker compose -f infra/docker-compose.base.yml up` levanta RabbitMQ y Kafka sin errores.
- `.env.example` documenta todas las variables necesarias.
- Guías de Azure AD y EC2 revisadas.

## Riesgos / notas

- Kafka en KRaft simplifica el compose (sin Zookeeper); verificar que la versión de la imagen lo soporte.
- Los puertos expuestos en local (5672, 15672, 9092) no deben exponerse igual en EC2.