console.log("Prueba :P ");

var carrito = [];
import { discounts } from "./ofertas.js";

const contadorCarrito = document.getElementById("cantidad_productosCarrito");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

function agregarAlCarrito(producto, cant, id) {
  console.log("Prueba 3");
  let product_del_carrito = {
    id: id,
    producto: producto,
    cantidad: cant,
    precioFinal: precio_Final(producto) * cant,
  };

  const existe = carrito.some(
    (elemento) => elemento.producto && elemento.producto.id === producto.id
  );
  let cantidad = parseInt(cant);

  if (existe) {
    carrito.forEach((item) => {
      if (item.producto.id === producto.id) {
        item.cantidad += product_del_carrito.cantidad;
        +cantidad;
        item.precioFinal = precio_Final(item.producto) * item.cantidad;
      }
    });
  } else {
    carrito.push(product_del_carrito);
    console.log("testing push al carrito", product_del_carrito);
    console.log(carrito);
  }

  actualizarCarrito();
  //botonVaciar();
}

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);

  carrito.splice(indice, 1);
  actualizarCarrito();
};

//const vaciarCarritoBtn = document.getElementById("vaciar-carrito-btn");

//container.innerHTML = "";

function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  if (contadorCarrito) {
    contadorCarrito.innerText = carrito.length;
  }
}

const cambiarCantidadProducto = (cant, prodId) => {
  const item = carrito.find((elemento) => elemento.id === prodId);

  if (item) {
    const indice = carrito.indexOf(item);
    carrito[indice].cantidad = cant;
    carrito[indice].precioFinal =
      precio_Final(carrito[indice].producto.price) * cant;

    actualizarCarrito();
  } else {
    console.error(
      "El objeto 'item' es undefined o no contiene la propiedad 'producto.id'."
    );
  }
};

function precio_Final(producto) {
  console.log(producto);

  if (producto.descuento[1] < 0) {
    let auxPrecio = producto.price;
    const descuento = discounts.find(
      (oferta) => oferta.id.producto === producto.id
    );
    if (descuento) {
      console.log("TEST");
      const precioConDescuento =
        producto.price * (1 - descuento.descuento / 100);
      auxPrecio = precioConDescuento;
    }
    console.log(auxPrecio);
    return auxPrecio;
  } else {
    let auxPrecio = producto.descuento[0];
    const descuento = discounts.find(
      (oferta) => oferta.id.producto === producto.id
    );
    if (descuento) {
      console.log("TEST");
      const precioConDescuento =
        producto.price * (1 - descuento.descuento / 100);
      auxPrecio = precioConDescuento;
    }
    console.log(auxPrecio);
    return auxPrecio;
  }
}

export {
  agregarAlCarrito,
  precio_Final,
  cambiarCantidadProducto,
  actualizarCarrito,
  eliminarDelCarrito,
  contadorCarrito,
  carrito,
};

// Función para aplicar descuentos a los productos en el carrito

/*function aplicarDescuentosAlCarrito(carrito) {
  // Lee el archivo ofertas.json y parsea su contenido
  // const fs = require("fs");
  // const discounts = JSON.parse(fs.readFileSync("./ofertas.json", "utf-8"));
let precioFinal=0;

  carrito.forEach((producto) => {
    // Busca si hay un descuento para el producto actual en el archivo ofertas.json
    const descuento = discounts.find((oferta) => oferta.id_producto === producto.id);
    if (descuento) {
      // Si se encuentra un descuento, aplica el descuento al precio del producto
      const precioConDescuento =
        producto.price * (1 - descuento.descuento / 100);
      producto.precio_final = precioConDescuento.toFixed(2); // Redondea el precio final a dos decimales
    } else {
      // Si no hay descuento, el precio final es igual al precio original
      producto.precio_final = producto.price;
    }
  });
}*/

// Llama a la función para aplicar descuentos a los productos en el carrito
//aplicarDescuentosAlCarrito(carrito);

// Llama a la función para mostrar los productos del carrito cuando la página se carga completamente
// document.addEventListener("DOMContentLoaded", () => {
//   mostrarProductosEnCarrito();
// });
// aplicarDescuentosAlCarrito(carrito);

