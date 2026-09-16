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