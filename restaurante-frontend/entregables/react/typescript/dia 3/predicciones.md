Predicción A

1. ¿Qué tipo tiene data después del await?
data tiene el tipo Mesa[], porque TypeScript lo infiere a partir del valor que retorna getMesas().

2. ¿Qué tipo tiene el parámetro err en el catch?
El parámetro err tiene el tipo unknown, por lo que debemos comprobar qué tipo de error es antes de utilizarlo.

Predicción B

1. ¿Qué campos van en el body?
En el body van mesaId, items, total, estado y notas de manera opcional.

2. ¿Qué campos no van porque los excluye Omit?
No van _id, creadoEn ni actualizadoEn, porque son datos que normalmente genera el backend.

Predicción C

1. ¿Qué tipo tiene mesaId después de useParams<{ mesaId: string }>()?
mesaId tiene el tipo string | undefined, porque React Router no garantiza que el parámetro exista.

2. ¿Se necesita un guard para undefined?
Sí. Debemos comprobar que mesaId exista antes de utilizarlo, por ejemplo con if (!mesaId) return.

Reflexión y Cierre — Día 3

1. ¿Cuántos errores quedan ahora después del Bloque C?
Quedan 0 errores de TypeScript, lo que indica que la aplicación quedó correctamente tipada según las comprobaciones realizadas.

2. ¿Cuál es la diferencia entre un error de TypeScript y un error de runtime?
Un error de TypeScript se detecta antes de ejecutar la aplicación, mientras que un error de runtime ocurre cuando la aplicación ya está funcionando. TypeScript ayuda principalmente a detectar problemas antes de la ejecución.

3. Si el backend cambia la interfaz de Mesa, ¿TypeScript avisa automáticamente?
No directamente. Si el backend cambia sus datos, primero debemos actualizar el tipo Mesa en el frontend; después TypeScript mostrará los lugares donde ese cambio genera incompatibilidades.

Cuestionario de Análisis Técnico

1. ¿Qué errores de runtime previene TypeScript y cuáles no?
TypeScript ayuda a prevenir problemas como acceder a propiedades que podrían no existir, pero no puede detectar fallos reales de red, respuestas incorrectas del backend o errores de lógica que ocurren durante la ejecución.

2. ¿Por qué useParams devuelve string | undefined? ¿Es un bug?
No es un bug, es una decisión intencional. React Router no puede garantizar que el parámetro exista en la URL, por eso TypeScript nos obliga a comprobar si es undefined.

3. ¿Qué hace Pick<T, K>?
Pick permite crear un nuevo tipo seleccionando solamente algunas propiedades de otro tipo. Por ejemplo, podemos obtener de Plato únicamente nombre y precio.

4. ¿Qué hace Partial<T>?
Partial convierte todas las propiedades de un tipo en opcionales. Es útil cuando queremos actualizar solamente algunos campos de un objeto.

5. ¿Qué hace Required<T>?
Required convierte todas las propiedades de un tipo en obligatorias, incluso aquellas que originalmente estaban definidas como opcionales.

6. ¿Qué es el Type Narrowing?
Es el proceso mediante el cual TypeScript reduce un tipo amplio a uno más específico después de realizar una comprobación. Por ejemplo, después de verificar que mesaId existe, pasa de string | undefined a string.

7. ¿Qué es un Truthiness Guard?
Es una comprobación que verifica si un valor existe. Por ejemplo, if (!mesaId) return permite a TypeScript saber que después de esa condición mesaId es un string.

8. ¿Qué es un instanceof guard?
Es una comprobación que permite saber si un valor pertenece a una determinada clase. Por ejemplo, err instanceof Error permite confirmar que err es un objeto de error y acceder a err.message.

9. ¿Qué es un typeof guard?
Permite comprobar el tipo de un valor. Por ejemplo, typeof precio === "number" confirma que precio es un número antes de utilizar métodos propios de ese tipo.

10. ¿Qué es un Equality Guard?
Es una comprobación mediante igualdad que permite reducir un tipo. Por ejemplo, comprobar mesa.estado === "disponible" permite trabajar específicamente con ese estado.

TypeScript en React vs. Next.js

11. ¿Cuál es la diferencia entre TypeScript en React y Next.js?
En React tradicional la aplicación normalmente funciona como una SPA en el cliente, mientras que Next.js también permite trabajar con componentes del servidor, Server Actions, rutas y operaciones que se ejecutan en el servidor.

12. ¿Qué tipos podemos encontrar en Next.js?
Algunos tipos comunes son Metadata, PageProps, NextRequest y NextResponse, que ayudan a tipar diferentes partes de una aplicación Next.js.

13. ¿Qué ventaja tiene tipar los parámetros de una página en Next.js?
Permite saber exactamente qué parámetros recibe la página y evita errores al utilizarlos, especialmente cuando trabajamos con rutas dinámicas.

🚀 Preguntas Finales de Evaluación

1. ¿En cuánto tiempo entiende el modelo de datos un nuevo desarrollador?
Puede entenderlo en pocos minutos porque los tipos están centralizados en src/types/index.ts, donde puede revisar rápidamente estructuras como Plato, Mesa y Pedido.

2. ¿Qué errores siguen siendo posibles aunque el proyecto compile con 0 errores?
Todavía pueden existir errores de lógica, problemas visuales, fallos de conexión y respuestas inesperadas del backend. Que compile correctamente no significa que la aplicación sea perfecta.

3. ¿Qué tres cosas extrañarías si trabajaras sin TypeScript en Next.js?
Extrañaría principalmente el autocompletado inteligente, la refactorización segura y las advertencias que ayudan a evitar errores con valores undefined y tipos incorrectos.