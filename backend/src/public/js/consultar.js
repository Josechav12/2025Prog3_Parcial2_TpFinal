// Seleccionamos los elementos del DOM que vamos a utilizar
let getProduct_form = document.getElementById("getProduct-form");
let listaProductos = document.getElementById("lista-productos");

// Definimos la URL base de la API REST
let url = "http://localhost:3000/api/products";

/* Agregamos el event listener al formulario para capturar el evento submit
Cuando el usuario envie el formulario, se ejecutara esta funcion asincronica*/
getProduct_form.addEventListener("submit", async (event) => {

    event.preventDefault(); // Evitamos el envio por defecto del formulario

    console.log("Formulario no enviado");
    console.log(event.target); // Con event target accedemos al evento que disparo el addEventListener
    // Vamos a guardar como objetos los valores del formulario HTML
    let formData = new FormData(event.target);
    console.log(formData); // FormData { idProd → "2" }

    // Vamos a transformar este objeto FormData en un objeto normal JavaScript
    let data = Object.fromEntries(formData.entries());
    console.log(data); // Object { idProd: "3" }

    let idProd = data.idProd;
    console.log(idProd); // 3

    console.log(`Extraido valor numerico del formulario en la variable idProd, que vale ${idProd}`)

    // try catch para manejar errores en la peticion fetch
    try {
        console.log(`Haciendo peticion GET a la url: ${url}/${idProd}`)
        //let respuesta = await fetch(`${url}/${idProd}`);
        let respuesta = await fetch(`http://localhost:3000/api/products/${idProd}`);

        let datos = await respuesta.json();


        if (respuesta.ok) {
            console.log(datos.payload); // [{…}]
            console.log(datos.payload[0]); // {id: 1, nombre: 'La maquina de hacer pajaros - Peliculas', tipo: 'LP', precio: 10000, imagen: 'https://i.discogs.com/rKa1bYXYX2w5nIGDULFozlTjVbmM…y9SLTM1MDY2/NjctMTUwOTczNTA0/Ni01NzM4LmpwZWc.jpeg', …}

            let producto = datos.payload[0];
            mostrarProducto(producto);
        } else {
            console.error(datos.message);
            mostrarError(datos.message);
        }


    } catch (error) {
        console.log(error);
    }
});

// Funcion para mostrar un producto en el HTML
function mostrarProducto(producto) {
    console.table(producto);
    let htmlProducto = `
                <img id="prod-img" src="${producto.imagen}" alt="${producto.nombre}">

                <div id="prod-info">
                    <p><strong>ID:</strong> ${producto.id}</p>
                    <p><strong>Nombre:</strong> ${producto.nombre}</p>
                    <p><strong>Precio:</strong> $${producto.precio}</p>
                </div>
            `;

    listaProductos.innerHTML = htmlProducto;
}

// Imprimimos un mensaje visual de error en el HTML
function mostarError(mensaje) {
    let htmlError = `
                <li class="mesaje-error">
                    <p>
                        strong>Error:</strong>
                        span>${error}</span>
                    </p>
                </li>
            `;
    listaProductos.innerHTML = htmlError;
}
/*==========================
        Que es FormData?
============================
A diferencia de un objeto JavaScript común, FormData está diseñado específicamente para manejar datos de formularios, incluyendo archivos,
y puede ser creado desde un formulario HTML al pasar el elemento form al constructor new FormData(form)

FormData es una interfaz nativa de JavaScript que permite crear un conjunto de pares clave-valor
que representan los campos de un formulario HTML y sus respectivos valores.

Esta clase se utiliza principalmente para capturar y enviar datos de formularios,
ya sea mediante métodos como fetch o XMLHttpRequest,
y se encarga de formatear los datos correctamente como multipart/form-data,
estableciendo automáticamente los encabezados necesarios para el envío
*/
// let respuesta = await fetch("http://localhost:3000/products/${idProducto}");
