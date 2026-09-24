# Hallazgos del Swap — Día 6

## Sala que trabajó: I-SALAY
## Repo que recibimos: I-SALAX

---

### 1. ¿El proyecto levantó a la primera? ¿Cuánto tardaron?
* **Resultado:** No levantó de inmediato al ejecutar comandos automáticos desde la raíz del entorno.
* **Tiempo estimado:** Aprox. 15 minutos en identificar la estructura y ajustar la ubicación del proyecto.
* **Detalle:** La herramienta de automatización intentaba ejecutar scripts de `npm` (`npm run lint`, `npm test`) en la carpeta raíz del workspace (`LAB-SALA-6-`) en lugar de la carpeta del proyecto NestJS (`restaurante-presaid`), lo que arrojaba errores de archivo no encontrado (`ENOENT: package.json`).

---

### 2. ¿Qué documentación encontraron? (README, .env.example, CHANGES.md)
* **Documentación mínima:** El repositorio no contaba con un `README.md` explicativo ni con un contrato de API claro para los módulos preexistentes (`platos`, `mesas`, `pedidos`).
* Se encontraron únicamente los archivos de seguimiento interno (`presaid-d1.md` a `presaid-d5.md`), pero sin guía de arquitectura o setup para un desarrollador externo.

---

### 3. ¿Qué tuvieron que ADIVINAR para poder trabajar?
* **Estructura y tipos de las entidades:** Se debió inspeccionar directamente el archivo `plato.entity.ts` para determinar el tipo de clave primaria (ID numérica) y la forma en que estaba definida la entidad.
* **Ubicación de archivos:** Hubo que navegar manualmente por la estructura del proyecto en `src/` para identificar cómo nombraban sus DTOs, controladores y servicios antes de crear el módulo de `resenas`.

---

### 4. ¿La IA pudo entender el código ajeno? ¿Dónde se confundió?
* **Análisis de la IA:** Composer logró generar el módulo inicial, pero sufrió confusiones críticas:
  1. **Tipado de TypeORM:** En `platos.service.ts`, la IA intentó cargar la relación usando un arreglo de cadenas `relations: ['resenas']`, lo que causó el error de compilación TypeScript `TS2559`.
  2. **Entorno de ejecución:** La IA ejecutaba comandos de terminal desde la raíz del espacio de trabajo y no desde la subcarpeta `restaurante-presaid`.

---

### 5. ¿Rompieron algo al agregar la feature? ¿Pudieron arreglarlo?
* **Sí, se presentaron dos fallas durante el proceso:**
  1. **Error TS2559 en `PlatosService`:** Se rompió la compilación al intentar incluir las reseñas en `GET /platos/:id`. Se corrigió modificando la sintaxis a objeto: `relations: { resenas: true }`.
  2. **Error de sintaxis en terminal (PowerShell):** El comando encadenado `git checkout main && git merge feature/resenas` falló por la compatibilidad del operador `&&` en PowerShell. Se arregló separando las instrucciones mediante `;` o en líneas independientes.
* **Resultado:** Se resolvieron todos los bloqueos, la compilación volvió a `Found 0 errors` y se validó la persistencia y consulta mediante `curl`.

---

### 6. ¿Qué DEBERÍA haber tenido el repo para que pudieran trabajar sin adivinar?
* **Especificación técnica (Spec / SAID):** Un documento central que defina los modelos de datos, relaciones e interfaces de la API.
* **Contrato de API (OpenAPI / Swagger o Postman Collection):** Para conocer las estructuras JSON exactas que se esperan y devuelven.
* **Guía de inicio en README.md:** Un paso a paso especificando la subcarpeta correcta de trabajo, variables de entorno necesarias y scripts de validación.

---

### 7. ¿Su propio repo tiene los mismos problemas?
* **Reflexión:** Sí. Al trabajar aceleradamente confiando solo en el contexto de la IA, descuidamos la documentación explícita. Si otra sala tomara nuestro proyecto original sin explicación previa, enfrentaría los mismos bloqueos para entender las decisiones de diseño que tomamos.

---

## Evaluación E1-E8 del Repo Ajeno

- [x] **E1 - Estructura de carpetas:** Cumple (Estructura estándar de NestJS).
- [x] **E2 - Entidades TypeORM:** Cumple (Entidades declaradas correctamente).
- [X] **E3 - Documentación README:** Incompleto (Sin instrucciones de onboarding/setup).
- [X] **E4 - Manejo de variables de entorno (.env.example):** Ausente o poco claro.
- [x] **E5 - DTOs y Validaciones:** Cumple (Uso de `class-validator`).
- [x] **E6 - Compilación limpia:** Cumple (Tras solucionar el error de sintaxis en `relations`).
- [x] **E7 - Endpoints funcionales:** Cumple (`/platos`, `/mesas`, `/pedidos` operativos).
- [x] **E8 - Facilidad de integración:** Regular (Requirió intervención manual para ajustar la relación inversa).