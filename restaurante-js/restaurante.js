// restaurante.js — versión Bloque A
 
// Plato 1
const nombrePlato = "Lomo saltado";
const precioPlato = 18;
let stockPlato = 5;
 
// Plato 2
const nombrePlato2 = "Arroz con leche";
const precioPlato2 = 8;
let stockPlato2 = 10;
 
// Plato 3
const nombrePlato3 = "Sopa criolla";
const precioPlato3 = 12;
let stockPlato3 = 3;
 
console.log("Plato 1:", nombrePlato, "| Precio:", precioPlato, "| Stock:", stockPlato);
console.log("Plato 2:", nombrePlato2, "| Precio:", precioPlato2, "| Stock:", stockPlato2);
console.log("Plato 3:", nombrePlato3, "| Precio:", precioPlato3, "| Stock:", stockPlato3);

// Bloque B — funciones del plato
 
function describir(nombre, precio) {
  return nombre + " — S/ " + precio;
}
 
function estaDisponible(stock) {
  return stock > 0;
}
 
function vender(stockActual) {
  return stockActual - 1;
}
 
// Usar las funciones con los datos del Plato 1:
const descripcion = describir(nombrePlato, precioPlato);
const disponible = estaDisponible(stockPlato);
const nuevoStock = vender(stockPlato);

// Usar las funciones con los datos del Plato 2:
const descripcion2 = describir(nombrePlato2, precioPlato2);
const disponible2 = estaDisponible(stockPlato2);
const nuevoStock2 = vender(stockPlato2);

// Usar las funciones con los datos del Plato 3:
const descripcion3 = describir(nombrePlato3, precioPlato3);
const disponible3 = estaDisponible(stockPlato3);
const nuevoStock3 = vender(stockPlato3);

console.log(descripcion);        // "Lomo saltado — S/ 18"
console.log(disponible);         // true
console.log(nuevoStock);         // 4

console.log(descripcion2);       // "Arroz con leche — S/ 8"
console.log(disponible2);        // true
console.log(nuevoStock2);        // 9

console.log(descripcion3);       // "Sopa criolla — S/ 12"
console.log(disponible3);        // true
console.log(nuevoStock3);        // 3

// Bloque C — objetos del restaurante
 
const plato1 = { nombre: "Lomo saltado", precio: 18, stock: 5 };
const plato2 = { nombre: "Arroz con leche", precio: 8, stock: 10 };
const plato3 = { nombre: "Sopa criolla", precio: 12, stock: 3 };
 
function describir(nombre, precio) {
  return nombre + " — S/ " + precio;
}
 
function estaDisponible(stockActual) {
  return stockActual > 0;
}
 
function vender(stock) {
  return stock - 1;
}
 
console.log(describir(plato1.nombre, plato1.precio));       // "Lomo saltado — S/ 18"
console.log(estaDisponible(plato1.stock));  // true
 
console.log(vender(plato1.stock));            // 4
