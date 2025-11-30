/* archivo de barril para centralizar las rutas
este es el archivo que contiene todas las rutas, las importa con un nombre y las exporta con ese mismo nombre*/

// Importamos las rutas
import productRoutes from "./product.routes.js"; //importamos las rutas de productos que definimos en product.routes.js
import userRoutes from "./user.routes.js"
import viewRoutes from "./view.routers.js";

// Exportamos las rutas
export {
    productRoutes,
    viewRoutes,
    userRoutes
};

