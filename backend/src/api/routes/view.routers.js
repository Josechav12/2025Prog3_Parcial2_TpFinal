import { Router } from "express";
const router = Router();
//export { router };

//rutas de las vistas
router.get("/dashboard", (req, res) => {
    res.render("dashboard");
})

router.get("/consultar", (req, res) => {
    res.render("consultar");
})

router.get("/crear", (req, res) => {
    res.render("crear");
})

router.get("/modificar", (req, res) => {
    res.render("modificar");
})

router.get("/eliminar", (req, res) => {
    res.render("eliminar");
})

export default router;