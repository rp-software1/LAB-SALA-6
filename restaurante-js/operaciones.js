// operaciones.js

import { obtenerMenu } from "./menu.js";

// 1) BUSCAR PLATO
function buscarPlato(nombre) {

    const menu = obtenerMenu();

    return menu.find(
        plato => plato.nombre.toLowerCase().trim() === nombre.toLowerCase().trim()
    );
}

// 2) VENDER PLATO
function venderPlato(nombre, cantidad) {
    const plato = buscarPlato(nombre);

    if (!plato) {
        return "Plato no encontrado.";
    }

    if (cantidad <= 0 || isNaN(cantidad)) {
        return "Cantidad inválida.";
    }

    if (plato.stock === 0) {
        return "No disponible.";
    }

    if (cantidad > plato.stock) {
        return "Stock insuficiente.";
    }

    plato.stock -= cantidad;

    return "Venta realizada correctamente.";
}

// 3) VERIFICAR ESTADO GENERAL

export function verificarEstadoGeneral() {

    const menu = obtenerMenu();

    let agotados = 0;
    let stockBajo = 0;

    for (const plato of menu) {
        if (plato.stock === 0) {
            agotados++;
        } else if (plato.stock <= 3) {
            stockBajo++;
        }
    }

    return {
        agotados: agotados,
        stockBajo: stockBajo
    };
}

// 4) FILTRAR STOCK BAJO
function filtrarStockBajo() {

    const menu = obtenerMenu();

    return menu.filter(plato => plato.stock > 0 && plato.stock <= 3);
}