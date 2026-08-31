Prediccion A

¿El backend tiene un endpoint GET /mesas/:id? Verificarlo con Postman 
antes de escribir código. ¿Qué retorna si el ID no existe — un 404 o
un objeto vacío?
¿GET /mesas/:id existe?

Sí

¿Qué retorna si el ID no existe?

Un código de estado 404 (Not Found).

Prediccion B

¿generateMetadata puede hacer fetch de datos del backend para construir el title dinámico? 
¿O solo puede usar los params de la URL?

Sí, puede hacer fetch de datos del backend de forma dinámica. No se limita a usar
únicamente los parámetros de la URL.

¿generateMetadata puede hacer await?

Sí, puede ser una función asíncrona (async) y usar await para esperar promesas 
(como resolver los params o peticiones a bases de datos/APIs).

¿Puede llamar a getMesaById()?

Sí, puede llamar directamente a funciones del backend como getMesaById() para obtener 
la información necesaria antes de retornar el objeto de metadatos.

Prediccion  C

¿El Suspense manual que envuelve <MesaDetalle> en page.tsx — cuándo exactamente muestra el 
skeleton? ¿MesaDetalle hace algún fetch asíncrono?

¿Cuándo se muestra el skeleton de MesaDetalle?

No llega a mostrarse (o solo lo hace de forma imperceptible), ya que los datos de la mesa 
ya se obtuvieron de forma síncrona en el servidor (page.tsx) mediante await antes de renderizar 
el componente. El <Suspense> en este punto específico no retiene el renderizado porque la prop mesa ya está resuelta.

¿MesaDetalle hace fetch o solo usa los datos que recibe por prop?

Solo usa los datos que recibe por prop (initialMesa), los cuales almacena en un estado local 
(useState) para permitir la interacción y actualización en la interfaz.



