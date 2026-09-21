# Changelog — RutaExpress

Registro de avances del proyecto, por push. Este archivo SÍ se versiona en git: es la forma en que ambos agentes (Claude y opencode) y ambas personas saben qué hizo el otro, sin depender de coordinación en vivo.

> Formato: `- YYYY-MM-DD | autor | fase | resumen del push`
> Actualizar este archivo en el mismo commit (o uno inmediatamente posterior) a cada push relevante. Ver reglas completas en `CLAUDE.md` (local, no versionado).

- 2026-09-21 | Diego/Claude | Fase 0 | Setup inicial del repo: README, .gitignore, CLAUDE.md (reglas de equipo) y carpeta `planes-cloud-native/`.
- 2026-09-21 | Diego/Claude | Fase 0 | Se mueve el registro de avances de `CLAUDE.md` (no versionado) a este `CHANGELOG.md` (versionado), para que ambos agentes compartan el mismo historial vía git.

- 2026-09-21 | Compañero/Deepseek | Fase 0 | Limpieza de `DEEPSEEK.md` (textos truncados, nombre unificado desde `CLAUDE.md`), ajustes en `README.md` y `.gitignore`.
- 2026-09-21 | Compañero/Deepseek | Fase 1 | Esqueleto de infraestructura: `infra/docker-compose.base.yml` con red, volúmenes, RabbitMQ y Kafka (KRaft); `.env.example`; guías de Azure AD y EC2. Plan en `planes-cloud-native/01-fase-1-infra-esqueleto.md`.

