# Mi Mascota — Documentación del proyecto

Sitio web estático para **avisos de mascotas perdidas y encontradas**. La gente puede buscar por ciudad, zona, tipo y características, y enviar nuevos avisos por WhatsApp para moderación.

- **Dominio provisional:** Cloudflare Pages (`astro-mimascota.pages.dev`)
- **Deploy front:** Cloudflare Pages (igual que `astro-royalsaints`) — ver `docs/CLOUDFLARE_SETUP.md`
- **API + MySQL:** host aparte (`Back/`); el front usa `PUBLIC_API_URL`

---

## Stack tecnológico

| Tecnología | Versión / uso |
|------------|----------------|
| [Astro](https://astro.build) | 6.x — SSR en Cloudflare Pages |
| TypeScript | Tipado estricto en datos y utilidades |
| Tailwind CSS | 4.x vía `@tailwindcss/vite` |
| Fontsource | Source Sans 3 (cuerpo) + Fraunces (títulos) |
| `@astrojs/cloudflare` | Adapter Pages/Workers |
| `@astrojs/sitemap` | Sitemap automático en build |
| Node.js | `>= 22.12.0` |

Front en Cloudflare; catálogo y altas vía API Express + MySQL (`Back/`).

---

## Arquitectura

1. **Catálogo tipado** en `src/data/pets.ts`
2. **Contacto honesto** — formularios abren WhatsApp con el mensaje armado (no simulan backend)
3. **Filtros en cliente** en `/mascotas` con sincronización de URL (`?status=perdida&…`)
4. **Componentes reutilizables** — tarjetas, layout, marca

---

## Estructura

```
astro-mimascota/
├── astro.config.mjs
├── package.json
├── public/
│   ├── favicon.svg
│   ├── og-default.svg
│   └── assets/
├── src/
│   ├── config/site.ts
│   ├── data/pets.ts
│   ├── lib/pets.ts
│   ├── lib/whatsapp.ts
│   ├── styles/global.css
│   ├── layouts/BaseLayout.astro
│   ├── components/
│   └── pages/
└── README.md
```

---

## Scripts

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera `dist/` |
| `npm run preview` | Sirve el build local |

**Variable de entorno opcional:**

```env
PUBLIC_WHATSAPP_NUMBER=5493430000000
```

---

## Cómo agregar un aviso al catálogo

1. Editá `src/data/pets.ts` y sumá un objeto `Pet` (slug único).
2. Opcional: poné fotos en `public/mascotas/{id}/` y actualizá `heroImage` / `galleryImages`.
3. Opcional: incluí el `id` en `featuredPetIds` para la home.
4. `npm run build` y verificá `/mascotas/{slug}/`.

Los avisos nuevos se crean desde `/publicar` (API) o editando `src/data/pets.ts` como fallback estático.


---

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/mascotas` | Catálogo con filtros |
| `/mascotas/{slug}` | Ficha del aviso |
| `/publicar` | Formulario → API (WhatsApp opcional) |
| `/como-funciona` | Flujo del sitio |
| `/faq` | Preguntas frecuentes |
| `/contacto` | Contacto general → WhatsApp |

---

## Backend API

El catálogo puede leerse desde la API en `Back/` (Express + Sequelize + **MySQL**/SQLite/Postgres).

```bash
cd Back
npm install
npm run seed
npm start
```

En la raíz del front, `.env`:

```env
PUBLIC_API_URL=http://localhost:3010
```

Si la API no está levantada, el sitio usa el fallback estático `src/data/pets.ts`.

Ver `Back/README.md` para endpoints de usuarios y mascotas.

---

## Deploy Cloudflare Pages (front)

Igual que `astro-royalsaints`. Guía completa: `docs/CLOUDFLARE_SETUP.md`.

```bash
npm run build
npm run cf:deploy
```

En el dashboard de Pages:

1. Build command: `npm run build`
2. Output directory: `dist`
3. Node: `22`
4. Vars: `PUBLIC_API_URL`, `PUBLIC_WHATSAPP_NUMBER`

El **Back** (Express + MySQL) no se despliega en Pages: va a un host Node aparte.
