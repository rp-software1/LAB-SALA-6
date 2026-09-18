# Entregable Día 1 — Setup + Módulo Platos

1. Screenshot: Gemini CLI funcionando
(Adjuntar captura de pantalla de la terminal mostrando Gemini CLI ejecutándose y creando archivos correctamente).

2. Predicciones 1 y 2 con resultado real
* Predicción 1 (Gemini CLI - Creación de NestJS):**
  * Predicción:* Se esperaba que ejecutara `npx @nestjs/cli new restaurante-backend` usando npm y creando alrededor de 25-30 archivos iniciales estándar de NestJS.
  * Resultado real:* El agente ejecutó los comandos del CLI de NestJS y generó la estructura estándar de archivos con éxito.
* Predicción 2 (Cursor - Módulo Platos):**
  * Predicción:* Se predijo que Cursor crearía exactamente 6 archivos dentro de `src/platos/` (entidad, DTOs de creación y actualización, servicio, controlador y módulo) sin añadir dependencias no solicitadas.
  * Resultado real:* Creó los archivos esperados y solicitó instalar `better-sqlite3`, `typeorm` y `@nestjs/typeorm` tal como se previó.

3. Checklist V1-V7 completada
- [x] V1: Entidad con exactamente: id, nombre, precio, disponible, createdAt, updatedAt
- [x] V2: No hay campos inventados por la IA
- [x] V3: DTOs con validaciones reales (`@IsString`, `@IsNumber`, etc.)
- [x] V4: 5 endpoints funcionales: POST, GET all, GET :id, PATCH :id, DELETE :id
- [x] V5: Módulo registrado correctamente en `AppModule`
- [x] V6: TypeORM configurado con SQLite y `better-sqlite3`
- [x] V7: Sin llaves secretas, URLs hardcodeadas ni archivos `.env` con datos reales

4. Comparación CLI vs IDE (Respuestas STOP 5)
1. ¿En cuál sentiste más control?** En la CLI, ya que puedes ver paso a paso cómo interactúa directamente con el sistema de archivos local mediante comandos explícitos.
2. ¿En cuál fuiste más rápido?** En el IDE (Cursor), debido a su capacidad de autocompletado avanzado, edición en contexto de múltiples archivos y agentes de fondo integrados.
3. ¿En cuál entendiste mejor lo que la IA hacía?** En la CLI, por la transparencia de ver la salida de cada comando en tiempo real.
4. Para automatizar tareas repetitivas, ¿CLI o IDE?** Definitivamente la CLI, por su facilidad para encadenar comandos, scripts y automatizaciones.

5. Screenshot: GET /platos respondiendo
*(Adjuntar captura de pantalla de Postman o el navegador mostrando la respuesta JSON exitosa de `GET /platos`).*