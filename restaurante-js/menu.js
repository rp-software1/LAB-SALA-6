// menu.js
// Datos del menú del restaurante

let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Chaufa", precio: 10, stock: 2 },
    { nombre: "Ceviche", precio: 15, stock: 7 }
];


// Obtener el menú completo
export function obtenerMenu() {
    return menu;
}


// Agregar un nuevo plato
export function agregarPlato(nombre, precio, stock) {

    menu.push({
        nombre: nombre,
        precio: precio,
        stock: stock
    });

}


// Actualizar el stock de un plato
export function actualizarStock(nombre, nuevoStock) {

    for (let i = 0; i < menu.length; i++) {

        if (menu[i].nombre.toLowerCase() === nombre.toLowerCase()) {

            menu[i].stock = nuevoStock;

            return true;
        }
    }

    return false;
}