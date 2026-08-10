// ui.js

import {
    obtenerMenu,
    agregarPlato
} from "./menu.js";

import {
    buscarPlatoPorNombre,
    contarPlatos,
    obtenerResumenMenu,
    verStockBajo,
    venderPlatoAsync,
    calcularEstadoPlato,
    verificarEstadoGeneral
} from "./operaciones.js";

// ========================================
// MOSTRAR LISTA
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
// MOSTRAR MENSAJE CON ESTADO
// ========================================

export function mostrarMensajes(mensaje, estado = "") {

    const output = document.getElementById("output");

    output.innerHTML = `
        <p class="mensaje ${estado}">
            ${mensaje}
        </p>
    `;
}

// ========================================
// MOSTRAR MENÚ
// ========================================

export function renderMenu() {

    const output =
        document.getElementById("output");

    const menu =
        obtenerMenu();

    let html = "";

    html += `
        <h3>Menú del restaurante</h3>

        <ul>
            ${renderLista(menu)}
        </ul>
    `;

    // TOTAL DE PLATOS

    html += `
        <p>
            <strong>Total de platos: ${contarPlatos()}</strong>
        </p>
    `;

    // ESTADO GENERAL

    html += `
        <p>
            ${verificarEstadoGeneral()}
        </p>
    `;

    output.innerHTML = html;
}

// ========================================
// INICIAR EVENTOS
// ========================================

export function iniciarUI() {

    // ====================================
    // MOSTRAR MENÚ
    // ====================================

    const btnMostrar =
        document.getElementById("btnMostrar");

    if (btnMostrar) {

        btnMostrar.addEventListener(
            "click",
            renderMenu
        );
    }

    // ====================================
    // AGREGAR PLATO
    // ====================================

    const btnAgregar =
        document.getElementById("btnAgregar");

    if (btnAgregar) {

        btnAgregar.addEventListener(
            "click",
            () => {

                agregarPlato(
                    "Pollo a la brasa",
                    20,
                    4
                );

                renderMenu();
            }
        );
    }

    // ====================================
    // BUSCAR
    // ====================================

    const btnBuscar =
        document.getElementById("btnBuscar");

    if (btnBuscar) {

        btnBuscar.addEventListener(
            "click",
            () => {

                const input =
                    document.getElementById("inputBuscar");

                const nombre =
                    input.value.trim();

                if (nombre === "") {

                    mostrarMensajes(
                        "Escribe un nombre para buscar."
                    );

                    return;
                }

                const plato =
                    buscarPlatoPorNombre(nombre);

                if (!plato) {

                    mostrarMensajes(
                        "Plato no encontrado."
                    );

                    return;
                }

                mostrarMensajes(
                    `Plato encontrado:
                    ${plato.nombre}
                    — S/ ${plato.precio}
                    — Stock: ${plato.stock}`
                );
            }
        );
    }

    // ====================================
    // STOCK BAJO
    // ====================================

    const btnStockBajo =
        document.getElementById("btnStockBajo");

    if (btnStockBajo) {

        btnStockBajo.addEventListener(
            "click",
            () => {

                const platos =
                    verStockBajo();

                if (platos.length === 0) {

                    mostrarMensajes(
                        "No hay platos con stock bajo."
                    );

                    return;
                }

                const output =
                    document.getElementById("output");

                output.innerHTML = `
                    <h3>Stock bajo</h3>

                    <ul>
                        ${renderLista(platos)}
                    </ul>
                `;
            }
        );
    }

    // ====================================
    // RESUMEN
    // ====================================

    const btnResumen =
        document.getElementById("btnResumen");

    if (btnResumen) {

        btnResumen.addEventListener(
            "click",
            () => {

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
            }
        );
    }

  // ====================================
// VENDER - ASÍNCRONO
// ====================================

const btnVender = document.getElementById("btnVender");

if (btnVender) {

    btnVender.addEventListener("click", async () => {

        const nombre = document
            .getElementById("inputVender")
            .value
            .trim();

        const cantidad = Number(
            document
                .getElementById("inputCantidad")
                .value
        );

        try {

            // MIENTRAS ESPERA → AZUL
            mostrarMensajes(
                "Procesando...",
                "procesando"
            );

            const respuesta = await venderPlatoAsync(
                nombre,
                cantidad
            );

            // ÉXITO → VERDE
            mostrarMensajes(
                `Venta realizada. ${respuesta}`,
                "exito"
            );

            setTimeout(() => {
                renderMenu();
            }, 2000);

        } catch (error) {

            // ERROR → ROJO
            mostrarMensajes(
                `Error: ${error.message}`,
                "error"
            );
        }
    });
}
}