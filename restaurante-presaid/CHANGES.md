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

# Registro de Cambios — Día 3 ackend Restaurante Presaid (NestJS)

## [Bloque B] - Módulo Pedidos con Relaciones Reales y Validaciones
* **Fecha:** Día 3
* **Descripción:** Actualización integral del módulo de Pedidos para soportar múltiples platos por pedido, cálculo automatizado de costos y manejo estricto de errores.

### Archivos Modificados / Creados:
- `src/platos/platos.module.ts`: Se agregó `exports: [TypeOrmModule]` para permitir el acceso al repositorio desde otros módulos.
- `src/mesas/mesas.module.ts`: Se añadió `exports: [TypeOrmModule, MesasService]` para asegurar la visibilidad del repositorio de mesas.
- `src/pedidos/entities/pedido.entity.ts`: 
  - Se configuró el enum `EstadoPedido` (`pendiente`, `en_preparacion`, `listo`, `entregado`).
  - Se implementó la relación **`@ManyToOne`** con la entidad `Mesa` (columna `mesaId`, eliminación en cascada).
  - Se implementó la relación **`@ManyToMany`** con la entidad `Plato` mediante la tabla intermedia `pedido_platos` usando `@JoinTable()`.
  - Se añadió el campo `total` de tipo decimal para almacenar el costo acumulado.
- `src/pedidos/dto/create-pedido.dto.ts`:
  - Se actualizó para recibir `mesaId` (número obligatorio) y `platoIds` (arreglo de números obligatorio con validación de tamaño mínimo).
- `src/pedidos/pedidos.service.ts`:
  - Validación previa asíncrona para verificar la existencia de la mesa y de todos los IDs de platos proporcionados.
  - Generación de excepciones **`BadRequestException` (código 400)** si algún ID no existe en la base de datos (evitando errores 500).
  - Cálculo automático del `total` sumando los precios unitarios de los platos seleccionados.
  - Carga explícita de relaciones (`relations: { mesa: true, platos: true }`) en las consultas.
- `src/pedidos/pedidos.controller.ts`:
  - Endpoints actualizados para soportar creación con múltiples platos y cambio de estados mediante métodos patch.
  - Documentación de API mediante decoradores de Swagger (`@ApiTags`, `@ApiOperation`, `@ApiResponse`).

---

## [Bloque A / Días Anteriores] - Módulos Base, Mesas, Platos y Configuración Global
* Descripción: Inicialización del proyecto, estructuración modular y pruebas funcionales básicas.

### Hitos Logrados:
- Setup y Configuración: Inicialización de NestJS, integración de TypeORM con SQLite y configuración del `ValidationPipe` global para rechazar payloads mal formados de manera estricta.
- Módulo Platos: CRUD completo implementado con entidad, DTOs con validadores y controladores operativos.
- Módulo Mesas: Creación de la entidad `Mesa` con control de estados y capacidad, validado mediante endpoints REST y Swagger.
- Documentación Viva: Integración completa de Swagger (`/api`) para pruebas interactivas de todos los endpoints.