# Estado: ms-rutaexpress-rabbit-admin

**Dueño:** Diego / Claude · **Actualizado:** 2026-10-28

## Hecho
Repo local con `POST/GET/DELETE /api/rabbit/queues`, `POST/DELETE /exchanges` y `/bindings`, `RabbitAdminService` (toda la lógica AMQP), DTO con validación, manejo de errores JSON (400/404/502), rol `Admin` en perfil `secure`, Dockerfile, CI, README. 16 pruebas verdes. Subido a GitHub (`b16c130`).

## Desplegado
En la EC2 (:8087, perfil secure) y accesible por `/api/rabbit` (BFF + API Gateway).

## Falta
Probar contra un broker real; agregarlo al compose de `infra` y a la ruta del BFF/API Gateway si se quiere exponer.
