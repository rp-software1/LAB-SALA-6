# Code Review — Día 2: Módulo Mesas

## 1. Lo que la IA hizo BIEN
* Implementó correctamente el decorador `@Column({ unique: true })` para el número de mesa.
* Generó el enum para los estados (`disponible`, `ocupada`, `reservada`) de forma limpia.
* Estructuró adecuadamente el endpoint personalizado `PATCH /mesas/:id/estado`.

## 2. Lo que la IA hizo MAL
* Intentó modificar de más las importaciones globales en `AppModule` alterando rutas de otros módulos que no se le pidieron tocar. Se corrigió solicitándole explícitamente mediante prompt que limitara sus cambios estrictamente al módulo de mesas.

## 3. Lo que la IA INVENTÓ
* Añadió un método auxiliar de reseteo masivo de mesas en el servicio que no formaba parte de los requerimientos iniciales. Fue depurado por el Navigator durante la auditoría de código.

## 4. Predicciones vs Realidad
* **Predicción 3 (Enum y Unique):** Se predijo que crearía el enum en un archivo separado o dentro de la entidad y usaría `@Column({ unique: true })`. Acertó totalmente al colocar el enum de forma clara.
* **Predicción 4 (Afectación a Platos):** Se predijo que la IA intentaría tocar archivos ajenos. Acertó parcialmente al requerir una revisión estricta en el registro de `AppModule`.

## 5. Comparación: Platos (D1 sin review) vs Mesas (D2 con review)
* En el Día 1 se aceptó el código de Platos con una revisión superficial, acumulando una pequeña deuda de entendimiento. En el Día 2, al aplicar un *code review* exhaustivo línea por línea, se detectaron modificaciones innecesarias antes de que se convirtieran en errores críticos para el módulo de Pedidos del día siguiente.