# Retrospectiva y Análisis — Día 9

## Semana 1 — La euforia

1. **¿Qué fue lo más impresionante de construir con IA? ¿El momento 'wow'?**
El momento más impresionante fue generar módulos complejos completos en cuestión de segundos a partir de un simple prompt, logrando que la aplicación levantara y funcionara de inmediato sin escribir cada línea de código manual.

2. **¿En qué momento se sintieron más productivos? ¿Día 1, 3, 4, 5?**
La mayor sensación de velocidad se experimentó hacia el Día 4 y 5, cuando ya se dominaba la estructura de los comandos y la integración de las herramientas con el framework.

3. **¿Cuántas veces aceptaron código de la IA sin entenderlo completamente?**
En las primeras sesiones de la Semana 1 ocurrió con relativa frecuencia debido a la confianza ciega en la velocidad de respuesta, aceptando fragmentos de código sin auditar su tipado interno o sus posibles efectos colaterales.

4. **¿El code review del Día 2 cambió cómo interactuaban con la IA en los días siguientes?**
Sí, totalmente. Obligó a pasar de un rol de "aceptar todo ciegamente" a un rol de revisión crítica, exigiendo explicaciones claras y validando que cada bloque tuviera un propósito arquitectónico definido.

---

## Semana 2 — El dolor

5. **DÍA 6 (Swap): ¿Qué fue lo más frustrante de trabajar en código ajeno?**
La falta de documentación inicial, la ausencia de un archivo de entorno (`.env.example`) claro y el acoplamiento imprevisto entre componentes que dificultaban entender por dónde comenzaba la lógica de negocio.

6. **DÍA 6 (Swap): ¿Qué faltó en el repo que recibieron? Sean específicos.**
Faltó una guía de instalación paso a paso en el README, la definición explícita de variables de entorno y un diagrama o descripción breve de la estructura de carpetas y endpoints.

7. **DÍA 7 (Cambio requisitos): ¿Cuántas cosas se rompieron al implementar los cambios?**
Se rompieron dependencias circulares y referencias cruzadas al intentar modificar los modelos de datos sobre la marcha sin una especificación previa robusta.

8. **DÍA 7: ¿El diagnóstico cruzado (Gemini CLI + Cursor) ayudó o fue innecesario?**
Fue sumamente útil. Utilizar una terminal independiente exclusivamente para diagnosticar errores permitió aislar el problema real sin corromper el código base existente en el editor principal.

9. **DÍA 8 (Proyecto personal): ¿Documentaron por iniciativa propia? ¿README, CHANGES.md, .env.example?**
Sí, se incorporó el hábito de documentar desde el inicio, creando instrucciones de uso, especificando dependencias y detallando la estructura modular del proyecto personal para garantizar su mantenibilidad.

10. **Si pudieran volver al Día 1 con lo que saben ahora, ¿qué harían diferente DESDE EL PRIMER COMMIT?**
Se establecería una estricta disciplina de especificación previa (spec), uso obligatorio de ramas de características desde el primer segundo, y documentación concurrente de cada cambio de arquitectura para evitar la deuda técnica heredada.