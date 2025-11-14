import connection from "../database/db.js"; // Importamos la conexion a la BBDD

// Obtener todos los productos
const selectAllProducts = async (req, res) => {
    // Optimizacion 1: Seleccionar solamente los campos necesarios, evitar SELECT *        
    // La idea es devolver solo las columnas que necesita el front: - datos transferidos, - carga de red, + seguridad
    const sql = "SELECT * FROM productos";

    return await connection.query(sql);
}

// Obtener un producto por su ID
const selectProductWhereId = (id) => {
        //gracias a los placeholders evitamos inyecciones SQL
        let sql = "SELECT * FROM productos WHERE productos.id = ?";

        // Ejecutamos la consulta con el id proporcionado
        return connection.query(sql, [id]);// Este id reemplazara el placeholder? respuesta: si porque lo pasamos como parametro en el array
}

// Insertar un nuevo producto
const insertProduct = (image,name,price,type) => {
    let sql = `INSERT INTO productos (imagen, nombre, precio, tipo) VALUES (?, ?, ?, ?)`;
    return connection.query(sql, [image, name, price, type]);
}

// Actualizar un producto existente
const updateProduct = (name, image, type, price, active, id) => {
    let sql =
        `UPDATE productos
        SET nombre = ?, imagen = ?, tipo = ?, precio = ?, activo = ? 
        WHERE id = ?`;

    // Utilizamos placeholders para evitar inyecciones SQL
    return connection.query(sql, [name, image, type, price, active, id]);
}

// Eliminar un producto
const deleteProduct = (id) => {
    // borrar un producto por su ID
    let sql = `DELETE FROM productos WHERE id = ?`;
    
    return connection.query(sql, [id]);
}

export default{
    selectAllProducts,
    selectProductWhereId,
    insertProduct,
    updateProduct,
    deleteProduct
};
