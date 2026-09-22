Predicción A — Eliminación de duplicados

1. ¿Qué archivos del proyecto actual ya tienen declaradas interfaces que quedarán duplicadas al crear types/index.ts?
Las interfaces duplicadas están principalmente en src/services/api.ts, src/components/PlatoCard.tsx, 
src/components/MesaCard.tsx y src/context/PedidoContext.tsx.

2. ¿Qué tipos se repiten en esos archivos?
Los tipos que pueden repetirse son Plato, Mesa, ItemPedido, Pedido, EstadoMesa y TipoPedido, 
por lo que conviene centralizarlos en types/index.ts.

Predicción B — Limpieza de duplicados

1. ¿Cuántas declaraciones duplicadas vas a eliminar?
Se eliminarán aproximadamente entre 4 y 5 declaraciones duplicadas, dependiendo de cómo 
estén organizados los tipos actualmente en el proyecto.

2. ¿Qué tipos se van a eliminar de api.ts?
De api.ts se pueden eliminar tipos como Plato, Mesa, Pedido, ItemPedido y CrearPedidoData, 
porque pasarán a estar definidos en types/index.ts.

Predicción C — Parámetros en PedidoContext

1. ¿Qué recibe agregarPlato?
agregarPlato recibe un parámetro plato de tipo Plato, porque necesita conocer 
toda la información del producto que se agregará al pedido.

2. ¿Qué recibe quitarPlato?
quitarPlato recibe platoId de tipo string, ya que utiliza el identificador del
plato para saber cuál debe eliminar.

3. ¿Qué recibe cambiarTipo?
cambiarTipo recibe tipo de tipo TipoPedido, que limita la opción a los valores permitidos,
como "mesa" o "para_llevar".

4. ¿Qué recibe asignarMesa?
asignarMesa recibe mesaId de tipo string, que corresponde al identificador 
de la mesa seleccionada.

5. ¿Qué parámetros recibe limpiarPedido?
limpiarPedido no recibe ningún parámetro, porque su función es simplemente limpiar o 
reiniciar el pedido actual.

BLOQUE D 

1. ¿Qué ocurre si asignamos "cerrado" a una variable de tipo EstadoMesa?
TypeScript lo rechazará porque "cerrado" no pertenece a las opciones permitidas del Union
Type, como "disponible", "ocupada" o "reservada".

2. ¿Por qué es importante usar undefined en createContext?
Permite detectar si un componente está usando el contexto fuera de PedidoProvider, evitando asumir que el 
contexto siempre existe y ayudando a encontrar el error antes de que cause problemas en ejecución.

3. ¿Cuál es la diferencia entre type e interface?
interface se usa principalmente para definir la estructura de objetos y puede extenderse, mientras que type
es más flexible y también permite crear uniones, intersecciones y otros tipos.

4. ¿Qué es un Intersection Type (&)?
Es una forma de combinar dos o más tipos en uno solo. Por ejemplo, podemos combinar Mesa con 
{ estaSeleccionada: boolean } para crear un nuevo tipo con todas las propiedades de ambos.

5. ¿Qué ocurre si agregamos foto?: string a Plato?
La propiedad foto será opcional, por lo que los platos podrán existir sin ella, pero 
TypeScript nos obligará a comprobar que foto exista antes de utilizar métodos como toLowerCase().

BLOQUE F — Reflexión Final

1. ¿Por qué puede seguir habiendo errores TypeScript en las pages/ después del Día 2?
No significa que el trabajo esté mal, porque las páginas todavía pueden necesitar adaptarse
a los nuevos tipos y estructuras. Esos ajustes pueden completarse en los siguientes días.

2. ¿Qué aprendiste hoy que cambiará la forma de estructurar tu código TypeScript?
Aprendí que es mejor centralizar los tipos en un solo lugar y evitar repetir interfaces en 
diferentes archivos, porque así el código queda más ordenado y fácil de mantener.

3. Si un compañero te pregunta para qué sirve types/index.ts, ¿qué le dirías?
Le diría que es como el diccionario central del proyecto, donde definimos una 
sola vez tipos como Plato, Mesa o Pedido para que todo el proyecto pueda utilizarlos
sin duplicarlos.
