/** Static site structure. Copy lives in i18n/locales; this file only holds ids, icons and links. */

export const SECTION_IDS = {
  hero: 'inicio',
  problem: 'punto-de-partida',
  services: 'servicios',
  method: 'como-trabajamos',
  audience: 'publico',
  value: 'propuesta',
  plans: 'contratarnos',
  team: 'equipo',
  contact: 'contacto'
} as const

export type SectionKey = keyof typeof SECTION_IDS

export const NAV_SECTIONS: SectionKey[] = ['hero', 'services', 'method', 'plans', 'team', 'contact']

export const CONTACT_EMAIL = 'contacto@operanta.com.co'

export const SOCIAL_LINKS = [
  { key: 'linkedin', icon: 'i-simple-icons-linkedin', href: 'https://www.linkedin.com/company/142833899' },
  { key: 'instagram', icon: 'i-simple-icons-instagram', href: 'https://www.instagram.com/operanta_/' },
  { key: 'facebook', icon: 'i-simple-icons-facebook', href: 'https://www.facebook.com/profile.php?id=61592279525893' }
] as const

export type ServiceGroup = 'operations' | 'talent'

export const SERVICE_GROUPS: Record<ServiceGroup, { id: string, icon: string }[]> = {
  operations: [
    { id: 'logistics', icon: 'i-lucide-truck' },
    { id: 'productivity', icon: 'i-lucide-gauge' },
    { id: 'innovation', icon: 'i-lucide-lightbulb' }
  ],
  talent: [
    { id: 'talent', icon: 'i-lucide-users' },
    { id: 'change', icon: 'i-lucide-refresh-cw' }
  ]
}

export const CONSULTING_STEPS = ['diagnosis', 'intervention', 'measurement', 'transfer'] as const
export const TRAINING_STEPS = ['workshop', 'course', 'bootcamp'] as const

export const AUDIENCE_SEGMENTS = [
  { id: 'companies', icon: 'i-lucide-building-2' },
  { id: 'people', icon: 'i-lucide-user-round' },
  { id: 'influencers', icon: 'i-lucide-megaphone' }
] as const

export const PLANS = [
  { id: 'diagnosis' },
  { id: 'sprint' },
  { id: 'retainer' }
] as const

export const TEAM = [
  { id: 'clara', photo: '/img/team/clara-arbelaez.webp' },
  { id: 'monica', photo: '/img/team/monica-sanin.jpg' }
] as const
