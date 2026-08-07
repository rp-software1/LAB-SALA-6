// 1) VARIABLES + OBJETOS + ARRAYS
let menu = [
 { nombre: "Arroz con pollo", precio: 12, stock: 5 },
 { nombre: "Lomo saltado", precio: 18, stock: 3 },
 { nombre: "Sopa", precio: 8, stock: 10 },
 { nombre: "Chaufa", precio: 10, stock: 2 },
 { nombre: "Ceviche", precio: 15, stock: 7 }
];


// 2) FUNCIÓN: renderizar (mostrar) el menú en pantalla
function renderMenu() {
 const output = document.getElementById("output");
 output.innerHTML = ""; // limpiar
 // crear una lista HTML simple
 let html = "<ul>";

 for (let i = 0; i < menu.length; i++) {
   const plato = menu[i];
   html += `<li>${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
 }

 html += `<p>Total de platos en el menú: ${contarPlatos()}</p>`;

    output.innerHTML = html;
}

// 3) FUNCIÓN: agregar un plato demo al menú
function agregarPlatoDemo() {
 const nuevoPlato = { nombre: "Arroz tapado", precio: 17, stock: 5 };
 menu.push(nuevoPlato);
}

// 4) EVENTOS: conectar botones con funciones
document.getElementById("btnMostrar").addEventListener("click", () => {
 renderMenu();
});

document.getElementById("btnAgregar").addEventListener("click", () => {
 agregarPlatoDemo();
 renderMenu();
});

document.getElementById("btnBuscar").addEventListener("click", () => {
 const nombre = document.getElementById("inputBuscar").value;
 const plato = buscarPlatoPorNombre(nombre);
 if (plato) {
   const output = document.getElementById("output");
   output.innerHTML = `<p>Plato encontrado: ${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</p>`;
 } else {
   document.getElementById("output").innerHTML = "<p>Plato no encontrado.</p>";
 }
});



document.getElementById("btnResumen").addEventListener("click", () => {
 const resumen = obtenerResumenMenu();
 const output = document.getElementById("output");
 output.innerHTML = `
   <p>Total de platos en el menú: ${resumen.totalPlatos}</p>
   <p>Total de stock: ${resumen.totalStock}</p>
 `;
});

function contarPlatos() {
    return menu.length;

}

//funcion buscar plato por nombre

function buscarPlatoPorNombre(nombre) {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].nombre === nombre) {
            return menu[i];
        }
    }
    return null;
}
