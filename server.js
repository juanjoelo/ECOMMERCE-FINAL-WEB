const PORT = 8080;
const express = require("express");
const cors = require("cors");
const translate = require("node-google-translate-skidz");
const axios = require("axios");
const discounts = require("./ofertas.json");
const app = express();
app.use(cors());
const fs = require("fs");


async function main() {

  // Lee el archivo ofertas.json y parsea su contenido
  //
  let carrito = [];
  let producto = {};

  //Aplicar descuento en producto
  function apply_discount(id) {
    //console.log("testing apply_discount var: ", discounts);
    let product_price = 0;
    let discount_to_apply = 0;

    for (let i = 0; i < discounts.length; i++) {
      if (discounts[i].id== id) {
        discount_to_apply = discounts[i].descuento;
        console.log("el producto tiene descuento: ", discount_to_apply);
      }
      //  else {
      //   return
      // }
    }

    for (let i = 0; i < all_data.length; i++) {
      if (all_data[i].id == id) {
        product_price = all_data[i].price;
      }
    }

    let total_discount = product_price * (discount_to_apply / 100);
    let total_price = product_price - total_discount;

    to_return = [total_price, discount_to_apply]
    //console.log("tesging cos", to_return);
    
    return [total_price.toFixed(2), discount_to_apply];
  }

app.get("/", async (req, res) => {
  try {
    const productos = await fetchProductos();
    const productosTraducidos = await Promise.all(
      productos.map(async (producto) => {
        const tituloTraducido = await traducir(producto.title);
        const descripcionTraducida = await traducir(producto.description);

        producto.descuento = apply_discount(producto.id);

        return {
          ...producto,
          title: tituloTraducido.translation,
          description: descripcionTraducida.translation,
        };
      })
    );
    

    res.json({
      productos: productosTraducidos,
    });
    // let idP = producto.id;
    // let tieneId = descuentos.descuentos.some(
    //   (item) => item.idProducto === idP
    // );

    // if (tieneId) {
    //   for (let i = 0; i < descuentos.descuentos.length; i++) {
    //     if (idP == descuentos.descuentos[i].idProducto) {
    //       producto["descuento"] = descuentos.descuentos[i].descuento;
    //     }
    //   }
    // }
    // return producto;
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

async function fetchProductos() {
  try {
    const respuesta = await fetch("https://fakestoreapi.com/products");
    const objeto = await respuesta.json();
    return objeto;
  } catch (error) {
    console.error("Error al fetchear:", error);
    throw error;
  }
}

async function traducir(texto) {
  return new Promise((resolve, reject) => {
    translate(
      {
        text: texto,
        source: "en",
        target: "es",
      },
      function (result) {
        if (result && result.translation) {
          resolve({ translation: result.translation });
        } else {
          reject("Error en la traducción");
        }
      }
    );
  });
}

// app.listen(PORT, () => {
//   console.log(`Server ejecutando en el puerto ${PORT}`);
// });

//-----> translation

//-----> Carrito

app.listen(PORT, () => {
  console.log(`Server ejecutando en el puerto ${PORT}`);
});


  //Obtener todos los productos
  async function get_api_data() {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }

  let all_data = await get_api_data();
  //Checkear si el producto tiene descuento

  let discounts_id = discounts.map(function (product) {
    return product.id_producto;
  });

  //console.log(discounts_id.includes(24));
  //console.log(discounts_id);

  

  function createItem(id) {
    new_item = {};
    //console.log(all_data[id-1]);
    //console.log(all_data.length);
    for (let i = 0; i < all_data.length; i++) {
      //console.log(all_data[i].id + " = " + id);
      if (all_data[i].id == id) {
        //console.log("true");
        new_item = all_data[i];
        return new_item;
      }
    }
  }

  function removeFromCart(id) {
    //todo
  }

  function getCart() {
    return carrito;
  }
  //let product_discount = apply_discount(12);
  //console.log(`test:  ${product_discount}`);

  app.get("/product_discount/:id", function (req, res) {
    const id = req.params.id;
    const response = apply_discount(id);
    console.log(response);
    res.send(JSON.stringify(response));
    //result = await check_for_discount(7);
    //res.send(has_id);
  });

  app.get("/show_all_data", function (req, res) {
    res.send(all_data);
  });

  app.get("/show_discount_products", function (req, res) {
    res.send(discounts);
  });

  app.get("/get_cart", function (req, res) {
    res.send(carrito);
  });

  app.post("/carrito", (req, res) => {
    try {
      const articulo = req.body.articulo;
      const cantidad = req.body.cantidad;
      const precio = req.body.precio;
      const carrito = req.body.carrito;

      fs.readFile("carrito.json", (error, data) => {
        if (error) {
          console.error("Error al leer el archivo:", error);
          return res.status(500).json({ error: "Error al leer el archivo" });
        }

        const compras = JSON.parse(data);
        const nuevaCompra = { articulo, cantidad, precio };
        carrito.push(nuevaCompra);

        fs.writeFile("carrito.json", JSON.stringify(compras), (err) => {
          if (err) {
            console.error("Error al escribir en el archivo:", err);
            return res
              .status(500)
              .json({ error: "Error al escribir en el archivo" });
          }
          res.json({ message: "Compra agregada al carrito" });
        });
      });
    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  });
}

main();

// Rutas para obtener productos y agregar al carrito
app.get("/show_all_data", async (req, res) => {
  try {
    const productos = await fetchProductos();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

app.post("/agregar-al-carrito/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productos = await fetchProductos();
    const product = productos.find(
      (producto) => producto.id === parseInt(productId)
    );
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    carrito.push(product);
    res.json({ message: "Producto agregado al carrito", product });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});



module.exports = discounts;
module.exports = PORT;
//-----> Carrito
