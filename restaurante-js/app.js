// 1) VARIABLES + OBJETOS + ARRAYS
let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Chaufa", precio: 10, stock: 2 },
    { nombre: "Ceviche", precio: 15, stock: 7 }
];

// 2) FUNCIÓN REUTILIZABLE PARA MOSTRAR LISTAS
function renderLista(lista) {
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
        html += `<li class="${clase}">${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }
    return html;
}

// 3) FUNCIÓN PARA MOSTRAR MENÚ
function renderMenu() {
    const output = document.getElementById("output");
    let html = "";
    html += renderLista(menu);
    html += `<p>Total de platos en el menú: ${contarPlatos()}</p>`;
    output.innerHTML = html;
}

// 4) FUNCIÓN AGREGAR PLATOs
function agregarPlatoDemo() {
    const nuevoPlato = {
        nombre: "Arroz tapado",precio: 17,stock: 5
    };
    menu.push(nuevoPlato);
}

// 5) CONTAR PLATOS
function contarPlatos() {
    return menu.length;
}

// 6) BUSCAR PLATO CON FIND
function buscarPlatoPorNombre(nombre) {
    return menu.find(
        plato => plato.nombre.toLowerCase() === nombre.toLowerCase()
    );
}

// 7) OBTENER RESUMEN
function obtenerResumenMenu() {
    let totalStock = 0;
    for (let plato of menu) {
        totalStock += plato.stock;
    }
    return `<h3>Resumen del menú</h3><p>Total de platos: ${menu.length}</p><p>Total de productos en stock: ${totalStock}</p>`;
}
// 8) FUNCIÓN VER STOCK
function verStockBajo() {
    let platos = menu.filter(
        plato => plato.stock
    );

    return renderLista(platos);
}

// 9) EVENTO BOTÓN MOSTRAR
document.getElementById("btnMostrar")
.addEventListener("click", () => {
    renderMenu();
});

// FUNCIÓN VENDER PLATO
function venderPlato(nombre, cantidad) {
    const plato = buscarPlatoPorNombre(nombre);

    // 1. Si el plato no existe
    if (!plato) {
        return "Plato no encontrado.";
    }

    // 2. Si el stock es 0
    if (plato.stock === 0) {
        return "No disponible.";
    }

    // 3. Si no hay stock suficiente
    if (cantidad > plato.stock) {
        return "Stock insuficiente.";
    }

    // 4. Descontar el stock
    plato.stock -= cantidad;

    // 5. Volver a mostrar el menú
    renderMenu();

    return "Venta realizada correctamente.";
}


// 10) EVENTO BOTÓN AGREGAR
document.getElementById("btnAgregar")
.addEventListener("click", () => {
    agregarPlatoDemo();
    renderMenu();
});

// 11) EVENTO BOTÓN BUSCAR
document.getElementById("btnBuscar")
.addEventListener("click", () => {
    const nombre = document.getElementById("inputBuscar").value;
    const plato = buscarPlatoPorNombre(nombre);
    const output = document.getElementById("output");
  if (plato) {
    output.innerHTML =
    `Plato encontrado: ${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}`;
}
    else {
        output.innerHTML = "Plato no encontrado.";
    }
});

// 12) EVENTO BOTÓN RESUMEN
document.getElementById("btnResumen")
.addEventListener("click", () => {
    const output = document.getElementById("output");
    output.innerHTML = obtenerResumenMenu();
});

// 13) EVENTO BOTÓN VER STOCK
document.getElementById("btnStockBajo")
.addEventListener("click", () => {

    const output = document.getElementById("output");

    output.innerHTML = `
    <h3>Stock bajo</h3>
    ${verStockBajo()}
    `;

});
// 14) EVENTO BOTÓN VENDER
document.getElementById("btnVender")
.addEventListener("click", () => {
    const nombre = document.getElementById("inputVender").value;
    const cantidad = Number(document.getElementById("inputCantidad").value);

    const mensaje = venderPlato(nombre, cantidad);

    alert(mensaje);
});