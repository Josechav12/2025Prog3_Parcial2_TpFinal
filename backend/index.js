/*
    Importaciones
*/
import express from "express";
const app = express();

import environments from "./src/api/config/environments.js"; // Importamos las variables de entorno para definir el puerto
const PORT = environments.port;

import cors from "cors";

// Importamos los middlewares
import { loggerUrl, saluditos } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js"; // Importamos las rutas desde el archivo de barril


/*
Middlewares
*/
app.use(cors()); //Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware que transforma el JSON de las peticiones POST y PUT a objetos JS
app.use(loggerUrl);

// middleware saluditos, saluda entre la peticion y la respuesta
//app.use(saluditos);

/*
    Rutas crud admin
*/
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Bienvenido a la API de productos"
    });
});


app.use("/api/products", productRoutes); // Usamos las rutas de productos importadas desde el archivo de barril
// app.use("/api/users", rutasUsuarios);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});