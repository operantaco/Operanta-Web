# Spec 001 · Landing de Operanta

Estado: aprobada (pedido de Clara, 6 oct 2026). Cumple `docs/constitution.md`.
Fuentes: `Ideas Web Operanta.pdf` (contenido) y `Operanta_Manual_Linea_Grafica.html` (marca).

## Requisitos

| ID | Requisito |
|----|-----------|
| R1 | Landing de una página en Nuxt 4 con los módulos de la constitución. |
| R2 | Secciones en este orden: Portada (01), Punto de partida (02), Qué hacemos: Operaciones y Talento (03), Cómo trabajamos: consultoría y formación (04), Público objetivo (05), Propuesta de valor (06), Cómo contratarnos (07), Equipo (08), Contáctenos, Footer. |
| R3 | Portada: "Gestión empresarial / Perfil laboral en Medellín", texto de acompañamiento, CTA a WhatsApp y botón a Portafolio (ancla a 03). |
| R4 | Línea gráfica del manual: colores Tinta, Marea, Ámbar, Niebla, Pizarra; Space Grotesk, IBM Plex Sans y Mono; arco, punto final en marea, trama de puntos; radios 4/6 px. |
| R5 | Estilo dinámico, profesional y futurista: efectos de scroll (AOS), parallax de fondo, animaciones lentas y fluidas; respeta `prefers-reduced-motion`. |
| R6 | Botón flotante de WhatsApp a +57 312 792 6312 con el mensaje "Estoy interesada en los servicios de Operanta." |
| R7 | Formulario antes del footer: Nombre*, Correo*, Teléfono*, Empresa, Cargo, Necesidad. Los campos con * son obligatorios. |
| R8 | Cada envío se guarda en Supabase (`contact_requests`, RLS activo) y se envía por correo a contacto@operanta.com.co. |
| R9 | Footer con enlaces a LinkedIn, Instagram y Facebook de Operanta. |
| R10 | Imágenes de apoyo en SVG y animaciones en MP4 generadas con la paleta de marca. |
| R11 | Español (por defecto) e inglés con selector; modo claro/oscuro; responsive desde 360 px. |
| R12 | Sin precios ni garantías de ROI públicas (decisión registrada en `Web/README.md`). |

## Fuera de alcance

Blog, área privada, agenda integrada (el enlace a Calendly queda como alternativa).

## Criterios de aceptación

- `npm run lint`, `npm run typecheck` y `npm run test` pasan.
- El formulario rechaza envíos sin nombre, correo válido o teléfono válido, y muestra el error en el idioma activo.
- Con las variables de entorno configuradas, un envío válido crea la fila y llega el correo.
