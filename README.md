# Gestor de Opiniones API

API REST para la gestión de usuarios, publicaciones y comentarios.
Permite registro e inicio de sesión, creación de publicaciones y participación mediante comentarios con control de permisos por usuario.

---

## Características

* Registro e inicio de sesión con JWT
* Login mediante **correo o nombre de usuario**
* Edición de perfil (sin eliminación de usuarios)
* CRUD de publicaciones (solo el autor puede editar/eliminar)
* Comentarios en publicaciones
* Edición y eliminación únicamente de comentarios propios
* Middleware de seguridad (`helmet`, `cors`, `rate-limit`)
* Arquitectura modular por dominios
* Base de datos con MongoDB
* Identificadores de usuario usando UUID

---

## Estructura del Proyecto

```
publication-service/
│
├── configs/
│   ├── app.js
│   ├── cors.configuration.js
│   ├── db.js
│   ├── helmet.configuration.js
│   └── rateLimit.configuration.js
│
├── middlewares/
│   ├── validate-JWT.js
│   ├── handle-errors.js
│   └── user-validator.js
│
├── src/
│   ├── users/
│   ├── publications/
│   └── comments/
│
├── .env
├── index.js
└── package.json
```

---

## Tecnologías Utilizadas

* Node.js
* Express.js
* MongoDB + Mongoose
* UUID
* JSON Web Token (JWT)
* PNPM

---

## Instalación

### Clonar repositorio

```
git clone <URL_DEL_REPOSITORIO>
cd publication-service
```

---

### Instalar dependencias

```
pnpm install
```

---

### Configurar variables de entorno

Crear archivo `.env`:

```
PORT=3024

MONGO_URI=mongodb://localhost:27017/gop-db

JWT_SECRET=____________________
JWT_EXPIRES_IN=1h
JWT_ISSUER=OpinionManager
JWT_AUDIENCE=OpinionManager
```

---

### Iniciar MongoDB

Si lo tienes local:

```
mongod
```

Si usas MongoDB Atlas:
Colocar aquí la cadena de conexión:

```
MONGO_URI=mongodb://localhost:27017/gop-db
```

---

### Ejecutar servidor

```
pnpm start
```

Servidor disponible en:

```
http://localhost:3024/gestor-de-opiniones/v1
```

---

## Autenticación

El sistema usa JWT.

Enviar el token en cada request protegida:

```
Authorization: Bearer TOKEN
```

---

## Endpoints Principales

### Usuarios

| Método | Endpoint          | Descripción       |
| ------ | ----------------- | ----------------- |
| POST   | `/users/` 	   	 | Registrar usuario |
| POST   | `/users/login`    | Iniciar sesión    |
| PUT    | `/users/me`  	 | Editar perfil     |

---

### Publicaciones

| Método | Endpoint     | Descripción                 |
| ------ | ------------ | --------------------------- |
| POST   | `/posts/`    | Crear publicación           |
| GET    | `/posts/`    | Listar publicaciones        |
| PUT    | `/posts/:id` | Editar publicación propia   |
| DELETE | `/posts/:id` | Eliminar publicación propia |

---

### Comentarios

| Método | Endpoint                 | Descripción                    |
| ------ | ------------------------ | ------------------------------ |
| GET    | `/comments/post/:postId` | Obtener comentarios de un post |
| POST   | `/comments/post/:postId` | Crear comentario               |
| PUT    | `/comments/:id`          | Editar comentario propio       |
| DELETE | `/comments/:id`          | Eliminar comentario propio     |

---

## Reglas de Negocio

* No se pueden eliminar usuarios.
* Solo el autor puede modificar su contenido.
* No se permite modificar publicaciones/comentarios ajenos.
* Todas las operaciones sensibles requieren JWT.

---

## Health Check

```
GET /gestor-de-opiniones/v1/health
```

Respuesta esperada:

```json
{
  "status": "healthy",
  "service": "Gestor de Opiniones API"
}
```

---

## Posibles Mejoras Futuras

* Encriptación de contraseñas
* Sistema de roles
* Paginación de publicaciones
* Sistema de likes
* Notificaciones
* Tests automatizados

---

## Autor

Nombre: Diego Alejandro Velásquez Cuté 202226
Curso / Institución: Centro Educativo Técnico Kinal
Fecha: 20/02/2026

---