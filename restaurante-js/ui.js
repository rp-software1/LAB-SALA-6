// ui.js

import { obtenerMenu } from "./menu.js";
import {
    venderPlato,
    verificarEstadoGeneral,
    filtrarStockBajo
} from "./operaciones.js";

// 1. RENDERIZAR TODO EL MENÚ

export function renderMenu() {

    const contenedor = document.getElementById("menu");

    const menu = obtenerMenu();

    contenedor.innerHTML = "";

    for (const plato of menu) {

        const elemento = document.createElement("p");

        elemento.textContent =
            `${plato.nombre} - S/ ${plato.precio} - Stock: ${plato.stock}`;

        contenedor.appendChild(elemento);
    }
}

// 2. RENDERIZAR UNA LISTA

export function renderLista(lista) {

    const contenedor = document.getElementById("menu");

    contenedor.innerHTML = "";

    for (const plato of lista) {

        const elemento = document.createElement("p");

        elemento.textContent =
            `${plato.nombre} - S/ ${plato.precio} - Stock: ${plato.stock}`;

        contenedor.appendChild(elemento);
    }
}

// 3. MOSTRAR MENSAJES

export function mostrarMensajes(mensaje) {

    const elemento = document.getElementById("mensaje");

    elemento.textContent = mensaje;
}


// 4. CONEXIÓN CON BOTONES

const btnMostrarStockBajo =
    document.getElementById("btnMostrarStockBajo");

btnMostrarStockBajo.addEventListener("click", function () {

    const lista = filtrarStockBajo();

    renderLista(lista);
});


const btnVerEstado =
    document.getElementById("btnVerEstado");

btnVerEstado.addEventListener("click", function () {

    const estado = verificarEstadoGeneral();

    if (estado.agotados > 0) {

        mostrarMensajes("Hay platos agotados.");

    } else if (estado.stockBajo > 0) {

        mostrarMensajes("Hay platos con stock bajo.");

    } else {

        mostrarMensajes("Todo disponible.");
    }
});