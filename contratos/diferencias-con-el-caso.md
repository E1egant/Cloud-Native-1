# Diferencias entre lo implementado y el caso (por alinear)

El backend inicial (creado por opencode/Deepseek en el monorepo) se desvía del enunciado en varios puntos. Cada fila debe resolverse con acuerdo de ambos y, si cambia un contrato, actualizar primero `contratos/`.

| Tema | Caso (enunciado) | Implementado hoy | Repos afectados |
|---|---|---|---|
| Roles | Admin, Despachador (Operador), Cliente, Auditor | Operador, Bodega, Admin | todos + Azure AD |
| Estados del envío | CREADO → ACEPTADO → EN_BODEGA → EN_RUTA → ENTREGADO / CANCELADO | CREATED, ASSIGNED, PICKED_UP, IN_TRANSIT, DELIVERED, CANCELLED, FAILED | shipments, frontend, audit, report |
| Cambio de estado | `PUT /api/shipments/{id}/status` | `PATCH` | shipments, bff, frontend |
| Capacidad | Disminuye al aceptar el envío (catálogo) | Catálogo modela flota; no hay reserva de capacidad | catalog, shipments |
| Catálogo | `PUT /api/catalog/services/{id}` (tarifa/capacidad) | Solo GET/POST | catalog |
| Reportes | `/api/report/kpis?range=`, `/api/report/top-services` (envíos por hora, lead time, estados activos) | `/api/reports/kpis` con `byStatus` y `totalEvents` | report, bff, frontend |
| Auditoría | Timeline con filtros usuario/fechas/tipo, rol Auditor | `GET /api/audit` sin filtros, solo Admin | audit, bff |
| RabbitMQ | 3 colas + 3 DLQ, 3 exchanges, envelope | 1 cola `rutaexpress.notifications` | shipments, notify, infra |
| Kafka | `shipments.events`, `audit.timeline`, `*.DLT`; ZK×3 + 3 brokers | `shipment-events`; 1 broker KRaft | shipments, audit, report, infra |
| notify | Sin BD, no público | Con BD y `GET /api/notifications` | notify |
| Base de datos | Oracle | H2 (dev) / PostgreSQL (prod) | shipments, catalog, notify, audit |
| Audience del JWT | Validar issuer y audience | Servicios: solo issuer; `ms-rutaexpress-bff`: issuer + audience | catalog, shipments, notify, audit, report |
| Seguridad por defecto | Endpoints protegidos | Perfil dev sin seguridad | todos los servicios |
| Pruebas | "responder a pruebas básicas" (EP1) | Solo shipments tiene pruebas | catalog, notify, audit, report, frontend |
| BFF | Valida JWT (firma, vigencia, issuer, audience, rol) | Ver `ms-rutaexpress-bff` (EP1) y rama `legacy-monorepo` (versión agregadora de opencode) | bff, frontend |
