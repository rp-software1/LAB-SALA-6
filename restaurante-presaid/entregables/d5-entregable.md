# Entregable Día 5 — Preparación para Producción y Despliegue

**Curso:** PRE-SAID – Desarrollo Moderno con IA y CLI  
**Rama de trabajo:** `PRESAID-D5`  
**Estado:** Completado (Preparación de PostgreSQL y Verificación de Flujo Local)

---

## 1. Resumen de Actividades Realizadas

- **Bloque A — Configuración de Base de Datos para Producción:**
  - Modificación de `src/app.module.ts` en NestJS para soportar conexión a **PostgreSQL** mediante la variable de entorno `DATABASE_URL` con SSL habilitado (`rejectUnauthorized: false`).
  - Mantenimiento de **SQLite (`db.sqlite`) como fallback automático** para entorno de desarrollo local si `DATABASE_URL` no está presente.
  - Creación del archivo `.env.example` en la raíz del backend (`restaurante-presaid`).
  - Creación de `.env.local` y `.env.example` en el frontend (`restaurante-frontend`) configurados con `NEXT_PUBLIC_API_URL`.
  - Instalación del driver de PostgreSQL (`pg`).

- **Bloque B — Preparación de Deploy:**
  - Verificación del backend compilando sin errores (`Found 0 errors`).
  - Estructuración de variables de entorno para despliegue en servicios cloud (Render / Vercel).

- **Bloque C — Verificación del Flujo Completo:**
  - Verificación local de los endpoints del backend (`/platos`, `/mesas`, `/pedidos`).
  - Prueba exitosa de inserción de datos de prueba para Lomo Saltado, Ceviche, Mesa 1 y vinculación de Pedido.

---

## 2. Configuración de Variables de Entorno

### Backend (`restaurante-presaid/.env.example`)
```env
DATABASE_URL=postgres://usuario:password@host:5432/dbname