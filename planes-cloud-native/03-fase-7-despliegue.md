# Plan Fase 7 — Integración y despliegue

**Fecha:** 2026-09-21
**Autor:** Compañero / opencode

## Objetivo

Cerrar el ciclo de integración y despliegue: exponer la plataforma detrás de AWS API Gateway con
validación JWT, automatizar la verificación en cada push (CI) y dejar reproducible el despliegue en EC2.

## Alcance

1. **API Gateway (IaC)** — plantilla CloudFormation (`infra/api-gateway/template.yml`) con:
   - HTTP API + JWT Authorizer de Azure AD (issuer/audience del tenant).
   - Ruta `ANY /api/{proxy+}` → BFF en EC2.
   - CORS configurable.
2. **CI** — workflow de GitHub Actions (`.github/workflows/ci.yml`):
   - Backend: `mvn -B test` (JDK 17).
   - Frontend: `npm ci` + `tsc --noEmit` + `vite build` (Node 20).
3. **Despliegue EC2** — script `infra/ec2/deploy.sh` que levanta brokers + apps + frontend,
   con opción `--secure` (perfil Spring `secure`, JWT obligatorio).
4. **Docker** — `docker-compose.apps.yml` propaga perfil Spring y variables de Azure AD; el
   frontend recibe las variables `VITE_AZURE_*` como build args.

## Pasos (cada uno = 1 commit atómico)

1. `infra: plantilla CloudFormation de API Gateway con JWT Authorizer` (+ README).
2. `ci: workflow de GitHub Actions (backend + frontend)`.
3. `infra: deploy.sh para EC2 y compose con perfil secure`.
4. `docs: plan Fase 7 + README/CHANGELOG`.

## Criterio de cierre

- `aws cloudformation deploy` deja un HTTP API que exige JWT de Azure AD.
- El workflow de CI pasa en verde (build + tests + build de frontend).
- `infra/ec2/deploy.sh` levanta el stack completo en una instancia limpia.

## Fuera de alcance

- Alta disponibilidad real (ALB + múltiples instancias + RDS gestionado).
- Rotación de secretos y gestión de `.env` en un secret manager.
- Migración de H2 a PostgreSQL en producción (queda como mejora).
