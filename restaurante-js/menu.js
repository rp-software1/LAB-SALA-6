// menu.js
// Menú del restaurante
const menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Chaufa", precio: 10, stock: 2 },
    { nombre: "Ceviche", precio: 15, stock: 7 }
];

// Obtener el menú
export function obtenerMenu() {
    return menu;
}

// Agregar un plato
export function agregarPlato(nombre, precio, stock) {
    menu.push({
        nombre: nombre,
        precio: precio,
        stock: stock
    });
}
 
// Actualizar stock
export function actualizarStock(nombre, nuevoStock) {
    const plato = menu.find(
        plato => plato.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (plato) {
        plato.stock = nuevoStock;
    }
}