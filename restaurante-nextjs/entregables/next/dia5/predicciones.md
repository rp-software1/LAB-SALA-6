Prediccion A
  
¿El backend tiene GET /pedidos?estado=pendiente para filtrar? Verificarlo con Postman antes 
de escribir código.

¿GET /pedidos?estado=pendiente funciona?

No, al ser un entorno puramente frontend con un store en memoria, el parámetro de consulta es 
ignorado a menos que filtremos el array manualmente.

URL exacta de PATCH para cambiar estado: 

/pedidos/[_id]/estado

Prediccion B

¿generateMetadata necesita async en /comandas? ¿Necesita hacer fetch para construir el título?

No, no necesita ser asíncrona ni hacer un fetch para construir el título porque el texto es estático
y no depende de datos externos o dinámicos del backend.

¿Puede ser síncrona?

Sí

¿Por qué?

Porque se define directamente como un objeto estático (export const metadata), lo cual es la forma 
más simple y limpia cuando el título de la página no requiere consultas a bases de datos o servicios externos.

Prediccion  C

¿Qué muestra ComandaCard para un pedido tipo "para_llevar" donde mesaId es null?

Para un pedido "para_llevar" muestra: "Para Llevar" (o "Para llevar" / el identificador
de tipo, ya que al ser mesaId null no muestra el número de mesa).

Para un pedido "mesa" muestra: "Mesa X" (donde X representa el número o identificador asignado a 
la mesa, por ejemplo "Mesa 1"). 