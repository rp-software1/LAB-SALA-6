Prediccion A

¿CarritoPage puede exportar metadata?
   
No.

¿Por qué sí o por qué no?

Porque CarritoPage es un Client Component (utiliza la directiva 'use client'), y en Next.js App Router
las exportaciones de metadata solo están soportadas en Server Components.

¿Qué hace que sea imposible?

La directiva 'use client', la cual le indica a Next.js que el componente se ejecuta en el navegador 
del usuario y no en el servidor durante la fase de renderizado preliminar (donde se procesa e inyecta 
la metadata en las etiquetas <head>).

Prediccion B

Si el restaurante usa imágenes de platos almacenadas en un servicio externo (como Cloudinary o AWS S3), 
¿qué hay que configurar en next.config.ts para que <Image> de Next.js las muestre?

¿Dónde se configura para imágenes externas? 

En el objeto images dentro del archivo de configuración next.config.ts.

¿Qué campo de next.config.ts controla eso? 

El campo remotePatterns (o domains en versiones anteriores).

Prediccion D

Si el backend no está corriendo cuando ejecutas npm run build, ¿el build va a fallar para las páginas con generateMetadata async que hacen fetch? 

¿El build falla si el backend está caído? 

Sí.

¿Por qué?

Porque durante el proceso de compilación (npm run build), Next.js ejecuta las funciones de prerenderizado y Server 
Components (como generateMetadata) que intentan realizar solicitudes fetch al servidor configurado. Si el backend
no está activo, la conexión es rechazada (ECONNREFUSED), lo que provoca que falle la compilación.

