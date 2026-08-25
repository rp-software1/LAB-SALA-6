Predicción A

1. ¿Qué archivo generará el comando de instalación además de actualizar package.json?
Generará package-lock.json, aunque si se usa otro gestor de paquetes puede generar yarn.lock o
pnpm-lock.yaml.

2. ¿Qué opciones del tsconfig.json son específicas para React con JSX?
Las principales son "jsx": "react-jsx", "jsxImportSource" y las librerías "DOM" y "DOM.Iterable" 
dentro de "lib".

Predicción B

1. ¿Cuántos archivos vas a renombrar en total? Lista sus nombres.
Se renombrarán 8 archivos: App.jsx, main.jsx, PlatoCard.jsx, MesaCard.jsx, MenuPage.jsx,
CarritoPage.jsx, MesasPage.jsx y api.js, pasando los componentes a .tsx y api.js a .ts.

2. ¿En qué tipo de líneas crees que aparecerá el primer error TS?
Creo que los primeros errores aparecerán en las importaciones y en las funciones o 
props que todavía no tengan tipos definidos, porque TypeScript exigirá especificarlos 
correctamente.

Predicción C PlatoCard.tsx

1. ¿Cuáles son los atributos y tipos del modelo Plato?
El modelo Plato tendría _id como string, nombre como string, precio como number, 
categoria como string y disponible como boolean.

Predicción D / E — api.ts

1. Si getMesas() retorna Promise<Mesa[]>, ¿qué tipo tiene mesas en const mesas = await getMesas()?
mesas tendrá el tipo Mesa[], es decir, será un arreglo que contiene objetos del tipo Mesa.
