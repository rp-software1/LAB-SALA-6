Cambio de Requisitos — Día 7

Cambio 1: Cantidades por plato
¿Cuántos archivos se modificaron? Se modificaron los archivos principales del módulo de pedidos y entidades de la base de datos, incluyendo la entidad del pedido, el DTO de creación (create-pedido.dto.ts), el servicio de pedidos (pedidos.service.ts) y la configuración de la relación para soportar la tabla intermedia con cantidades.

¿Se rompió algo? ¿Qué? Sí, al modificar la relación de ManyToMany simple a una relación explícita con una tabla intermedia (PedidoItem), se desconfiguraron temporalmente las consultas existentes que esperaban un arreglo plano de platoIds, y el cálculo del precio total falló hasta actualizar la lógica de suma con los multiplicadores de cantidad.

¿El total se calcula correctamente con cantidades? Sí, el total se actualizó para calcularse multiplicando el precio unitario de cada plato por su cantidad respectiva (SUM(plato.precio * item.cantidad)).

Cambio 2: Mesa auto-ocupada
¿Hubo dependencias circulares? ¿Cómo las resolvieron? Sí, se generaron dependencias circulares debido a que el módulo de Pedidos y el de Tickets necesitaban invocar los métodos del módulo de Mesas para actualizar sus estados (ocupada y disponible), mientras que Mesas se interrelacionaba de vuelta. Se resolvió aplicando el decorador forwardRef() de NestJS para diferir la carga de los módulos acoplados.

¿Usaron diagnóstico cruzado? ¿Fue útil? Sí, el uso de Gemini CLI para diagnosticar los errores de compilación y dependencias de manera aislada permitió ver el problema sin contaminarse con el historial de errores de Cursor, agilizando la solución de arquitectura.

¿El flujo completo funciona (crear pedido → mesa ocupada → pagar → mesa disponible)? Sí, se validó exitosamente todo el ciclo: al crear el pedido la mesa pasa automáticamente a estado 'ocupada', y tras pagar el ticket correspondiente, la mesa regresa de forma automática a estado 'disponible'.

La pregunta clave
Si estos dos cambios hubieran estado en una spec desde el Día 1, ¿habrían sido más fáciles de implementar? ¿Qué habría dicho esa spec?
Sí, habrían sido considerablemente más fáciles de implementar y diseñar desde el inicio. Una especificación técnica desde el Día 1 habría definido la necesidad de una tabla intermedia para los pedidos con atributos adicionales (como la cantidad) y habría anticipado la lógica de cambio de estados cruzados entre Pedidos, Tickets y Mesas. Habría evitado parches de arquitectura como dependencias circulares y refactorizaciones estructurales a mitad del desarrollo.