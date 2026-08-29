Predicción A

layout.tsx va a importar PedidoProvider. ¿layout.tsx necesita "use client" para poder 
importar un componente que sí tiene "use client"?

¿layout.tsx necesita "use client" para importar PedidoProvider?
No.

¿Por qué? 
Porque en el App Router de Next.js, un Server Component (como layout.tsx) puede importar y
renderizar componentes que utilizan la directiva 'use client' sin convertirse él mismo en 
un Client Component.