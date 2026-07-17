# Cloudflare Setup — Mi Mascota

Guía para desplegar el **front Astro** en Cloudflare Pages (mismo enfoque que `astro-royalsaints`).

## Importante: front vs back

| Pieza | Dónde vive |
|-------|------------|
| Front Astro (`/`, `/mascotas`, `/publicar`…) | **Cloudflare Pages** |
| API Express + MySQL (`Back/`) | **Otro host** (VPS, Railway, Render, etc.) — no corre en Pages tal cual |

En Cloudflare tenés que setear `PUBLIC_API_URL` apuntando a la URL pública de tu API.

---

## 1) Prerrequisitos

- Cuenta Cloudflare
- Repo en GitHub (recomendado)
- Node `>= 22.12.0`
- API accesible por HTTPS en producción

## 2) Config ya aplicada en este repo

- Adapter: `@astrojs/cloudflare`
- `astro.config.mjs`: `output: "server"` + `adapter: cloudflare()`
- `wrangler.toml` + `nodejs_compat`
- Scripts: `npm run cf:dev` · `npm run cf:deploy`

## 3) Build local y deploy CLI

```bash
npm install
npm run build
npm run cf:deploy
```

Preview local del build:

```bash
npm run build
npm run cf:dev
```

## 4) Crear proyecto en Cloudflare Pages (GitHub)

1. Cloudflare Dashboard → Workers & Pages → Create → Pages
2. Connect to Git → repo `astro-mimascota`
3. Build settings:
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `22`
4. Environment variables (Production + Preview):
   - `PUBLIC_API_URL` = URL de tu API (ej. `https://api.tudominio.com`)
   - `PUBLIC_WHATSAPP_NUMBER` = número con código país

## 5) CORS en el Back

En `Back/.env` (servidor de la API), agregá el dominio de Pages:

```env
CORS_ORIGINS=https://astro-mimascota.pages.dev,https://tu-dominio.com
```

## 6) Dominio custom (opcional)

1. Pages → Custom domains → agregar dominio
2. SSL Full (strict)

## 7) Validación post-deploy

- Home y `/mascotas` cargan avisos desde la API
- `/publicar` guarda en MySQL vía `POST /api/pets`
- `/health` de la API responde OK desde internet

## 8) Deploy del Back (aparte)

La carpeta `Back/` necesita un host Node permanente con MySQL. Opciones típicas: Railway, Render, Fly.io, VPS.

Variables mínimas del Back en producción:

```env
BACK_PORT=3010
DB_DIALECT=mysql
DB_HOST=...
DB_PORT=3306
DB_NAME=mimascota
DB_USER=...
DB_PASSWORD=...
JWT_SECRET=...
CORS_ORIGINS=https://tu-front.pages.dev
DB_SYNC=0
```

Luego: `npm install && npm start` (o PM2 / Docker).
