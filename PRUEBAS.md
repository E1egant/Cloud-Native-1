# Cómo probar la entrega de RabbitMQ (EP3/EP4)

Tres niveles, de menor a mayor esfuerzo. Los niveles 1 y 2 **no necesitan nada de Diego** (ni Azure ni AWS). Este repo es público: los valores sensibles (IDs de Azure, IP de la EC2, llave `.pem`, contraseñas) se piden por canal privado y no van aquí.

Requisitos: Java 17+, Git y, para el nivel 2, Docker.

## Nivel 1. Pruebas automáticas (5 min)

```bash
git clone https://github.com/E1egant/ms-rutaexpress-notify
git clone https://github.com/E1egant/ms-rutaexpress-shipments
git clone https://github.com/E1egant/ms-rutaexpress-rabbit-admin
git clone https://github.com/E1egant/ms-rutaexpress-bff
# en cada carpeta (en Windows: mvnw.cmd):
./mvnw -B test
```

| Repo | Pruebas esperadas | Qué cubren |
|---|---|---|
| `ms-rutaexpress-notify` | 12 | ACK, NACK a DLQ, reintentos, envelope inválido, idempotencia, seguridad |
| `ms-rutaexpress-shipments` | 18 | publica `email.send`, `label.gen`, `warehouse.ticket`; el fallo del broker no rompe el envío |
| `ms-rutaexpress-rabbit-admin` | 16 | servicio (DLQ, bindings, 404) y API (401/403/400/201/204) |
| `ms-rutaexpress-bff` | 15 | JWT, roles y proxy `/api/rabbit` |

Los logs muestran errores de conexión a RabbitMQ en algunos tests: es normal, no hay broker en este nivel. Lo que importa es `BUILD SUCCESS` y `Failures: 0`. Los repos también tienen CI: en la pestaña **Actions** el último run debe estar en verde.

## Nivel 2. Local con RabbitMQ real (15 min)

Perfil por defecto: sin seguridad y sin Azure. Un solo nodo (el clúster de 2 nodos solo existe en la EC2).

```bash
git clone https://github.com/E1egant/infra
cd infra
docker compose -f docker-compose.base.yml up -d rabbitmq      # carga rabbitmq/definitions.json
```

Abrir http://localhost:15672 (usuario `rutaexpress`, clave `rutaexpress`) y comprobar en **Exchanges** `cmd.direct`, `cmd.topic` y `cmd.dead.dlx`, y en **Queues** las colas `q.cmd.email`, `q.cmd.warehouse`, `q.cmd.label` y sus `.dlq`.

En dos terminales, dentro de cada repo:

```bash
cd ms-rutaexpress-notify && ./mvnw spring-boot:run          # :8083, consume las 3 colas
cd ms-rutaexpress-rabbit-admin && ./mvnw spring-boot:run    # :8087
```

**Mensaje válido (debe consumirse):**

```bash
curl -u rutaexpress:rutaexpress -H "content-type: application/json" -X POST \
  http://localhost:15672/api/exchanges/%2F/cmd.direct/publish -d '{
  "properties":{"content_type":"application/json"},"routing_key":"email.send","payload_encoding":"string",
  "payload":"{\"type\":\"email.send\",\"eventId\":\"11111111-1111-1111-1111-111111111111\",\"timestamp\":\"2026-10-28T12:00:00Z\",\"traceId\":\"t\",\"correlationId\":\"demo\",\"payload\":{\"channel\":\"email\",\"recipient\":\"a@x.com\",\"subject\":\"Prueba\",\"body\":\"hola\"}}"}'
```

Esperado: `{"routed":true}`, `q.cmd.email` queda en 0 mensajes y `curl localhost:8083/api/notifications` lista la notificación. Si se repite con el mismo `eventId`, no se duplica.

**Mensaje inválido (debe ir a la DLQ):** mismo comando con `"routing_key":"label.gen"` y `"payload":"no-es-json"`. Esperado: aparece 1 mensaje en `q.cmd.label.dlq` y el log de notify registra el rechazo.

**Administrador (rabbit-admin):**

