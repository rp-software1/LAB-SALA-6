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
        plato => plato.nombre.toLowerCase() === nombre.toLowerCase()
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

    for (let plato of menu) {
        totalStock += plato.stock;
    }

    return {
        totalPlatos: menu.length,
        totalStock: totalStock
    };
}


// ========================================
// VER STOCK BAJO
// ========================================

export function verStockBajo() {

    const menu = obtenerMenu();

    return menu.filter(
        plato => plato.stock <= 3
    );
}


// ========================================
// VENDER PLATO
// ========================================

export function venderPlato(nombre, cantidad) {

    const plato = buscarPlatoPorNombre(nombre);

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

    actualizarStock(
        nombre,
        plato.stock - cantidad
    );

    return "Venta realizada correctamente.";
}


// ========================================
// AGREGAR PLATO DEMO
// ========================================

export function agregarPlatoDemo() {

    agregarPlato(
        "Arroz tapado",
        17,
        5
    );
}


// ========================================
// VERIFICAR ESTADO GENERAL
// ========================================

export function verificarEstadoGeneral() {

    const menu = obtenerMenu();

    let agotados = 0;
    let stockBajo = 0;

    for (let plato of menu) {

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