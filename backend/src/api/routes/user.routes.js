import {Router} from "express"
import { crearUsuario, userLogin, userLogout } from "../controllers/users.controller.js";
const router = Router();

// Endpoint para crear usuarios
router.post("/", crearUsuario);

// Endpoint para inicio de sesion, recibimos correo y password con una peticion POST
router.post("/login", userLogin);

// Endpoint para cerrar sesion (destruir sesion y redireccionar)
router.post("/logout", userLogout);

export default router;