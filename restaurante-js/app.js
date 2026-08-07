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
        html += `<li>${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }
    return html;
}

// 3) FUNCIÓN PARA MOSTRAR MENÚ
function renderMenu() {
    const output = document.getElementById("output");
    let html = "";
    html += "<ul>";
    html += renderLista(menu);
    html += "</ul>";
    html += `<p>Total de platos en el menú: ${contarPlatos()}</p>`;
    output.innerHTML = html;
}

// 4) FUNCIÓN AGREGAR PLATO
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

// 8) EVENTO BOTÓN MOSTRAR
document.getElementById("btnMostrar")
.addEventListener("click", () => {
    renderMenu();
});

// 9) EVENTO BOTÓN AGREGAR
document.getElementById("btnAgregar")
.addEventListener("click", () => {
    agregarPlatoDemo();
    renderMenu();
});

// 10) EVENTO BOTÓN BUSCAR
document.getElementById("btnBuscar")
.addEventListener("click", () => {
    const nombre = document.getElementById("inputBuscar").value;
    const plato = buscarPlatoPorNombre(nombre);
    const output = document.getElementById("output");
    if (plato) {
        output.innerHTML = 
        <p>Plato encontrado:${plato.nombre} —S/ ${plato.precio} —Stock: ${plato.stock}</p>;

    } else {
        output.innerHTML = "Plato no encontrado.";
    }
});

// 11) EVENTO BOTÓN RESUMEN

document.getElementById("btnResumen")
.addEventListener("click", () => {
    const output = document.getElementById("output");
    output.innerHTML = obtenerResumenMenu();
});