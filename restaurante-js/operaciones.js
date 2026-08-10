import {
    obtenerMenu,
    actualizarStock
} from "./menu.js";


// ====================================
// ERROR DE NEGOCIO PERSONALIZADO
// ====================================

export class ErrorNegocio extends Error {

    constructor(mensaje) {

        super(mensaje);

        this.name = "ErrorNegocio";
    }
}


// ====================================
// BUSCAR PLATO
// ====================================

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


// ====================================
// CONTAR PLATOS
// ====================================

export function contarPlatos() {

    const menu = obtenerMenu();

    return menu.length;
}


// ====================================
// STOCK BAJO
// ====================================

export function verStockBajo() {

    const menu = obtenerMenu();

    return menu.filter(function(plato) {

        return plato.stock > 0 &&
               plato.stock <= 3;

    });
}


// ====================================
// ESTADO DEL PLATO
// ====================================

export function calcularEstadoPlato(plato) {

    if (plato.stock === 0) {

        return "Agotado";
    }

    if (plato.stock <= 3) {

        return "Stock bajo";
    }

    return "Disponible";
}


// ====================================
// ESTADO GENERAL
// ====================================

export function verificarEstadoGeneral() {

    const menu = obtenerMenu();

    let agotados = 0;
    let stockBajo = 0;

    for (let i = 0; i < menu.length; i++) {

        if (menu[i].stock === 0) {

            agotados++;
        }

        if (
            menu[i].stock > 0 &&
            menu[i].stock <= 3
        ) {

            stockBajo++;
        }
    }

    return `Agotados: ${agotados} | Stock bajo: ${stockBajo}`;
}


// ====================================
// RESUMEN DEL MENÚ
// ====================================

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


// ====================================
// SIMULAR RESPUESTA DEL SERVIDOR
// ====================================

export function simularRespuestaServidor(resultado) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const falla = Math.random() < 0.3;

            if (falla) {

                reject(
                    new Error(
                        "Error del servidor simulado."
                    )
                );

            } else {

                resolve(resultado);
            }

        }, 2000);
    });
}


// ====================================
// VENDER PLATO ASÍNCRONO
// ====================================

export async function venderPlatoAsync(
    nombre,
    cantidad
) {

    const plato =
        buscarPlatoPorNombre(nombre);


    // Plato no encontrado

    if (!plato) {

        throw new ErrorNegocio(
            "Plato no encontrado."
        );
    }


    // Cantidad no válida

    if (
        cantidad <= 0 ||
        isNaN(cantidad)
    ) {

        throw new ErrorNegocio(
            "La cantidad debe ser mayor que cero."
        );
    }


    // Stock insuficiente

    if (cantidad > plato.stock) {

        throw new ErrorNegocio(
            `Stock insuficiente. Solo hay ${plato.stock} unidades.`
        );
    }


    // Esperar respuesta del servidor

    await simularRespuestaServidor(
        "Venta realizada"
    );


    // IMPORTANTE:
    // SOLO SE MODIFICA EL STOCK
    // SI EL SERVIDOR RESPONDE CORRECTAMENTE

    const nuevoStock =
        plato.stock - cantidad;


    actualizarStock(
        plato.nombre,
        nuevoStock
    );


    return `Venta realizada. Nuevo stock de ${plato.nombre}: ${nuevoStock}`;
}