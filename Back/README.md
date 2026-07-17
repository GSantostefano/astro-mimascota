# Mi Mascota — Backend API

API Express + Sequelize adaptada del esqueleto de `poker-vite/Back`, sin dominio de poker. Incluye **usuarios (JWT)** y **avisos de mascotas en BD**.

## Stack

- Express 4
- Sequelize 6 (**MySQL** / SQLite / PostgreSQL)
- Joi + @hapi/boom
- bcryptjs + jsonwebtoken
- helmet, cors, rate-limit

## MySQL + Workbench

1. En MySQL Workbench, ejecutá:

```sql
CREATE DATABASE mimascota
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

2. Editá `Back/.env` con tu usuario/contraseña de MySQL:

```env
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mimascota
DB_USER=root
DB_PASSWORD=tu_password
```

3. Instalá deps, seed y arrancá:

```bash
cd Back
npm install
npm run seed
npm start
```

Las tablas `users` y `pets` se crean solas (`DB_SYNC=1`). Después las ves en Workbench refrescando el schema `mimascota`.

## Arranque rápido

```bash
cd Back
npm install
cp .env.example .env   # si aún no tenés .env
npm run seed
npm start
```

API en `http://localhost:3010`.

### Usuarios de prueba (seed)

| Email | Password | Rol |
|-------|----------|-----|
| `admin@mimascota.test` | `admin123` | admin |
| `demo@mimascota.test` | `demo123` | user |

## Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/health` | no | Healthcheck |
| POST | `/api/users/register` | no | Registro |
| POST | `/api/users/login` | no | Login → `{ token, user }` |
| GET | `/api/users/me` | Bearer | Usuario actual |
| GET | `/api/users` | admin | Listar usuarios |
| GET | `/api/pets` | no | Listar / filtrar avisos |
| GET | `/api/pets/slug/:slug` | no | Ficha por slug |
| GET | `/api/pets/:id` | no | Ficha por id |
| POST | `/api/pets` | opcional | Crear aviso |
| PATCH | `/api/pets/:id` | dueño/admin | Editar |
| DELETE | `/api/pets/:id` | dueño/admin | Borrar |

### Filtros `GET /api/pets`

`status`, `kind`, `city`, `zone`, `size`, `sex`, `q`, `sort` (`date_asc` \| `date_desc`), `userId`.

### Auth

```http
Authorization: Bearer <token>
```

## Variables de entorno

Ver `.env.example`. Lo importante:

- `DB_DIALECT=sqlite` (default) o `postgres`
- `JWT_SECRET`
- `CORS_ORIGINS` (incluye el puerto de Astro, ej. `http://localhost:4321`)

## Estructura

```
Back/
├── index.js
├── scripts/seed-db.js
└── src/
    ├── app.js
    ├── libs/sequelize.js
    ├── db/models/          # User, Pet
    ├── middlewares/        # auth JWT, errors, validator, rate limit
    ├── schemas/            # Joi
    ├── services/
    ├── routes/
    └── utils/
```

Patrón igual que Poker: **router → service → model**.
