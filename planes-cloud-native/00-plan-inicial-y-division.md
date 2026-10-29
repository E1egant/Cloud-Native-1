# Plan inicial — Setup del proyecto RutaExpress

**Fecha:** 2026-09-21
**Autor:** Diego Miranda

## Objetivo

Dejar listo el repositorio `Cloud-Native-1` para trabajo colaborativo entre dos personas (Diego y Lucas), con reglas claras de commits, documentación y división de responsabilidades.

## Contexto

Caso: **RutaExpress**, plataforma de envíos de última milla (ver `Material Evaluacion/Caso 3 - RutaExpress.docx`, no versionado). Arquitectura pedida: microservicios Spring Boot + Angular/MSAL + Azure AD + AWS API Gateway + RabbitMQ + Kafka, desplegado en EC2 con Docker Compose.

**Cambio respecto al caso:** se reemplaza Angular por **React** (decisión de equipo, registrada en `README.md`).

## División de trabajo

- **Diego Miranda**: backend (microservicios de dominio: shipments, catalog, notify, report, audit, y el bff) + frontend (React).
- **Lucas Alcaino**: infraestructura (Docker Compose para apps/mq/kafka), RabbitMQ, Kafka, Azure AD (App Registration, MSAL config), AWS API Gateway, despliegue en EC2.

## Pasos de esta fase (Fase 0)

1. `git init` en la carpeta del proyecto.
2. Crear `.gitignore` (excluye `Material Evaluacion/`).
3. Crear `README.md` con reglas de trabajo, división y changelog.
4. Crear carpeta `planes-cloud-native/` con este plan.
5. Crear/actualizar `README.md` con descripción del proyecto y estado.
6. Commits atómicos para cada uno de los puntos anteriores.
7. Confirmar con el usuario antes de hacer `git push -u origin main`.

## Siguiente fase sugerida (Fase 1)

Definir contratos (DTOs/endpoints) de `ms-rutaexpress-shipments` y `ms-rutaexpress-catalog`, y crear el scaffolding base de los proyectos Spring Boot y del proyecto React, en commits separados.