// Muestra el carrito con los precios finales
//console.log(carrito);

// document.addEventListener("DOMContentLoaded", async function () {
//   try {
//     const response = await fetch("/get_cart"); // Endpoint para obtener el contenido del carrito
//     if (response.ok) {
//       const carrito = await response.json(); // Convertir la respuesta a JSON
//       const carritoContainer = document.getElementById("carrito-container");

//       // Limpiar el contenedor del carrito antes de agregar los nuevos productos
//       carritoContainer.innerHTML = "";

//       // Iterar sobre cada producto en el carrito y agregarlo al contenedor
//       carrito.forEach((producto) => {
//         const productoDiv = document.createElement("div");
//         productoDiv.textContent = `${producto.title} - Precio: $${producto.price}`;
//         carritoContainer.appendChild(productoDiv);
//       });
//     } else {
//       console.error("Error al obtener el carrito:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error al obtener el carrito:", error);
//   }
// });

// Función para mostrar el contenido del carrito en la página

// function mostrarContenidoDelCarrito() {
//   // Obtener el contenedor donde se mostrará el contenido del carrito
//   const carritoContainer = document.getElementById("carrito-container");
//   let carrito = [];

//   // Limpiar el contenido anterior del contenedor
//   carritoContainer.innerHTML = "";

//   // Verificar si el carrito está vacío
//   if (carrito.length === 0) {
//     const divEmpieza = document.createElement("div");
//     divEmpieza.classList.add("empieza-tu-carrito");
//     const divBox = document.createElement("div"); // Corrección: Cambiar "box" a "div"
//     divBox.classList.add("box");
//     const divBolsas = document.createElement("div");
//     divBolsas.classList.add("bolsas");

//     // Agregar elementos al carritoContainer
//     carritoContainer.appendChild(divEmpieza);
//     carritoContainer.appendChild(divBox);
//     carritoContainer.appendChild(divBolsas);

//     // Crear y agregar una imagen
//     const imagen = document.createElement("img");
//     imagen.src = "Elementos/bags.png"; // Reemplaza "ruta_de_la_imagen" con la URL de la imagen que deseas agregar
//     carritoContainer.appendChild(imagen);

//     return; // Salir de la función si el carrito está vacío
//   }

//   // Iterar sobre cada producto en el carrito
//   carrito.forEach((producto) => {
//     // Crear un elemento para mostrar el producto en el carrito
//     const productoDiv = document.createElement("div");
//     productoDiv.classList.add("producto-en-carrito");

//     // Construir el contenido del elemento del producto
//     const nombreProducto = document.createElement("h4");
//     nombreProducto.textContent = producto.title;

//     const precioProducto = document.createElement("p");
//     precioProducto.textContent = `Precio: $${producto.price}`;

//     // Agregar elementos al contenedor del producto
//     productoDiv.appendChild(nombreProducto);
//     productoDiv.appendChild(precioProducto);

//     // Agregar el contenedor del producto al contenedor del carrito
//     carritoContainer.appendChild(productoDiv);
//   });
// }
//mostrarContenidoDelCarrito();

// Ejemplo de uso:
// Suponiendo que 'carrito' es un array de objetos que contiene los productos en el carrito
// Llamar a la función para mostrar el contenido del carrito
// mostrarContenidoDelCarrito(carrito);

// boton.addEventListener('click', function() {
// async function mostrarCarrito() {
//   const carritoHTML = carrito
//     .map(
//       (producto) => `
//       <div class="producto">
//           <h6>${producto.title}</h6>
//           <p>Precio: $${producto.price}</p>
//           <p>Categoría: ${producto.category}</p>
//       </div>
//     `
//     )
//     .join("");

//   // Agrega el contenido al elemento con id "render"
//   const contenedor = document.getElementById("render");
//   contenedor.innerHTML = carritoHTML;
// }
// });

// function ocultarCartel(){

//}

//var listaProductos = [];
//import { carrito } from "./scrypt.js";
//si el carrito tiene más de 0 elementos:
//no mostrar el cartel

// Llama a la función para mostrar los productos en el carrito
//mostrarCarrito();
