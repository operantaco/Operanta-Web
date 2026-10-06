# Operanta-Web
Pagina Web de los servicios de Operanta
Operación y Talento en Marcha

Landing en Nuxt 4 + TypeScript, desplegada en Netlify, con Supabase como base de datos.
Reglas del proyecto: [docs/constitution.md](docs/constitution.md). Spec vigente: [docs/specs/001-landing.md](docs/specs/001-landing.md).

## Desarrollo

```bash
npm install
cp .env.example .env   # completar valores
npm run dev            # http://localhost:3000
npm run lint && npm run typecheck && npm run test
```

## Estructura

| Carpeta | Contenido |
|---------|-----------|
| `app/components` | Secciones de la landing y piezas de UI (solo presentación) |
| `app/composables` | Lógica de cliente: formulario, parallax, WhatsApp, media queries |
| `app/utils/site.ts` | Anclas, servicios, redes y equipo (sin textos) |
| `shared/utils` | Lógica pura compartida: validación, enlace de WhatsApp, cálculo de parallax |
| `server/api/contact.post.ts` | Recibe el formulario, lo guarda en Supabase y lo envía por correo |
| `i18n/locales` | Textos en `es.json` y `en.json` |
| `public/svg`, `public/video` | Ilustraciones SVG y animaciones MP4 de marca |
| `supabase/migrations` | Tabla `contact_requests` con RLS |
| `tests/unit`, `tests/nuxt` | Tests con Vitest y @nuxt/test-utils |

## Puesta en producción (Netlify + Supabase + Resend)

1. **Supabase:** crear el proyecto y ejecutar `supabase/migrations/20261006000000_contact_requests.sql` (SQL Editor o `supabase db push`).
2. **Resend:** crear cuenta, verificar el dominio `operanta.com.co` (agrega registros DNS propios de Resend en GoDaddy; **no** tocar los MX ni el DKIM de Titan) y generar una API key.
3. **Netlify:** conectar este repositorio (build `npm run build`) y cargar las variables:

   | Variable | Valor |
   |----------|-------|
   | `NUXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
   | `NUXT_PUBLIC_SUPABASE_KEY` | Clave publicable (anon) |
   | `NUXT_SUPABASE_SECRET_KEY` | Clave secreta (service role) |
   | `NUXT_RESEND_API_KEY` | API key de Resend |
   | `NUXT_CONTACT_FROM_EMAIL` | `Operanta Web <web@operanta.com.co>` |
   | `NUXT_CONTACT_TO_EMAIL` | `contacto@operanta.com.co` |
   | `NUXT_PUBLIC_GTAG_ID` | ID de Google Analytics 4 (opcional; por defecto `G-9WJXLP2H23`) |

   Todas son opcionales para publicar: sin Supabase el sitio carga igual y solo se omite el guardado en base de datos. Para que el formulario funcione hace falta al menos Supabase (los tres valores) o Resend.

4. Apuntar el dominio al nuevo sitio de Netlify (hoy apunta al `index.html` subido con Netlify Drop).

El formulario responde bien si al menos uno de los dos destinos funciona (base de datos o correo); si fallan ambos, el usuario ve un error y la sugerencia de escribir por WhatsApp.

## Recursos generados

- `public/video/orbit-loop.mp4` y `flow-loop.mp4`: bucles de 20 s y 12 s renderizados con la paleta de marca (con póster `.jpg` para quien prefiere menos movimiento).
- `public/svg/*`: anillo de dos arcos, órbitas, red de flujo, ilustraciones de operaciones y talento, gráfico de indicadores.
- Fotos del equipo extraídas de `Ideas Web Operanta.pptx`.
