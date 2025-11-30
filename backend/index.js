/*====================
    Importaciones
====================*/
import express from "express";
const app = express(); // app es la instancia de la aplicacion express

import environments from "./src/api/config/environments.js"; // Importamos las variables de entorno para definir el puerto
const PORT = environments.port;
const SESSION_KEY = environments.session_key;

import cors from "cors";

import { loggerUrl, saluditos } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes, userRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";

import session from "express-session";


/*====================
    Middlewares
====================*/
app.use(cors()); //Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware que transforma el JSON de las peticiones POST y PUT a objetos JS
app.use(loggerUrl);

// Middleware saluditos, saluda entre la peticion req y la respuesta
// app.use(saluditos);

// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public"))); // Vamos a construir la ruta relativa para servir los archivos de la carpeta /public

/*======================================
    Config Login
========================================
    - HTTP es un protocolo sin estado, lo que significa que cada solicitud del cliente al servidor se trata como una transacción independiente, sin relación con solicitudes anteriores.
    - Esto implica que el servidor no guarda ninguna información sobre conexiones o interacciones previas, y por tanto, al finalizar una transacción, todos los datos se pierden

Sin sesiones no hay forma de saber si el usuario esta logueado, a menos que usemos tokens JWT, cookies firmadas u otro sistema, por eso usamos express-session

1. Instalamos express-session
2. Creamos una clave secreta y la exportamos con environments.js

3. Hacemos la configuracion para el middleware de sesion:*/
app.use(session({
    secret: SESSION_KEY, // Firma las cookies para evitar manipulacion (por eso debe ser aleatoria y secreta)
    resave: false, // Evita guardar la sesion si no hubo cambios
    saveUninitialized: true // No guarda sesiones vacios
}));

// 4. Crear vista login e incorporar el middleware para parsear datos de un <form>

// 5. Habilitar la creacion de usuarios -> Creando un endpoint y una vista

// 6. Ahora vamos a crear el endpoint que va a recibir los datos del <form> de login.ejs


// ========================================


// Middleware para parsear info de un <form>
// Middleware necesario para leer formularios HTML <form method="POST">
app.use(express.urlencoded({
    extended: true
}));


/*=====================
    Configuracion
====================*/
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src/views")); // Indicamos la ruta de las vistas en nuestro proyecto



/*==================
    Rutas
==================*/

// Endpoint que no devuelve ninguna respuesta y queda la llamada colgada y la conexion sin terminar
//app.get("/test", (req, res) => {
//    console.log("Este endpoint no ofrece ninguna respuesta y se queda aca trabado...");
//});

app.use("/api/products", productRoutes);

app.use("/", viewRoutes);

app.use("/api/users", userRoutes)

// TO DO, hacer repaso de login, incorporar bcrypt, impresion de tickets y descarga de excels ventas

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});