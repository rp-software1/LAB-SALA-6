// operaciones.js

import {
    obtenerMenu,
    agregarPlato,
    actualizarStock
} from "./menu.js";


// ========================================
// BUSCAR PLATO
// ========================================

export function buscarPlatoPorNombre(nombre) {

    const menu = obtenerMenu();

    return menu.find(
        plato =>
            plato.nombre.toLowerCase() ===
            nombre.toLowerCase()
    );
}


// ========================================
// CONTAR PLATOS
// ========================================

export function contarPlatos() {

    const menu = obtenerMenu();

    return menu.length;
}


// ========================================
// OBTENER RESUMEN
// ========================================

export function obtenerResumenMenu() {

    const menu = obtenerMenu();

    let totalStock = 0;

    for (let i = 0; i < menu.length; i++) {

        totalStock += menu[i].stock;
    }

    return {
        totalPlatos: menu.length,
        totalStock: totalStock
    };
}


// ========================================
// VER STOCK BAJO
// ========================================

export function verStockBajo(limite = 3) {

    const menu = obtenerMenu();

    return menu.filter(
        plato => plato.stock <= limite
    );
}


// ========================================
// AGREGAR PLATO DEMO
// ========================================

export function agregarPlatoDemo() {

    agregarPlato(
        "Pollo a la brasa",
        20,
        5
    );

}


// ========================================
// VENDER PLATO
// ========================================

export function venderPlato(nombre, cantidad) {

    const plato = buscarPlatoPorNombre(nombre);


    if (!plato) {

        return {
            ok: false,
            mensaje: "Plato no encontrado."
        };
    }


    if (cantidad <= 0) {

        return {
            ok: false,
            mensaje: "Cantidad inválida."
        };
    }


    if (plato.stock === 0) {

        return {
            ok: false,
            mensaje: "No disponible. El plato está agotado."
        };
    }


    if (plato.stock < cantidad) {

        return {
            ok: false,
            mensaje: "Stock insuficiente."
        };
    }


    const nuevoStock =
        plato.stock - cantidad;


    actualizarStock(
        plato.nombre,
        nuevoStock
    );


    return {
        ok: true,
        mensaje:
            `Venta realizada: ${plato.nombre} x${cantidad}`
    };
}


// ========================================
// CALCULAR ESTADO DEL PLATO
// ========================================

export function calcularEstadoPlato(plato) {

    if (plato.stock === 0) {
        return "agotado";
    }

    if (plato.stock <= 3) {
        return "bajo";
    }

    return "normal";
}


// ========================================
// VERIFICAR ESTADO GENERAL
// ========================================

export function verificarEstadoGeneral() {

    const menu = obtenerMenu();

    let agotados = 0;
    let bajos = 0;


    for (let i = 0; i < menu.length; i++) {

        if (menu[i].stock === 0) {

            agotados++;

        } else if (menu[i].stock <= 3) {

            bajos++;
        }
    }


    if (agotados > 0) {

        return "Hay platos agotados";
    }


    if (bajos > 0) {

        return "Hay platos con stock bajo";
    }


    return "Todo disponible";
}