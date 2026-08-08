// 1) ARRAY DEL MENÚ
let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Chaufa", precio: 10, stock: 2 },
    { nombre: "Ceviche", precio: 15, stock: 7 }
];

// 2) OBTENER EL MENÚ
export function obtenerMenu() {
    return menu;
}

// 3) AGREGAR UN PLATO
export function agregarPlato(plato) {
    menu.push(plato);
}

// 4) ACTUALIZAR EL STOCK
export function actualizarStock(nombre, cantidad) {
    const plato = menu.find(
        plato => plato.nombre.toLowerCase().trim() === nombre.toLowerCase().trim()
    );

    if (!plato) {
        return false;
    }

    plato.stock += cantidad;
    return true;
}