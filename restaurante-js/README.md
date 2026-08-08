# restaurante-js
Proyecto acumulativo — Sprint 0 JavaScript
Autores: [luisA] y [renzoB]
"Estado: en desarrollo — JS Sprint 0"

“Estructura del proyecto”

Index.html: Contiene la estructura visual de la aplicación al momento de llegar a ejecutar mostrandose el menu del
restaurante. Aquí se encuentran los botones, los campos de entrada, títulos y el contenedor de informacion de los platos donde se muestran los resultados.

Main.js: Se encarga de administrar los datos del menú. Solamente conteniendo el menu de losplatos con la funcion obtenermenu()
agregarplato(), actualizarstock(). La funcion es mantener y modificar los  datos del menu.

Menu.js: Contiene la lógica de negocio del restaurante. Donde se muestran las acciones de buscar, contar, obtener, ver ell stock,
vender, agregar y verificar. El archivo trabaja directamente con el htm. Solamente maneja  la aplicacion de las reglas y 
operaciones del sistema.

operaciones.js: Se encarga de la interfaz de usuario y de la interacción con el DOM para que se vea todo lo programado. El unico
archivo que utiliza directamente elementos como getElementByid y el innerHTML.

ui.js: Es el punto de entrada al momento de generar la conexion. La funcion es conectar todos los datos y cumpla con el proyecto.
