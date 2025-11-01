# Pruebas Técnicas – Portafolio de Soluciones Full‑Stack

Repositorio vivo donde documento y versiono mis soluciones a pruebas técnicas. Cada carpeta contiene un proyecto autocontenido con frontend, backend y notas; todo pensado para aprender, practicar y reutilizar.

Autor: Sebastian Parra (urfavsebxs)

---

## 🧭 Contenido

- Visión general
- Estructura del repositorio
- Proyecto destacado: `01-prueba-tecnica`
	- Stack y estado actual
	- Requisitos y configuración rápida
	- Cómo ejecutar (backend y frontend)
	- Endpoints principales (con cURL de ejemplo)
	- Notas y próximos pasos
- Contribución y feedback

---

## 🚀 Visión general

Este repositorio compila ejercicios y pruebas técnicas reales que resuelvo con un enfoque full‑stack moderno. El objetivo es aprender, reforzar buenas prácticas, y dejar guías claras para que cualquier persona pueda levantar y evaluar cada proyecto en minutos.

Tecnologías frecuentes en el repo:

- Frontend: React + TypeScript, Vite, Tailwind CSS
- Estado: Redux Toolkit (en proyectos que lo requieran)
- Backend: Node.js + Express (TypeScript/ESM)
- Base de datos: MySQL (mysql2) u otras según el reto
- Linting/Build: ESLint, TypeScript, Vite

---

## 🗂️ Estructura del repositorio

```
pruebas-tecnicas/
├─ README.md                # Este archivo
├─ package.json
├─ pnpm-lock.yaml
├─ pruebas/
│  └─ 01-prueba-tecnica/    # Proyecto full‑stack (React + Express + MySQL)
│     ├─ backend/
│     │  ├─ server.js
│     │  ├─ api/
│     │  │  ├─ controllers/
│     │  │  │  └─ productController.ts
│     │  │  ├─ routes/
│     │  │  │  ├─ productRoutes.ts
│     │  │  │  ├─ categoryRoutes.ts (WIP)
│     │  │  │  ├─ userRoutes.ts (WIP)
│     │  │  │  └─ cartRoutes.ts (WIP)
│     │  └─ config/
│     │     └─ database.ts   # Conexión MySQL (recomendado mover a .env)
│     ├─ frontend/
│     │  ├─ App.tsx
│     │  └─ styles/
│     ├─ vite.config.ts
│     ├─ tsconfig*.json
│     └─ README.md           # Notas específicas del proyecto
└─ pruebas-live-coding/
```

---

## 🏅 Proyecto destacado: 01‑prueba‑tecnica

Aplicación full‑stack para gestionar productos y categorías, con UI en React y API en Express conectada a MySQL. Incluye CRUD de productos ya funcional; el resto de módulos están en progreso.

### 🧰 Stack

- Frontend: React 19 + TypeScript, Vite 7, Tailwind CSS 4
- Backend: Express 5 (ESM), Node 18+, mysql2 (promises)
- DB: MySQL 8+

### 📌 Estado actual

- Productos: CRUD completo (GET, POST, PUT, DELETE)
- Categorías, Usuarios, Carrito: rutas creadas pero sin implementación (WIP)

---

## ⚙️ Requisitos y configuración

- Node.js 18 o superior
- pnpm (recomendado)
- MySQL 8 en local o en contenedor

Configura la base de datos y variables de entorno:

1) Crea una base de datos (por ejemplo `prueba_fullstack`) y una tabla mínima para productos:

```sql
CREATE DATABASE IF NOT EXISTS prueba_fullstack;
USE prueba_fullstack;

CREATE TABLE IF NOT EXISTS products (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	description VARCHAR(255) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	category_id INT NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

2) Variables de entorno (recomendado): crea un archivo `.env` en `pruebas/01-prueba-tecnica/` con algo como:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=prueba_fullstack
DB_PORT=3306
```

Nota: el archivo actual `backend/config/database.ts` trae credenciales en claro a modo de demo. Para producción, migra esa configuración a variables de entorno y no las subas al repo.

---

## ▶️ Cómo ejecutar

Instala dependencias del proyecto `01-prueba-tecnica` y levanta backend y frontend en dos terminales.

1) Instalar dependencias

```bash
cd pruebas/01-prueba-tecnica
pnpm install
```

2) Backend (API Express en el puerto 3000)

Opción A – Node ESM directo (si tu entorno soporta imports ESM):

```bash
node backend/server.js
```

Opción B – Con un runner TS (recomendado si aparece error por imports `.ts`):

```bash
pnpm dlx tsx backend/server.js
```

3) Frontend (Vite en el puerto 5173)

```bash
pnpm dev
```

Aplicación local:

- API: http://localhost:3000
- Web: http://localhost:5173

---

## 📡 Endpoints principales (productos)

Base URL: `http://localhost:3000/api/products`

- GET `/` – listar productos

```bash
curl -s http://localhost:3000/api/products | jq .
```

- POST `/` – crear producto

```bash
curl -s -X POST http://localhost:3000/api/products \
	-H 'Content-Type: application/json' \
	-d '{
		"name":"Teclado Mecánico",
		"description":"RGB, switches rojos",
		"price": 59.99,
		"category_id": 1
	}' | jq .
```

- PUT `/:id` – actualizar producto

```bash
curl -s -X PUT http://localhost:3000/api/products/1 \
	-H 'Content-Type: application/json' \
	-d '{
		"name":"Teclado 75%",
		"description":"Keycaps PBT",
		"price": 69.99,
		"category_id": 2
	}' | jq .
```

- DELETE `/` – eliminar producto por payload exacto (según implementación actual)

```bash
curl -s -X DELETE http://localhost:3000/api/products \
	-H 'Content-Type: application/json' \
	-d '{
		"name":"Teclado 75%",
		"description":"Keycaps PBT",
		"price": 69.99,
		"category_id": 2
	}' | jq .
```

Notas:

- La ruta DELETE actualmente elimina por coincidencia de todos los campos enviados en el body. Una mejora recomendada es eliminar por `id` (`DELETE /api/products/:id`).
- Las rutas de categorías/usuarios/carrito están creadas pero sin lógica; se implementarán en siguientes iteraciones.

---

## 🧩 Frontend (qué hace hoy)

- Formulario para crear/actualizar/eliminar productos (campos: name, description, price, category_id)
- Lista lateral que consume `GET /api/products` y permite seleccionar un producto para editar
- Estilos base con Tailwind 4

Siguiente mejora: mover la gestión de estado a Redux Toolkit y tipar las llamadas HTTP.

---

## 🗺️ Roadmap y próximos pasos

- [ ] Migrar credenciales a `.env` y usar un pool de conexiones MySQL
- [ ] Completar CRUD de categorías, usuarios y carrito
- [ ] Cambiar `DELETE` de productos a `DELETE /api/products/:id`
- [ ] Añadir validación/DTOs (zod o class‑validator)
- [ ] Manejo de errores centralizado y logs estructurados
- [ ] Tests (unitarios y de integración con Vitest/Supertest)
- [ ] Docker Compose para levantar `api + db + web` en un comando

---

## 🤝 Contribución y feedback

Las PRs y sugerencias son bienvenidas. Si encuentras un bug o tienes una idea, abre un issue con contexto y pasos para replicar. ¡Gracias por revisar este repositorio!

