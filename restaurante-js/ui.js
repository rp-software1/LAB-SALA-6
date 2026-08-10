import {obtenerMenu,agregarPlato} from "./menu.js";
import {buscarPlatoPorNombre,contarPlatos,obtenerResumenMenu,verStockBajo,venderPlatoAsync,verificarEstadoGeneral} from "./operaciones.js";

// MOSTRAR LISTA

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
                ${plato.nombre}
                — S/ ${plato.precio}
                — Stock: ${plato.stock}
            </li>
        `;
    }
    return html;
}

// MOSTRAR MENSAJES

export function mostrarMensajes(
    mensaje,
    estado = ""
) {
    const output =
        document.getElementById("output");
    let color = "black";
    if (estado === "procesando") {
        color = "blue";
    }
    if (estado === "exito") {
        color = "green";
    }
    if (estado === "error") {

        color = "red";
    }
    output.innerHTML = `
        <p
            class="mensaje ${estado}"
            style="
                color: ${color};
                font-weight: bold;
                padding: 10px;
            "
        >
            ${mensaje}
        </p>
    `;
}

// MOSTRAR MENÚ

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
    html += `
        <p>
            <strong>
                Total de platos: ${contarPlatos()}
            </strong>
        </p>
    `;
    html += `
        <p>
            ${verificarEstadoGeneral()}
        </p>
    `;
    output.innerHTML = html;
}

// INICIAR EVENTOS

export function iniciarUI() {

    // MOSTRAR MENÚ

    const btnMostrar =
        document.getElementById("btnMostrar");
    if (btnMostrar) {
        btnMostrar.addEventListener(
            "click",
            renderMenu
        );
    }

    // AGREGAR PLATO

    const btnAgregar =
        document.getElementById("btnAgregar");
    if (btnAgregar) {
        btnAgregar.addEventListener(
            "click",
            () => {
                agregarPlato({
                    nombre: "Pollo a la brasa",
                    precio: 20,
                    stock: 4
                });
                renderMenu();
            }
        );
    }

    // BUSCAR

    const btnBuscar =
        document.getElementById("btnBuscar");
    if (btnBuscar) {
        btnBuscar.addEventListener(
            "click",
            () => {
                const nombre =
                    document
                        .getElementById("inputBuscar")
                        .value
                        .trim();
                if (nombre === "") {
                    mostrarMensajes(
                        "Error: debes ingresar el nombre del plato.",
                        "error"
                    );
                    return;
                }
                const plato =
                    buscarPlatoPorNombre(nombre);

                if (!plato) {
                    mostrarMensajes(
                        `Error: el plato "${nombre}" no existe.`,
                        "error"
                    );
                    return;
                }
                mostrarMensajes(
                    `Plato encontrado: ${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}`
                );
            }
        );
    }

    // STOCK BAJO

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

    // RESUMEN

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

    // VENDER - ASÍNCRONO

    const btnVender =
        document.getElementById("btnVender");
    if (btnVender) {
        btnVender.addEventListener(
            "click",
            async () => {

                // OBTENER DATOS

                const nombre =
                    document
                        .getElementById("inputVender")
                        .value
                        .trim();
                const cantidadTexto =
                    document
                        .getElementById("inputCantidad")
                        .value
                        .trim();

                // VALIDAR NOMBRE

                if (nombre === "") {
                    mostrarMensajes(
                        "Error: debes ingresar el nombre del plato.",
                        "error"
                    );
                    return;
                }

                // VALIDAR CANTIDAD VACÍA

                if (cantidadTexto === "") {
                    mostrarMensajes(
                        "Error: debes ingresar una cantidad.",
                        "error"
                    );
                    return;
                }

                // VALIDAR CANTIDAD NUMÉRICA

                if (isNaN(cantidadTexto)) {
                    mostrarMensajes(
                        "Error: la cantidad debe ser numérica. No se permiten letras.",
                        "error"
                    );
                    return;
                }
                const cantidad =
                    Number(cantidadTexto);

                // VALIDAR CANTIDAD POSITIVA

                if (cantidad <= 0) {
                    mostrarMensajes(
                        "Error: la cantidad debe ser mayor que cero.",
                        "error"
                    );
                    return;
                }

                // VALIDAR PLATO

                const plato =
                    buscarPlatoPorNombre(nombre);
                if (!plato) {
                    mostrarMensajes(
                        `Error: el plato "${nombre}" no existe en el menú.`,
                        "error"
                    );
                    return;
                }

                // VALIDAR STOCK

                if (cantidad > plato.stock) {
                    mostrarMensajes(
                        `Error: stock insuficiente. Solo hay ${plato.stock} unidades disponibles.`,
                        "error"
                    );
                    return;
                }

                // PROCESAR VENTA

                try {
                    // 🔵 PROCESANDO
                    mostrarMensajes(
                        "Procesando venta...",
                        "procesando"
                    );

                    // Esperar respuesta
                    const respuesta =
                        await venderPlatoAsync(
                            nombre,
                            cantidad
                        );

                    // 🟢 ÉXITO

                    mostrarMensajes(
                        respuesta,
                        "exito"
                    );

                    // Actualizar menú
                    setTimeout(() => {
                        renderMenu();
                    }, 2000);
                } catch (error) {

                    // 🔴 ERROR
                    mostrarMensajes(
                        "Error: " + error.message,
                        "error"
                    );
                }
            }
        );
    }
}