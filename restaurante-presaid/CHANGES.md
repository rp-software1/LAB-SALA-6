# Registro de Cambios — Día 1 (Módulo Platos)
 
## Archivos Creados
- `src/platos/plato.entity.ts`: Entidad TypeORM con campos id, nombre, precio, disponible, createdAt, updatedAt.
- `src/platos/dto/create-plato.dto.ts`: Validaciones de entrada con class-validator.
- `src/platos/dto/update-plato.dto.ts`: DTO parcial para actualizaciones con PartialType.
- `src/platos/platos.service.ts`: Lógica del negocio y métodos CRUD completos.
- `src/platos/platos.controller.ts`: Rutas REST (/platos) para GET, POST, PATCH y DELETE.
- `src/platos/platos.module.ts`: Módulo NestJS registrado en AppModule.

## Dependencias Instaladas
- `@nestjs/typeorm`, `typeorm`, `better-sqlite3`: ORM y base de datos SQLite para desarrollo.
- `class-validator`, `class-transformer`: Validaciones y transformación de objetos en DTOs.

## Decisiones Técnicas
- Base de datos local SQLite (`db.sqlite`) con sincronización automática (`synchronize: true`).

# Registro de Cambios - Día 2 (PRESAID-D2)

## Bloque A - Code Review y Correcciones con IA
- Análisis de código: Evaluación exhaustiva del proyecto NestJS (`restaurante-presaid`) usando herramientas de IA.
- Diagnóstico: Detección de incompatibilidades en versiones de paquetes, linting y estructuras estáticas.
- Correcciones: Ajustes estáticos y verificación de compilación exitosa mediante `npm run build` y `npm run lint`.

## Bloque B - Módulo Mesas en NestJS
- Entidad (`Mesa`): Creación de la entidad `Mesa` con TypeORM (`id`, `numero` [único], `capacidad`, `estado` ['disponible', 'ocupada', 'reservada']).
- DTOs con validaciones:
  - `CreateMesaDto`: Validación de número único, capacidad mínima y estado inicial.
  - `UpdateMesaDto`: Actualización parcial con `PartialType`.
  - `CambiarEstadoMesaDto`: Validación estricta del cambio de estado mediante `@IsIn`.
- Servicio (`MesasService`): Lógica CRUD completa, ordenamiento automático por número de mesa y control de duplicados.
- Controlador (`MesasController`): Endpoints REST completos:
  - `POST /mesas` (Crear mesa)
  - `GET /mesas` (Listar todas)
  - `GET /mesas/:id` (Obtener por ID)
  - `PATCH /mesas/:id` (Actualizar datos)
  - `PATCH /mesas/:id/estado` (Cambio de estado)
  - `DELETE /mesas/:id` (Eliminar mesa)
- Registro: Integración del módulo en `AppModule`.
- Verificación: Pruebas locales exitosas en `http://localhost:3000/mesas`.

## Bloque C - Documentación y Control de Versiones
- Documentación:** Actualización de `CHANGES.md` y creación de `feedback_dia2_david.md`.
- Git & GitHub:** Integración de la rama `feature/mesas` hacia la rama principal `main`.