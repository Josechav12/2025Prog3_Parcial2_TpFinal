import express from "express";
import environments from "./src/api/config/environments.js";

const app = express();
const PORT = environments.port;

import connection from "./src/api/database/db.js"; // Importamos la conexion a la BBDD para poder enviarle sentencias SQL
import cors from "cors";


app.use(cors()); //Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware que transforma el JSON de las peticiones POST a objetos JS

// Traer todos los productos
app.get("/products", async (req, res) => { 

    try {
        const sql = "SELECT * FROM productos";
    
        // Con rows extraemos exclusivamente los datos que solicitamos en la consulta
        const [rows] = await connection.query(sql);

        console.log(rows);
        
        res.status(200).json({
            payload: rows
        });
        
    
    } catch (error) {
        console.error("Error obteniendo productos", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }

});

// Traer un producto por ID
// Get product by id -> Consultar producto por su id
app.get("/products/:id", async (req, res) => {

    try {
        // let id = req.params.id;
        let { id } = req.params; // Aca extraemos el valor "2" de localhost:3000/products/2

        // Gracias al uso de los placeholders -> ? evitamos ataques de inyeccion SQL
        //let sql = `SELECT * FROM productos WHERE productos.id = ${id}`; // Opcion 1. Consulta no segura
        let sql = "SELECT * FROM productos WHERE productos.id = ?"; // Opcion 2, sentencia mas segura

        //let [rows] = await connection.query(sql); // Aca introducimos la consulta 1 no segura
        let [rows] = await connection.query(sql, [id]); // Este id reemplazara el placeholder ?

        console.log(rows);

        res.status(200).json({
            payload: rows,
            message: "Producto encontrado"
        });

        /*
        Los placeholders en SQL son marcadores especiales, como el carácter ? o nombres como :nombre, que se utilizan en consultas SQL 
        para indicar dónde se insertarán los valores reales durante la ejecución de la consulta.
        
        Su uso principal es prevenir inyecciones SQL al separar el código de la consulta del contenido de los datos, 
        ya que los valores se vinculan de forma segura a los placeholders en lugar de ser incrustados directamente en la cadena de consulta.

        // Gracias al destructuring, en rows guardamos y devolvemos especificamente los datos del producto, el resultado especifico de la consulta
        //let [rows, fields] = await connection.query(sql, [id]); // Este id reemplazara el placeholder ?
        //console.log(rows);*/

    } catch(error) {
        console.error(`Error obteniendo productos con id ${id}`, error.message);

        res.status(500).json({
            message: "Error interno al obtener producto con id"
        })
    }


})



    app.post("/products", async (req, res) => {

    try {
        /*  image: "johnnymelavo.com"
            name: "Johnny Melavo"
            price: "12"
            type: "CD"
        */

        // TODO, recordar el middleware express.json()

        // Gracias al destructuring, recogemos estos datos del body
        let { image, name, price, type } = req.body;

        console.log(req.body);

        let sql = `INSERT INTO productos (imagen, nombre, precio, tipo) VALUES (?, ?, ?, ?)`;

        let [rows] = await connection.query(sql, [image, name, price, type]);

        // Codigo de estado 201 -> Created
        res.status(201).json({
            message: "Producto creado con exito"
        });

    } catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        let { id } = req.params;

        // Opcion 1: Borrado normal
        let sql = "DELETE FROM productos WHERE id = ?";

        // Opcion 2: Baja logica
        //let sql = "UPDATE productos set active = 0 WHERE id = ?";

        let [result] = await connection.query(sql, [id]);
        console.log(result);

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });

    } catch(error) {
        console.error("Error al eliminar un producto: ", error);

        res.status(500).json({
            message: `Error al eliminar un producto con id ${id}: `, error,
            error: error.message
        })
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});