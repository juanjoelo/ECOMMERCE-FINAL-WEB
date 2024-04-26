import { discounts } from "./ofertas.js";
import {
  agregarAlCarrito,
  precio_Final,
  cambiarCantidadProducto,
  actualizarCarrito,
  eliminarDelCarrito,
  carrito,
  contadorCarrito,
} from "./carrito.js";

// document.addEventListener("DOMContentLoaded", () => {
//   if (localStorage.getItem("carrito")) {
//     carrito = JSON.parse(localStorage.getItem("carrito"));
//     actualizarCarrito();
//     console.log("Prueba 2");
//   }
//});

async function mostrarProductosEnCarrito() {
  console.log("testing mostrarProductosCarrito", carrito);

  let precioFinalCompra = 0;

  const container = document.getElementById("carrito-container");
  container.innerHTML = "";

  carrito.forEach((elemento) => {
    var precio = 0;

    if (elemento.producto.descuento[1] > 0) {
      precio = elemento.producto.descuento[0];
    } else {
      precio = elemento.producto.price;
    }

    precioFinalCompra += elemento.precioFinal;

    // Verificar si el elemento y su propiedad producto están definidos
    if (elemento && elemento.producto) {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("producto-carrito");

      productoDiv.innerHTML = `
          <img class="card-img-top" src="${elemento.producto.image}" alt="${
        elemento.producto.title
      }">
          <div class="card-body">
            <h6 class="card-title">${elemento.producto.title}</h6>
            <p class="card-text">Precio: $${precio}</p>
            <button class="boton-cantidad boton-mas">+</button>
            <button class="boton-cantidad boton-menos">-</button>
            <p class="producto-cantidad">${elemento.cantidad}</p>
            
            <p class="precio-final">Precio final: $${elemento.precioFinal.toFixed(
              2
            )}</p>
            <button class="boton-eliminar">Eliminar del carrito</button>
          </div>
        `;
      const botonEliminar = productoDiv.querySelector(".boton-eliminar");
      const botonMas = productoDiv.querySelector(".boton-mas");
      const botonMenos = productoDiv.querySelector(".boton-menos");

      botonMas.addEventListener("click", () => {
        agregarCantidadAlCarrito(elemento.producto, 1); //product_del_carrito.producto.
      });

      botonMenos.addEventListener("click", () => {
        agregarCantidadAlCarrito(elemento.producto, -1);
      });
      botonEliminar.addEventListener("click", () => {
        eliminarDelCarrito(elemento.id);
        actualizarCarrito();
        window.location.reload();
      });

      container.appendChild(productoDiv);
    }
    // Agregar el precio total al final del carrito
  });
  const precioTotalDiv = document.createElement("div");
  precioTotalDiv.classList.add("precio-total");
  precioTotalDiv.innerHTML = `
        <p>Precio total: $${precioFinalCompra.toFixed(2)}</p>
      `;
  container.appendChild(precioTotalDiv);

  // actualizarCarrito();  Actualizar el contador de productos en el carrito
}
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductosEnCarrito();
});

function calcularPrecioTotal() {
  let precioTotal = 0;
  carrito.forEach((elemento) => {
    precioTotal += elemento.precioFinal;
  });
  return precioTotal.toFixed(2); // Redondear el precio total a 2 decimales
}

function botonVaciar() {
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito-btn");
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

function agregarCantidadAlCarrito(prod, cantidad) {
  // Encuentra el producto en el carrito
  const productoEnCarrito = carrito.find(
    (elemento) => elemento.producto.id === prod.id
    // (elemento) => elemento.id === productoId
  );

  if (productoEnCarrito) {
    const indice = carrito.indexOf(productoEnCarrito);
    // Incrementa o decrementa la cantidad del producto en el carrito
    carrito[indice].cantidad += cantidad;
    if (carrito[indice].cantidad < 0) {
      carrito[indice].cantidad = 0; // No permitir cantidades negativas
    }
    carrito[indice].precioFinal =
      precio_Final(carrito[indice].producto) * carrito[indice].cantidad;
  }

  //Actualiza la vista del carrito
  actualizarCarrito();
  mostrarProductosEnCarrito();
}

function guardarCarritoEnJSON() {
  const mensaje = "¡Gracias por tu compra!\n\nDetalle de la compra:\n\n";

  // Convertir el carrito a JSON con formato legible
  const carritoJSON = JSON.stringify(carrito, null, 2);

  // Concatenar el mensaje y el detalle del carrito
  const ticket = mensaje + carritoJSON;

  // Crear un objeto Blob para representar el archivo JSON
  const blob = new Blob([ticket], { type: "text/plain" });

  // Crear un enlace para descargar el archivo JSON
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ticket_de_compra.txt";

  // Simular el clic en el enlace para iniciar la descarga
  link.click();
  vaciarCarrito();
  actualizarCarrito();
  mostrarProductosEnCarrito();
  // Ocultar el botón de comprar si el carrito está vacío
  const botonComprar = document.querySelector(".comprar");
  if (carrito.length === 0) {
    botonComprar.style.display = "none";
    precioTotal.style.display = "none";
  }
  // Aquí lo mostramos en la consola (puedes hacer más con el JSON, como enviarlo a un servidor, etc.)
}

document.addEventListener("DOMContentLoaded", () => {
  const botonComprar = document.querySelector(".comprar");

  // Verificar si el carrito tiene elementos al cargar la página
  if (carrito.length > 0) {
    botonComprar.style.display = "block"; // Mostrar el botón si el carrito tiene elementos
  } else {
    botonComprar.style.display = "none"; // Ocultar el botón si el carrito está vacío
  }

  // Agregar el evento click al botón comprar
  botonComprar.addEventListener("click", guardarCarritoEnJSON);
});

function vaciarCarrito() {
  carrito.splice(0, carrito.length); // Asignar un nuevo array vacío al carrito

  console.log("testing vaciarCarrito", carrito, carrito.length);
  actualizarCarrito(); // Actualizar la visualización del carrito
}

// const cambiarCantidadProducto = (cant, prodId) => {
//   const item = carrito.find(
//     (elemento) => elemento.producto.id === prodId
//   );
//   const indice = carrito.indexOf(item);

//   carrito[indice].cantidad = cant;
//   carrito[indice].precioFinal =
//     precio_Final(carrito[indice].producto.precio) * cant;

//   actualizarCarrito();
// };
