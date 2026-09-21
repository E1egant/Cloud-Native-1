# Estado: infra

**Dueño:** compañero / opencode · **Actualizado:** 2026-09-21

## Hecho
Compose base (RabbitMQ, Kafka KRaft, PostgreSQL), compose de apps, API Gateway CloudFormation con JWT Authorizer, ALB, guías Azure AD y EC2, smoke test. Historial conservado.

## Falta
**Reescribir `docker-compose.apps.yml`, `Dockerfile.service`, `deploy.sh` y CI para repos separados** (hoy usan `context: ..` del monorepo); RabbitMQ 2 nodos y Kafka 3 brokers + ZK del caso; App Registration con el set de roles acordado.

## Bloqueos / necesita de otros
Acuerdo de roles con Diego; entregar valores de Azure AD por canal privado.