```bash
curl -X POST localhost:8087/api/rabbit/queues -H "content-type: application/json" -d '{"name":"q.demo","deadLetter":true}'   # 201
curl localhost:8087/api/rabbit/queues/q.demo                                                                                   # mensajes/consumidores
curl -X POST localhost:8087/api/rabbit/queues -H "content-type: application/json" -d '{"name":""}'                             # 400 con detalle
curl -X DELETE localhost:8087/api/rabbit/queues/q.demo                                                                         # 204
```

**Productor real (shipments):** `cd ms-rutaexpress-shipments && ./mvnw spring-boot:run` (:8081) y:

```bash
curl -X POST localhost:8081/api/shipments -H "content-type: application/json" -d '{"origin":"A","destination":"B","recipient":{"name":"Ana","phone":"123","email":"ana@x.com","address":"Calle 1"},"packageInfo":{"weightKg":1.0,"volumeM3":0.5,"description":"caja"}}'
```

Esperado: notify consume `email.send` y `label.gen`. Al pasar el envío a `PICKED_UP` (`PATCH /api/shipments/{id}/status`) se publica `warehouse.ticket`.

Limpieza: `docker compose -f docker-compose.base.yml down -v`.

## Nivel 3. Contra lo desplegado (Azure + AWS)

Solo para ver el entorno de la presentación. **Qué tiene que pasarle Diego a Lucas, por canal privado:**

| Para qué | Qué se necesita | Observación |
|---|---|---|
| Ver la UI de RabbitMQ (clúster de 2 nodos) | IP de la EC2 y **la IP pública de Lucas** (Diego la agrega al Security Group en los puertos 15672-15673) | Sin eso la UI no abre; usuario y clave de la UI aparte |
| Entrar por SSH a la EC2 | La llave `.pem` | Con eso puede ver `docker compose ps`, `rabbitmqctl cluster_status` y los logs |
| Iniciar sesión en la app (login Azure) | Un usuario del tenant con su clave temporal (ej. el de rol `Admin`), o que Diego cree uno para Lucas | Solo se usa en el navegador; no hay que tocar Azure |
| Correr los servicios locales con perfil `secure` | `AZURE_TENANT_ID` y `AZURE_API_AUDIENCE` (GUID de la API) | No es necesario para los niveles 1 y 2 |

Lucas **no** puede entrar a la consola de AWS: el Learner Lab es de la cuenta de Diego. Todo lo que haya que cambiar en AWS lo hace Diego.

Pasos una vez que tenga los datos:

1. Abrir `http://<IP-EC2>:15672`: en **Overview → Nodes** deben verse `rabbit@rabbit1` y `rabbit@rabbit2` en verde; en **Queues**, las 3 colas con su DLQ y la política `ha-cmd`.
2. Por SSH: `cd ~/rabbit && sudo docker compose ps` y `sudo docker exec rabbit1 rabbitmqctl cluster_status`.
3. En la app: iniciar sesión → crear un envío → en la UI ver actividad en `q.cmd.email` y `q.cmd.label`, y `tail -f ~/app/logs/notify.log` en la EC2.
4. DLQ: UI → **Exchanges → cmd.direct → Publish message**, routing key `label.gen`, payload `no-es-json`. Debe aparecer en `q.cmd.label.dlq`.
5. Administrador por el gateway: con un token de rol `Admin`, `POST https://<API-GATEWAY>/api/rabbit/queues`. Sin token responde 401; con un rol distinto, 403.

Si el Learner Lab se reinició: Diego arranca la EC2, y en ella `cd ~/rabbit && sudo docker compose up -d` y `cd ~/app && ./run-all.sh`.

## Qué mirar para la pauta EP3

| Indicador | Dónde |
|---|---|
| Nombres centralizados | `ms-rutaexpress-notify/src/main/resources/application.yml` (`rutaexpress.rabbit.*`) |
| Beans Queue/Exchange/Binding | `notify/.../config/RabbitConfig.java` |
| Consumidores por dominio | `notify/.../messaging/email`, `warehouse`, `label` |
| ACK y errores | `notify/.../messaging/AckSupport.java` |
| API y servicio del administrador | `ms-rutaexpress-rabbit-admin` (`web/`, `service/RabbitAdminService`) |
| Contrato | `contratos/rabbitmq.md` |
