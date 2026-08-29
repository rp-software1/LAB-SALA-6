Predicción A

¿Qué prefijo necesitan las variables de entorno de Next.js para que sean accesibles en el 
browser? ¿Y si solo necesitan estar en el servidor?

Prefijo para variables accesibles en el browser: NEXT_PUBLIC_

Prefijo para variables solo del servidor: Ninguno (sin prefijo)

Predicción B

MesasPage llama a getMesas() con await. Si el backend tarda 2 segundos en responder,
¿qué ve el usuario durante esos 2 segundos?

El usuario ve durante el fetch: El layout con NavBar y el contenido de loading.tsx

¿Quién muestra el loading — MesasPage o loading.tsx?

loading.tsx

Prediccion C

error.tsx captura: Ambos (errores de JavaScript en tiempo de ejecución y errores del fetch/backend).

¿Qué pasa si getMesas() lanza un Error con mensaje "503"? Se activa el componente error.tsx,
interceptando el error y mostrando la interfaz de error personalizada en lugar de la página normal.

