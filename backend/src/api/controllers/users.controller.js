import userModel from "../models/user.models.js"

export const crearUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body;

        if(!correo || !password ) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos"
            });
        }

        
        let [result] = await userModel.agregarUsuario(correo, password);
        

        res.status(201).json({
            message: "Usuario creado con exito",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno en el servidor",
            error: error
        })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Evitamos consulta innecesaria
        if(!correo || !password) {
            return res.render("/login", {
                error: "Todos los campos son obligatorios!"
            });
        }

        const [rows] = await userModel.verificarUsuario(correo, password);

        // Si no existen usuarios con ese correo o password
        if(rows.length === 0) {
            return res.render("/login", {
                error: "Credenciales incorrectas!"
            });
        }

        console.log(rows);
        const user = rows[0];
        console.table(user);

        // Ahora toca guardar sesion y hacer el redirect
        // Crearmos la sesion del usuario, que es un objeto que guarda su id y su correo
        req.session.user = {
            id: user.id,
            correo: user.correo
        }

        res.redirect("/"); // Redirigimos a la pagina principal

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}

export const userLogout = (req, res) => {

    // Destruimos la sesion que habiamos creado
    req.session.destroy((error) => {
        if(error) {
            console.error("Error al destruir la sesion", error);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            })
        }

        res.redirect("/login"); // Redirigimos a login
    })
}