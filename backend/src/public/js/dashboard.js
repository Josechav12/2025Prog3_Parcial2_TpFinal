
let contenedorProductos = document.getElementById("contenedor-productos");

async function obtenerProductos() {
    try {
        // Hacemos la peticion get a la url de nuestra api rest para obtener los productos
        // Ojo! Para evitar que la politica de seguridad CORS bloquee nuestra peticion fetch a esa url, necesitamos habilitar CORS desde nuestra API Rest
        let respuesta = await fetch("http://localhost:3000/api/products");
        console.log(respuesta);

        let data = await respuesta.json();
        console.log(data);

        if (respuesta.ok) {
            console.log(data.message);

            let productos = data.payload;

            console.table(productos);

            mostrarProductos(productos);

        } else {
            alert("Error obteniendo productos")
        }


    } catch (error) {
        console.error(error);
    }
}

function mostrarProductos(productos) {
    let htmlProductos = "";

    productos.forEach(prod => {
        htmlProductos += `
                    <div class="card-producto">
                        <img src="${prod.imagen}" alt="${prod.nombre}">
                        <h3>${prod.nombre}</h3>
                        <p>Id: ${prod.id}</p>
                        <p>$${prod.precio}</p>
                    </div>
                `;
        contenedorProductos.innerHTML = htmlProductos;
    })
}
function init() {
    obtenerProductos();
}

init();
