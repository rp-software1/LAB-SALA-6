// DATOS DEL MENÚ

let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Chaufa", precio: 10, stock: 2 },
    { nombre: "Ceviche", precio: 15, stock: 7 }
];

// OBTENER MENÚ

export function obtenerMenu() {
    return menu;
}

// AGREGAR PLATO

export function agregarPlato(nombre, precio, stock) {
    menu.push({
        nombre: nombre,
        precio: precio,
        stock: stock
    });
}

// ACTUALIZAR STOCK

export function actualizarStock(nombre, nuevoStock) {
    for (let i = 0; i < menu.length; i++) {
        if (
            menu[i].nombre.toLowerCase() ===
            nombre.toLowerCase()
        ) {
            menu[i].stock = nuevoStock;
            return true;
        }
    }
    return false;
}