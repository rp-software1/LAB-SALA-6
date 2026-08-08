// ui.js

import { obtenerMenu } from "./menu.js";

import {
    buscarPlatoPorNombre,
    contarPlatos,
    obtenerResumenMenu,
    verStockBajo,
    venderPlato,
    agregarPlatoDemo,
    verificarEstadoGeneral
} from "./operaciones.js";


// ========================================
// MOSTRAR LISTAS
// ========================================

export function renderLista(lista) {

    let html = "";

    for (let i = 0; i < lista.length; i++) {

        const plato = lista[i];

        let clase = "";

        if (plato.stock === 0) {
            clase = "agotado";

        } else if (plato.stock <= 3) {
            clase = "bajo";

        } else {
            clase = "normal";
        }

        html += `
            <li class="${clase}">
                ${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}
            </li>
        `;
    }

    return html;
}


// ========================================
// MOSTRAR MENSAJES
// ========================================

export function mostrarMensajes(mensaje) {

    const output = document.getElementById("output");

    output.innerHTML = mensaje;
}


// ========================================
// MOSTRAR MENÚ
// ========================================

export function renderMenu() {

    const output = document.getElementById("output");

    let html = "";

    const estado = verificarEstadoGeneral();

    if (estado.agotados > 0) {

        html += `
            <p>
                ⚠️ Hay ${estado.agotados} plato(s) agotado(s).
            </p>
        `;
    }

    if (estado.stockBajo > 0) {

        html += `
            <p>
                ⚠️ Hay ${estado.stockBajo} plato(s) con stock bajo.
            </p>
        `;
    }

    const menu = obtenerMenu();

    html += renderLista(menu);

    html += `
        <p>
            Total de platos en el menú: ${contarPlatos()}
        </p>
    `;

    output.innerHTML = html;
}


// ========================================
// INICIALIZAR BOTONES
// ========================================

export function iniciarUI() {

    // ====================================
    // BOTÓN MOSTRAR
    // ====================================

    document
        .getElementById("btnMostrar")
        .addEventListener("click", () => {

            renderMenu();

        });


    // ====================================
    // BOTÓN AGREGAR
    // ====================================

    document
        .getElementById("btnAgregar")
        .addEventListener("click", () => {

            agregarPlatoDemo();

            renderMenu();

        });


    // ====================================
    // BOTÓN BUSCAR
    // ====================================

    document
        .getElementById("btnBuscar")
        .addEventListener("click", () => {

            const nombre =
                document.getElementById("inputBuscar").value;

            const plato =
                buscarPlatoPorNombre(nombre);

            const output =
                document.getElementById("output");

            if (plato) {

                output.innerHTML =
                    `Plato encontrado: ${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}`;

            } else {

                output.innerHTML =
                    "Plato no encontrado.";
            }

        });


    // ====================================
    // BOTÓN RESUMEN
    // ====================================

    document
        .getElementById("btnResumen")
        .addEventListener("click", () => {

            const resumen =
                obtenerResumenMenu();

            const output =
                document.getElementById("output");

            output.innerHTML = `
                <h3>Resumen del menú</h3>

                <p>
                    Total de platos:
                    ${resumen.totalPlatos}
                </p>

                <p>
                    Total de productos en stock:
                    ${resumen.totalStock}
                </p>
            `;

        });


    // ====================================
    // BOTÓN STOCK BAJO
    // ====================================

    document
        .getElementById("btnStockBajo")
        .addEventListener("click", () => {

            const platos =
                verStockBajo();

            const output =
                document.getElementById("output");

            output.innerHTML = `
                <h3>Stock bajo</h3>
                ${renderLista(platos)}
            `;

        });


    // ====================================
    // BOTÓN VENDER
    // ====================================

    document
        .getElementById("btnVender")
        .addEventListener("click", () => {

            const nombre =
                document.getElementById("inputVender").value;

            const cantidad =
                Number(
                    document.getElementById("inputCantidad").value
                );

            const mensaje =
                venderPlato(nombre, cantidad);

            alert(mensaje);

            renderMenu();

        });
}