import connection from "../database/db.js";

const agregarUsuario = (correo, password) => {
    
    let sql = `
                INSERT INTO usuarios (correo, password)
                VALUES (?, ?)
            `;
    return connection.query(sql, [correo, password]);
}

const verificarUsuario = (correo, password) => {
    const sql = `SELECT * FROM usuarios where correo = ? AND password = ?`;
    
    return connection.query(sql, [correo, password]);
}


export default{
    agregarUsuario,
    verificarUsuario
}