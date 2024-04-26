import { agregarAlCarrito } from "./carrito.js";
//import { PORT } from "./server";

console.log("HOLAS");

async function fetchData() {
  try {
    const response = await fetch(`http://localhost:8080/`);
    //const response = await fetch(`http://localhost:${PORT}/`);
    const data = await response.json();
    return data.productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

async function crearDivProductos() {
  const productos = await fetchData();
  const container = document.getElementById("muestra");

  productos.forEach((producto) => {
      console.log(producto);
      //if (producto.hasOwnProperty('descuento')) {
      if (producto.descuento[1] > 0 ){
        console.log("testing descuento", producto.descuento);

        const tituloRecortado =
          producto.title.length > 20
            ? producto.title.substring(0, 20) + "..."
            : producto.title;

        const productoDiv = document.createElement("div");
        productoDiv.classList.add("card");

        productoDiv.innerHTML = `
          <img class="card-img-top" src="${producto.image}" alt="${producto.title}">
          <div class="card-body">
            <h6 class="card-title">${tituloRecortado}</h6>
            <p class="card-text">Precio: $${producto.price}</p>
            <p class="card-text">Precio con descuento: $${producto.descuento[0]}</p>
            <p class="card-text">Descuento: %${producto.descuento[1]}</p>
            <button type="button" class="btn btn-warning add-to-cart-btn">Agregar al carrito</button>
          </div>
        `;
        // Encuentra el botón dentro del div del producto
        const botonAgregar = productoDiv.querySelector(".add-to-cart-btn");
        botonAgregar.addEventListener("click", () => {
          // Llama a la función agregarAlCarrito con el producto y la cantidad
          agregarAlCarrito(producto, 1);
        });

        container.appendChild(productoDiv);
      } else {
        console.log("testing descuento", producto.descuento);

        const tituloRecortado =
          producto.title.length > 20
            ? producto.title.substring(0, 20) + "..."
            : producto.title;

        const productoDiv = document.createElement("div");
        productoDiv.classList.add("card");

        productoDiv.innerHTML = `
          <img class="card-img-top" src="${producto.image}" alt="${producto.title}">
          <div class="card-body">
            <h6 class="card-title">${tituloRecortado}</h6>
            <p class="card-text">Precio: $${producto.price}</p>
            <button type="button" class="btn btn-warning add-to-cart-btn">Agregar al carrito</button>
          </div>
        `;
        // Encuentra el botón dentro del div del producto
        const botonAgregar = productoDiv.querySelector(".add-to-cart-btn");
        botonAgregar.addEventListener("click", () => {
          // Llama a la función agregarAlCarrito con el producto y la cantidad
          agregarAlCarrito(producto, 1);
        });

        container.appendChild(productoDiv);

      }
    });
  }

// Llama a la función crearDivProductos para mostrar los productos en la página
crearDivProductos();

crearDivProductos();

//---> agregar productos
function addToCart(new_item) {
  const existingProductIndex = carrito.findIndex(
    (item) => item.id === new_item.id
  );
  if (existingProductIndex !== -1) {
    // Si el producto ya está en el carrito, aumentamos su cantidad en lugar de agregar un nuevo elemento
    carrito[existingProductIndex].cantidad++;
  } else {
    // Si el producto no está en el carrito, lo agregamos con una cantidad de 1
    new_item.cantidad = 1; // Añadimos un campo "cantidad" al objeto del producto
    carrito.push(new_item);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll("#add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      alert("Estoy andando");
      const productId = button.dataset.Id; // Obtener el ID del producto del atributo de datos
      try {
        // Llamar a la función addToCart con el ID del producto
        addToCart({ id: productId }); // Aquí puedes pasar más detalles del producto si los necesitas
        alert("Producto agregado al carrito");
      } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        alert("Error al agregar el producto al carrito");
      }
    });
  });
});
//var listaProductos = [];

// var imagenes = [
//   "Elementos/carrusel_1",
//   "Elementos/carrusel_2",
//   "Elementos/carrusel_3",
//   "Elementos/carrusel_4",
//   "Elementos/carrusel_5",
//   "Elementos/carrusel_6",
// ];
// document.getElementById("Imagen").src = imagenes[0];
// const contenedor = document.querySelector(".contenedor-slider");
// const botonesIzquierda = document.querySelector(".slider-izquierdo");
// const botonesDerecha = document.querySelector(".slider-derecho");

// let siliderDerecha = document.querySelector(".der");
// let sliderIzquierda = document.querySelector(".izq");
// let contador = 0;

// function moverDerecha() {
//   contador++;
//   if (contador > imagenes.length - 1) {
//     contador = 0;
//   }
//   document.getElementById("Imagen").src = imagenes[contador];
// }

// function moverIzquierda() {
//   contador--;
//   if (contador < 0) {
//     contador = imagenes.length - 1;
//   }
//   document.getElementById("Imagen").src = imagenes[contador];
// }
// botonesIzquierda.addEventListener("click", moverIzquierda);
// botonesDerecha.addEventListener("click", moverDerecha);

// async function respuesta() {
//   var response = await fetch("https://fakestoreapi.com/products");
//   var object = await response.json();
//   listaProductos.push(object);
//   return object;
// }

// //export const
// var carrito = [];

// function agregarAlCarrito(producto) {
//   carrito.push(producto);
// }

// async function crearElemento() {
//   const productos = await respuesta();
//   var contenedor = document.getElementById("muestra");

//   productos.forEach((producto) => {
//     var elementoNuevo = document.createElement("div");
//     elementoNuevo.classList.add("col-md-3"); // 'col-md-3' es bootstrap dividiendo en 4 col
//     var tituloRecortado =
//       producto.title.length > 20
//         ? producto.title.substring(0, 20) + "..."
//         : producto.title;

//     elementoNuevo.innerHTML = `
//                 <div class="card">
//                     <img class="card-img-top" src="${producto.image}" alt="${producto.title}">
//                     <div class="card-body">
//                     <h6 class="card-title">${tituloRecortado}</h6>
//                         <p class="card-text">Precio: $${producto.price}</p>
//                         <p class="card-text">Categoría: ${producto.category}</p>

//                         <button id="boton" type="button" onClick="agregarAlCarrito(${producto})" class="btn btn-warning">Agregar al carrito</button>
//                     </div>
//                 </div>
//             `;
//     contenedor.appendChild(elementoNuevo);
//   });
// }
//crearElemento();

//export { carrito };
