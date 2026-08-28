Predicción A

¿Qué estructura de carpetas genera create-next-app? Escríbela de memoria antes de 
ejecutar el comando.
Respuesta: app/, public/, node_modules/ y archivos de configuración en la raíz.

Carpetas que esperas ver:
Respuesta: app/, public/ y node_modules/.

¿Existe un archivo de rutas tipo App.tsx?
Respuesta: No. En Next.js las rutas se gestionan principalmente mediante la carpeta 
app/ y archivos como page.tsx.

Predicción B

El NavBar de React Día 1 usaba NavLink con activeClassName o className con función. 
¿Eso va a funcionar en Next.js sin cambios, o necesita adaptación?

¿NavLink funciona en Next.js? 
No, no existe en Next.js.

¿Qué import cambia? 
Se cambia de react-router-dom (NavLink) a next/link (Link), complementado con usePathname 
de next/navigation para detectar la ruta activa.

Prediccion C

¿Cuántas carpetas van a crear en este bloque? Lista los nombres de las carpetas antes de ejecutar
el primer mkdir.

Se van a crear 3 carpetas para las rutas principales de la aplicación 
dentro del directorio app.

Nombres de las carpetas: mesas, menu, y carrito.

Carpetas a crear:

app/mesas, app/menu, app/carrito

Archivos page.tsx a crear:

3 archivos page.tsx en total (uno por cada ruta):

app/mesas/page.tsx

app/menu/page.tsx

app/carrito/page.ts

Prediccion D

¿Cómo llega el parámetro mesaId al componente page.tsx? ¿Como prop, como hook, o de otra forma?

El componente recibe mesaId como: prop

¿Es string o puede ser number?

Es string (Next.js siempre lo pasa como string)