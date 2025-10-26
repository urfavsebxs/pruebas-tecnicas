# PRUEBA TECNICA

## Objetivo

Crear una aplicación web completa que permita a los usuarios gestionar productos, categorías y realizar la carga masiva de usuarios desde un archivo CSV. La aplicación permitirá realizar operaciones CRUD sobre productos y categorías, manejar un carrito de compras, utilizar Redux Toolkit para la gestión del estado y estilizar la interfaz con Tailwind CSS.

## Requerimientos del Proyecto

### Backend (Node.js con TypeScript y SQL Server)
- Configurar un servidor Node.js utilizando Express y TypeScript.
- Conectar el servidor a una base de datos SQL Server.
- Crear una API RESTful que permita:
  - Crear, leer, actualizar y eliminar productos.
  - Crear, leer, actualizar y eliminar categorías.
  - Agregar productos a un carrito.
  - Simular una compra (checkout).
  - Crear usuarios.
  - Subir usuarios de manera masiva desde un archivo CSV.

### Frontend (React.js con TypeScript, Redux Toolkit y Tailwind CSS)
- Crear una interfaz de usuario utilizando React.js y TypeScript.
- Utilizar Redux Toolkit para la gestión del estado global de la aplicación.
- Estilizar la interfaz con Tailwind CSS.
- La interfaz debe permitir:
  - Ver la lista de productos y categorías.
  - Ver los detalles de un producto específico.
  - Crear, actualizar y eliminar productos y categorías.
  - Agregar productos al carrito.
  - Ver el contenido del carrito.
  - Realizar una simulación de compra.
  - Crear usuarios.
  - Subir usuarios desde un archivo CSV.

## Detalles del Proyecto

### Estructura de la Base de Datos (SQL Server)
- Tabla: Products
  - id (INT, Primary Key, Auto Increment)
  - name (NVARCHAR(100))
  - description (NVARCHAR(255))
  - price (DECIMAL(10, 2))
  - category_id (INT, Foreign Key)
  - created_at (DATETIME)
  - updated_at (DATETIME)
- Tabla: Categories
  - id (INT, Primary Key, Auto Increment)
  - name (NVARCHAR(100))
  - created_at (DATETIME)
  - updated_at (DATETIME)
- Tabla: Cart
  - id (INT, Primary Key, Auto Increment)
  - product_id (INT, Foreign Key)
  - quantity (INT)
  - created_at (DATETIME)
- Tabla: Users
  - id (INT, Primary Key, Auto Increment)
  - username (NVARCHAR(100))
  - email (NVARCHAR(100))
  - password (NVARCHAR(255))
  - created_at (DATETIME)
  - updated_at (DATETIME)

### Endpoints de la API
- POST /api/products - Crear un nuevo producto
- GET /api/products - Obtener la lista de productos
- GET /api/products/:id - Obtener los detalles de un producto específico
- PUT /api/products/:id - Actualizar un producto
- DELETE /api/products/:id - Eliminar un producto
- POST /api/categories - Crear una nueva categoría
- GET /api/categories - Obtener la lista de categorías
- GET /api/categories/:id - Obtener los detalles de una categoría específica
- PUT /api/categories/:id - Actualizar una categoría
- DELETE /api/categories/:id - Eliminar una categoría
- POST /api/cart - Agregar un producto al carrito
- GET /api/cart - Obtener el contenido del carrito
- POST /api/cart/checkout - Realizar una simulación de compra
- POST /api/users - Crear un nuevo usuario
- POST /api/users/upload - Subir usuarios de manera masiva desde un archivo CSV

## Requisitos Técnicos
- Utilizar Node.js con Express y TypeScript para el backend.
- Utilizar Sequelize (u otro ORM) para interactuar con SQL Server.
- Utilizar React.js con TypeScript para el frontend.
- Utilizar Redux Toolkit para la gestión del estado global.
- Utilizar Tailwind CSS para el diseño y estilización de la interfaz.
- Utilizar Axios (u otro cliente HTTP) para las llamadas a la API desde el frontend.
- Utilizar multer para la carga de archivos en Node.js.