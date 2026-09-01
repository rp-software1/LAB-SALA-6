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