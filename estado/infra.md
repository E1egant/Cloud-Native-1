# Estado: infra

**Dueño:** compañero / opencode · **Actualizado:** 2026-09-24

## Hecho
Compose base (RabbitMQ, Kafka KRaft, PostgreSQL), compose de apps, API Gateway CloudFormation con JWT Authorizer, ALB, guías Azure AD y EC2, smoke test. Historial conservado.
Topología RabbitMQ del caso (`rabbitmq/definitions.json`: exchanges `cmd.direct`/`cmd.topic`/`cmd.dead.dlx`, colas `q.cmd.*` + DLQ y bindings; cola legacy intacta).
Compose reescrito para repos hermanos (servicios propios con su `Dockerfile`, resto con Dockerfiles genéricos en `docker/`); `deploy.sh` con perfil `prod` (+ `--secure` = `prod,secure`); CI que valida compose y definitions.

## Falta
Clúster RabbitMQ 2 nodos y Kafka 3 brokers + ZK del caso; App Registration con el set de roles acordado (T1).

## Bloqueos / necesita de otros
Tareas detalladas y criterios de "hecho": `tareas/companero-opencode.md` (T1, T3, T4, T6c, T7, T8).
Acuerdo de roles con Diego; entregar valores de Azure AD por canal privado.
