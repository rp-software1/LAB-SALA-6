# Feedback y Hallazgos - Día 2

## 1. Hallazgos del Code Review
- Autogeneración con Cursor Agent: La creación automática generó la estructura modular completa de NestJS de forma limpia en un solo intento.

- Manejo de Errores e Incompatibilidades: Se detectó un error al ejecutar comandos de `npm` fuera del directorio raíz del módulo (`restaurante-presaid`), el cual se corrigió asegurando el contexto de ejecución.

- Validaciones DTO: Se garantizó el uso correcto de `class-validator` y `class-transformer` para proteger la integridad de los datos (unicidad de número y estados válidos).

## 2. Aprendizajes Clave
- Manejo fluido de flujos Git (merge, resolución de conflictos locales y rebase/sync con `main`).
- Creación de endpoints personalizados en NestJS con métodos `@Patch` para actualización específica de estado.