# Entregable Día 3 — Relaciones y Manejo de Errores (Pedidos)

## 1. Checklist R1-R11 completada
- [x] R1: Estructura de carpetas organizada a nivel de raíz.
- [x] R2: Módulo Platos operativo.
- [x] R3: Módulo Mesas operativo.
- [x] R4: Entidad Pedido configurada con `@ManyToOne` hacia Mesa.
- [x] R5: Entidad Pedido configurada con `@ManyToMany` hacia Platos.
- [x] R6: DTO de creación de pedidos estructurado con `mesaId` y `platoIds`.
- [x] R7: Servicio de pedidos implementado con cálculo automático del total.
- [x] R8: Manejo robusto de errores mediante excepciones HTTP 400 (`BadRequestException`) para IDs inexistentes.
- [x] R9: Endpoints de relaciones cargadas correctamente en `GET /pedidos`.
- [x] R10: Configuración de Swagger integrada y visible en `http://localhost:3000/api`.
- [x] R11: Registro de cambios documentado en `CHANGES.md`.

## 2. Predicciones 3 y 4 del Día 3 con resultado real
* **Predicción 3 (Relaciones en Pedidos):** 
  * Predicción: Se predijo que la IA utilizaría los decoradores `@ManyToOne` para la mesa y `@ManyToMany` para los platos, generando una tabla intermedia automática en TypeORM.
  * Resultado real: La implementación usó los decoradores esperados correctamente y enlazó las foreign keys sin inconvenientes.
* **Predicción 4 (Control de Errores):**
  * Predicción: Inicialmente las validaciones fallidas arrojarían un error interno de servidor (500) por referencias nulas.
  * Resultado real: Tras aplicar las validaciones con los repositorios en el servicio de pedidos, se logró interceptar correctamente arrojando el código HTTP 400 esperado.

## 3. Screenshot: Swagger mostrando los 3 módulos
(Adjuntar captura de pantalla de `http://localhost:3000/api` mostrando los bloques de Platos, Mesas y Pedidos).

## 4. Screenshot: POST /pedidos exitoso + GET /pedidos con relaciones
(Adjuntar captura de pantalla mostrando la creación exitosa del pedido y la consulta GET devolviendo los objetos anidados de mesa y platos).

## 5. ¿Aplicaron la regla de los 3 intentos? ¿Cuándo?
Sí se aplicó preventivamente durante la resolución de las relaciones cruzadas de los platos en el módulo de pedidos, cuando la IA intentó parchar repetidamente el mapeo de la tabla intermedia sin éxito. Se optó por limpiar el estado con los comandos correspondientes y reorientar el prompt de manera limpia para evitar el anti-patrón de "parche sobre parche".