// importamos el meddleware router de express
import { Router } from "express"; // lo mismo que import express from "express"
const router = Router();// lo mismo que const app = express();



// importamos el middleware de validacion de id
import { validateId } from "../middlewares/middlewares.js";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";

// Traer todos los productos
router.get("/", getAllProducts);

// Traer un producto por su id
router.get("/:id", validateId, getProductById);

// POST -> Crear un nuevo producto
router.post("/", createProduct);

// TO DO, Optimizacion II -> actualizar solo los campos que hayan cambiado
// UPDATE -> Actualizar un producto por su id
router.put("/", updateProduct);

// DELETE -> Eliminar un producto por su id
router.delete("/:id", validateId, deleteProduct);

// exportamos todas las rutas definidas
export default router;