# Constitución de Operanta Web
Principios innegociables. Toda spec, plan y tarea debe cumplirlos; si no, se rechaza.

## Stack y simplicidad
1. Solo Nuxt 4 + TypeScript estricto, Reka UI (`reka-ui/nuxt`), Nuxt UI y los módulos aprobados (@nuxt/eslint, icon, fonts, image, test-utils, @nuxtjs/i18n, supabase, seo, nuxt-gtag, auto-animate, nuxt-aos, @tresjs/nuxt). Una dependencia nueva exige justificación escrita en el plan.
2. Lo más simple que cumpla la spec: sin capas, abstracciones ni patrones "por si acaso".
3. Se sigue la documentación oficial de Nuxt, Nuxt UI, Reka UI y Supabase (skills instalados); no se reinventa lo que el framework ya ofrece.

## Spec y código
4. Ningún código sin spec aprobada; cada tarea cita el requisito que implementa.
5. Si el código y la spec divergen, se corrige primero la spec y luego el código.

## Lógica e interfaz
6. La lógica vive en composables (`app/composables`) y utils, en TypeScript puro; los componentes solo presentan y emiten eventos.
7. Se usa auto-import, `<script setup lang="ts">`, `useFetch`/`useAsyncData` y `server/api` según la documentación de Nuxt. Prohibido `fetch` manual en componentes.
8. Interfaz con componentes de Reka UI/Nuxt UI (accesibles por defecto) antes que HTML propio; un componente, una responsabilidad.

## Pruebas
9. Todo composable, util y endpoint con lógica lleva unit tests con @nuxt/test-utils/Vitest en el mismo cambio; sin test no hay merge.
10. Los tests no llaman a Supabase real: se simula la capa de datos.

## Datos
11. Toda persistencia pasa por Supabase (@nuxtjs/supabase) con RLS activado y migraciones versionadas en `supabase/migrations`.
12. Claves de servicio solo en servidor; el cliente usa únicamente la clave anon. Nunca secretos en el repositorio.

## Marca, idioma y despliegue
13. Responsive mobile-first en toda vista y componente (verificable a 360 px), con modo claro/oscuro y tokens de la línea gráfica (Tinta, Marea, Ámbar, Niebla, Pizarra; Space Grotesk, IBM Plex Sans/Mono).
14. El sitio se ofrece en español e inglés, con selector de idioma. Todo texto visible sale de i18n, en `i18n/locales/es.json` y `en.json` (archivos separados, mismas claves); prohibido texto fijo en plantillas.
15. Las specs, planes y docs se escriben en español. Identificadores, comentarios y commits van en inglés.
16. Despliegue en Netlify; `lint`, `typecheck` y `test` deben pasar antes de cada merge.
