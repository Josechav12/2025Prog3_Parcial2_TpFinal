🛒 Panel de Administración – ElectroComponentes
Descripción

ElectroComponentes es una aplicación web desarrollada con Node.js, Express y MySQL, que implementa un panel de administración para la gestión de productos y usuarios.
El sistema permite crear, consultar, modificar y eliminar productos, además de contar con un sistema de login con sesiones, vistas dinámicas con EJS y conexión a base de datos mediante MySQL.

El proyecto está pensado como un backend + admin panel, dejando el frontend de la tienda como un módulo independiente.

Características Principales ⚙️

CRUD de productos

Crear productos

Consultar productos (lista completa y por ID)

Modificar productos existentes

Eliminar productos por ID

Sistema de autenticación

Login de usuarios

Manejo de sesiones con express-session

Protección de rutas mediante middleware (requireLogin)

Cierre de sesión (logout)

Vistas dinámicas

Uso de EJS como motor de plantillas

Partials reutilizables (head, nav, footer)

Panel admin completamente integrado al backend

Base de datos

Conexión a MySQL mediante mysql2

Persistencia de productos y usuarios

Consultas SQL parametrizadas

Arquitectura ordenada

Separación por capas: rutas, controladores, modelos y middlewares

Uso de variables de entorno con dotenv

Tecnologías Utilizadas 🛠️

Node.js

Express

MySQL

EJS

Express-session

dotenv

cors

Dependencias 📦
Dependencias principales

Estas librerías son necesarias para que la aplicación funcione:

npm install cors dotenv ejs express express-session mysql2

Dependencias de desarrollo

Usadas solo durante el desarrollo:

npm install --save-dev nodemon

Variables de Entorno 🔐

El proyecto utiliza un archivo .env para manejar configuraciones sensibles:

PORT=3000
DB_HOST=localhost
DB_NAME=nombre_base_de_datos
DB_USER=root
DB_PASSWORD=
SESSION_SECRET=clave_secreta_segura


Estas variables permiten:

Configurar el puerto del servidor

Conectarse a la base de datos

Firmar las sesiones de usuario de forma segura

Cómo Funciona el Proyecto 🔍
Inicio del servidor

El servidor Express:

Carga las variables de entorno

Configura middlewares globales (JSON, formularios, sesiones, CORS)

Sirve archivos estáticos (CSS, JS, imágenes)

Configura EJS como motor de vistas

Sistema de Login 🔑

El usuario accede a /login

Envía sus credenciales mediante un formulario HTML

El servidor valida los datos contra la base de datos

Si las credenciales son correctas:

Se crea una sesión (req.session.user)

Se redirige al dashboard

Si son incorrectas:

Se vuelve a mostrar el login con un mensaje de error

Las rutas protegidas utilizan un middleware que verifica si el usuario tiene sesión activa.

Gestión de Productos 📦

Las vistas del admin realizan peticiones fetch a la API REST

La API responde en formato JSON

Los controladores se encargan de la lógica

Los modelos manejan las consultas a la base de datos

Esto permite una separación clara entre:

Vista

Lógica

Datos

Scripts Recomendados ▶️

Para iniciar el proyecto en desarrollo:

npm run dev


O de forma estándar:

npm start

Estado del Proyecto 🚧

CRUD de productos funcionando

Login y sesiones implementadas

Vistas EJS integradas

Modularización aplicada

Pendiente:

Encriptación de contraseñas (bcrypt)

Mejoras visuales

Exportación de datos (tickets / Excel)

Autor 👨‍💻

Proyecto desarrollado por Jose Chavarri
Tecnicatura en Programación – UTN
