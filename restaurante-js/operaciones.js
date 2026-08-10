// operaciones.js

import {
    obtenerMenu,
    actualizarStock
} from "./menu.js";

// ========================================
// BUSCAR PLATO
// ========================================

export function buscarPlatoPorNombre(nombre) {

    const menu = obtenerMenu();

    for (let i = 0; i < menu.length; i++) {

        if (
            menu[i].nombre.toLowerCase() ===
            nombre.toLowerCase()
        ) {
            return menu[i];
        }
    }

    return null;
}

// ========================================
// CONTAR PLATOS
// ========================================

export function contarPlatos() {

    const menu = obtenerMenu();

    return menu.length;
}

// ========================================
// STOCK BAJO
// ========================================

export function verStockBajo() {

    const menu = obtenerMenu();

    return menu.filter(function(plato) {
        return plato.stock > 0 && plato.stock <= 3;
    });
}

// ========================================
// ESTADO DEL PLATO
// ========================================

export function calcularEstadoPlato(plato) {

    if (plato.stock === 0) {
        return "Agotado";
    }

    if (plato.stock <= 3) {
        return "Stock bajo";
    }

    return "Disponible";
}

// ========================================
// ESTADO GENERAL
// ========================================

export function verificarEstadoGeneral() {

    const menu = obtenerMenu();

    let agotados = 0;
    let stockBajo = 0;

    for (let i = 0; i < menu.length; i++) {

        if (menu[i].stock === 0) {
            agotados++;
        }

        if (menu[i].stock > 0 && menu[i].stock <= 3) {
            stockBajo++;
        }
    }

    return `Agotados: ${agotados} | Stock bajo: ${stockBajo}`;
}

// ========================================
// RESUMEN DEL MENÚ
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

    if (cantidad <= 0 || isNaN(cantidad)) {

        return {
            ok: false,
            mensaje: "Cantidad no válida."
        };
    }

    if (plato.stock < cantidad) {

        return {
            ok: false,
            mensaje: "No hay suficiente stock."
        };
    }

    const nuevoStock = plato.stock - cantidad;

    actualizarStock(plato.nombre, nuevoStock);

    return {
        ok: true,
        mensaje: `Venta realizada. Nuevo stock de ${plato.nombre}: ${nuevoStock}`
    };
}