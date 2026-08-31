Predicción A

layout.tsx va a importar PedidoProvider. ¿layout.tsx necesita "use client" para poder 
importar un componente que sí tiene "use client"?

¿layout.tsx necesita "use client" para importar PedidoProvider?
No.

¿Por qué? 
Porque en el App Router de Next.js, un Server Component (como layout.tsx) puede importar y
renderizar componentes que utilizan la directiva 'use client' sin convertirse él mismo en 
un Client Component.

Predicción B

¿Dónde exactamente en PlatoCard.tsx van a agregar la llamada a agregarPlato(plato)? 
¿Antes o después del setAgregado(true)?

Línea donde va agregarPlato(plato): 
setAgregado(true)

¿El estado local agregado sigue sirviendo?
Sí, se mantiene para gestionar el feedback visual temporal del botón 
(cambiar a color verde y mostrar "✓ Agregado").

Prediccion C

¿CarritoPage puede exportar metadata de Next.js? ¿Por qué?

No, porque es un Client Component y la metadata solo es compatible
con Server Components.

¿metadata funciona en Client Components?

No.

Si no funciona, ¿cómo se cambia el title de la pestaña en una página Client?

Usando el hook de efectos de navegador (como useEffect) modificando directamente document.title.