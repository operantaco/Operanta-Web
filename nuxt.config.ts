// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    'reka-ui/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/supabase',
    '@nuxtjs/seo',
    '@formkit/auto-animate/nuxt',
    '@tresjs/nuxt',
    'nuxt-gtag',
    'nuxt-aos',
    '@nuxt/test-utils/module'
  ],

  devtools: { enabled: true },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [{ name: 'theme-color', content: '#13233F' }]
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://operanta.com.co',
    name: 'Operanta',
    description: 'Consultoría en operaciones y talento para pymes en Medellín.',
    defaultLocale: 'es'
  },

  colorMode: {
    preference: 'system',
    fallback: 'light'
  },

  runtimeConfig: {
    resendApiKey: '',
    contactToEmail: 'contacto@operanta.com.co',
    contactFromEmail: 'Operanta Web <web@operanta.com.co>',
    public: {
      whatsappNumber: '573127926312',
      calendlyUrl: 'https://calendly.com/contacto-operanta/30min'
    }
  },

  compatibilityDate: '2026-10-01',

  nitro: {
    externals: {
      // Nitro's built-in "nuxt/dist" matcher only handles "/" separators, so Windows
      // builds left the renderer external and failed at runtime. Harmless on Linux.
      inline: [/^nuxt\/internal\//, /[\\/]node_modules[\\/]nuxt[\\/]dist[\\/]/]
    }
  },

  aos: {
    duration: 1200,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'IBM Plex Sans', provider: 'google', weights: [300, 400, 500, 600], styles: ['normal', 'italic'] },
      { name: 'IBM Plex Mono', provider: 'google', weights: [400, 500] }
    ]
  },

  gtag: {
    enabled: Boolean(process.env.NUXT_PUBLIC_GTAG_ID),
    id: process.env.NUXT_PUBLIC_GTAG_ID
  },

  i18n: {
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'es', language: 'es-CO', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'operanta_lang',
      redirectOn: 'root'
    }
  },

  icon: {
    serverBundle: { collections: ['lucide', 'simple-icons'] }
  },

  ogImage: { enabled: false },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Operanta',
      url: 'https://operanta.com.co',
      logo: 'https://operanta.com.co/brand/logo-horizontal-color.svg',
      email: 'contacto@operanta.com.co',
      sameAs: [
        'https://www.linkedin.com/company/142833899',
        'https://www.instagram.com/operanta_/',
        'https://www.facebook.com/profile.php?id=61592279525893'
      ]
    }
  },

  supabase: {
    redirect: false,
    // The module throws on every request when URL/key are empty. Placeholders keep the site
    // up before a Supabase project exists; real values come from NUXT_PUBLIC_SUPABASE_* at runtime.
    // Nothing is stored until NUXT_SUPABASE_SECRET_KEY is also set (see server/api/contact.post.ts).
    url: 'https://placeholder.supabase.co',
    key: 'placeholder-publishable-key'
  }
})
