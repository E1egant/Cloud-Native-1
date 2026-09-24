# Roles y seguridad

Los roles son **App Roles** de Azure AD y llegan en el claim `roles` del token; los servicios los convierten a `ROLE_<Rol>` (sensible a mayúsculas: `Operador`, `Bodega`, `Admin`).

## Implementado (`contracts/Roles`)

| Rol | Puede |
|---|---|
| `Operador` | Crear envíos y cambiar su estado |
| `Bodega` | Cambiar estado de envíos |
| `Admin` | Todo, incluido catálogo, auditoría y reportes |

## Objetivo del caso

`Admin`, `Despachador` (Operador), `Cliente` y `Auditor` (solo lectura del timeline). Decisión pendiente: qué set de roles se crea en Azure AD y se usa en todos los servicios (ver `diferencias-con-el-caso.md`).

## Propuesta vigente para Azure AD

Crear los App Roles `Admin`, `Operador`, `Bodega`, `Cliente`, `Auditor` (`Despachador` del caso = `Operador`). Hoy los servicios de dominio solo autorizan `Operador`, `Bodega` y `Admin`; el BFF y el frontend aceptan además `Despachador`, `Cliente` y `Auditor`. Alinear los servicios con `Cliente` y `Auditor` está en las tareas T5/T6.

## Validación del token

- `issuer` = `https://login.microsoftonline.com/<TENANT_ID>/v2.0`, firma por JWKS, expiración.
- **`audience` = `<API_CLIENT_ID>` (el GUID, no `api://…`; con `requestedAccessTokenVersion: 2` el token v2 trae `aud` = GUID; verificado 2026-09-24)**: la valida `ms-rutaexpress-bff` (rúbrica EP1). Los servicios de dominio hoy validan solo `issuer` con `issuer-uri`.
- Errores: `401` token ausente/inválido, `403` rol sin permiso, cuerpo JSON.
- Scope del frontend: `api://<API_CLIENT_ID>/access_as_user`.

Plantilla de referencia con audience, roles y 401/403 en JSON: `ms-rutaexpress-bff` → `security/`.
