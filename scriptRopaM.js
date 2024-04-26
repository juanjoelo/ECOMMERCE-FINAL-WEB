//

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
    const tituloRecortado =
      producto.title.length > 20
        ? producto.title.substring(0, 20) + "..."
        : producto.title;
    if (producto.category == "men's clothing") {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("card");

      productoDiv.innerHTML = `
      <img class="card-img-top" src="${producto.image}" alt="${producto.title}">
      <div class="card-body">
        <h6 class="card-title">${tituloRecortado}</h6>
        <p class="card-text">Precio: $${producto.price}</p>
        <button type="button" class="btn btn-warning">Agregar al carrito</button>
      </div>
    `;

      container.appendChild(productoDiv);
    }
  });
}

crearDivProductos();

var listaProductos = [];

// async function respuesta() {
//   var response = await fetch("https://fakestoreapi.com/products");
//   var object = await response.json();
//   listaProductos.push(object);
//   return object;
// }

// //export const
// carrito = [];

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
//     if (producto.category == "men's clothing") {
//       elementoNuevo.innerHTML = `
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
//       contenedor.appendChild(elementoNuevo);
//     }
//   });
// }
// crearElemento();
