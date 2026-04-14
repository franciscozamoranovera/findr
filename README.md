# Findr.it - Medical Professional Finder

A medical professional search and review platform built with Astro, React, and Supabase.

## Features

- 🔍 Search for medical professionals by specialty, location, and other criteria
- ⭐ Rate and review doctors based on communication, professionalism, and knowledge
- 🔐 Secure authentication with magic links via Supabase
- 📱 Cross-tab session synchronization
- 🎯 Advanced filtering by diseases, healthcare centers, and more

## Tech Stack

- **Frontend**: Astro + React + Tailwind CSS
- **Backend**: Supabase (Auth + Database)
- **Authentication**: Magic link auth with cross-tab sync
- **Database**: PostgreSQL via Supabase

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/findr-it-astro.git
cd findr-it-astro
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your Supabase credentials:
```env
PUBLIC_SUPABASE_URL=your-project-url
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
PUBLIC_SITE_URL=http://localhost:4321
```

5. Start the development server:
```bash
npm run dev
```

6. For mobile testing with network access:
```bash
npm run dev -- --host
```

## Architecture

The application uses a hybrid authentication system documented in [ARCHITECTURE.md](./ARCHITECTURE.md). Key components:

- **AuthProvider**: Global authentication state management
- **ReviewAuthGuard**: Hybrid authentication protection with fallback
- **Cross-tab Sync**: Automatic session synchronization between browser tabs
- **Magic Link Auth**: Passwordless authentication via Supabase

## Database Schema

The project uses a dual-column approach for ratings:
- Numeric values (1-5) for calculations and aggregations
- String labels ("Excepcional", "Bueno", etc.) for display and auditing

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed database design.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run dev -- --host`   | Start dev server with network access (mobile)   |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## SEO — Cambios implementados

### 1. Meta tags globales (`src/layouts/Layout.astro`)
- Prop `description` opcional con valor por defecto.
- `<meta name="description">` en todas las páginas.
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:image`, `og:locale`).
- `<slot name="head">` para inyectar contenido por página (JSON-LD, canonical, etc.).

### 2. `public/robots.txt`
- Permite indexación total.
- Apunta al sitemap: `https://findr.it/sitemap.xml`.

### 3. Sitemap dinámico (`src/pages/sitemap.xml.ts`)
- Endpoint SSR que consulta Supabase y genera XML en tiempo real.
- Incluye URLs estáticas (`/`, `/search`) + todas las páginas de perfil (`/doctor/{id}`).
- Cache-Control de 24h.
- Registrar en Google Search Console: `https://findr.it/sitemap.xml`.

### 4. JSON-LD en perfiles de médicos (`src/pages/profileDoc.astro`)
- Schema `Physician` con `name`, `medicalSpecialty`, `url`.
- `AggregateRating` cuando el médico tiene reseñas (nota + cantidad).
- `hospitalAffiliation` cuando tiene centro médico registrado.
- `<link rel="canonical">` por perfil.
- `<title>` dinámico: `Nombre — Especialidad | findr`.
- `<meta description>` dinámico con nombre, especialidad y rating.

### 5. Landing pages pre-renderizadas (`src/pages/buscar/[especialidad]/[ciudad].astro`)
50 páginas estáticas (10 especialidades × 5 ciudades) para rankear búsquedas del tipo "cardiólogo santiago".

**Especialidades:** Cardiología, Ginecología y Obstetricia, Neurología, Dermatología, Traumatología, Oftalmología, Pediatría, Psiquiatría, Urología, Endocrinología.

**Ciudades:** Santiago, Providencia, Las Condes, Ñuñoa, Vitacura.

URLs generadas:
```
/buscar/cardiologia/santiago
/buscar/neurologia/las-condes
... (50 en total)
```

Cada página incluye:
- `<h1>` con especialidad + ciudad.
- Lista de médicos ordenados por rating (datos reales de Supabase en build time).
- Schema `MedicalWebPage` JSON-LD.
- `<link rel="canonical">`.
- CTA que lleva a `/search` con filtros pre-aplicados.

Datos de especialidades y ciudades en `src/data/buscarData.ts`.

### 6. Variable de entorno requerida en Vercel
```
PUBLIC_SITE_URL=https://findr.it
```
Sin esta variable los canonicals y JSON-LD usan `https://findr.it` como fallback.
