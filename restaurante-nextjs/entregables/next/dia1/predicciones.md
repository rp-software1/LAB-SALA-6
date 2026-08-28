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

Prediccion F   

1.¿Cuál es la diferencia entre la carpeta /mesas (sin corchetes) y la carpeta /[mesaId] (con corchetes)?

La carpeta sin corchetes es una ruta estática — solo responde a /mesas exactamente. Con corchetes es
dinámica — responde a /mesa/cualquier-valor y ese valor llega como params.mesaId.

2.¿Qué pasa si usas <a href="/menu"> en lugar de <Link href="/menu">?
 
Respuesta esperada: <a> hace una recarga completa del browser — se pierde el estado
de React y el beneficio del prefetching de Next.js. Link hace navegación del lado del
cliente sin recargar.

3. ¿Para qué sirve layout.tsx y qué NO debería ir ahí?

Respuesta esperada: Es el componente que envuelve todas las páginas — va el NavBar, 
body, html. NO va lógica específica de una página ni fetch de datos de una sola sección.

4. ¿Por qué NavBar necesita 'use client' y page.tsx de MesasPage no necesita esa directiva?

Respuesta esperada: NavBar usa usePathname() que es un hook — 
necesita el browser. MesasPage del Día 1 solo retorna JSX estático — puede 
correr en el servidor sin ningún problema.

5. Si el backend cambia el modelo de Mesa y agrega un campo nuevo, ¿en cuántos 
archivos de restaurante-nextjs hay que actualizar tipos hoy?

Hoy ninguno — las páginas todavía no llaman al backend. En los 
días siguientes, solo en types/index.ts y donde se consuma el dato.
