import type { ContactField, ContactFieldError, ContactInput, ContactLocale } from '../types/contact'

export const CONTACT_REQUIRED_FIELDS: readonly ContactField[] = ['name', 'email', 'phone']

export const CONTACT_MAX_LENGTH: Record<ContactField, number> = {
  name: 120,
  email: 160,
  phone: 30,
  company: 160,
  role: 120,
  need: 2000
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_ALLOWED = /^\+?[\d\s().-]+$/

function asText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function asLocale(value: unknown): ContactLocale {
  return value === 'en' ? 'en' : 'es'
}

/** Turns an untrusted payload into a ContactInput with trimmed strings. */
export function normalizeContact(raw: unknown): ContactInput {
  const data = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  return {
    name: asText(data.name),
    email: asText(data.email).toLowerCase(),
    phone: asText(data.phone),
    company: asText(data.company),
    role: asText(data.role),
    need: asText(data.need),
    locale: asLocale(data.locale),
    website: asText(data.website)
  }
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email)
}

/** Accepts local or international numbers with 7 to 15 digits. */
export function isValidPhone(phone: string): boolean {
  if (!PHONE_ALLOWED.test(phone)) return false
  const digits = phone.replace(/\D/g, '').length
  return digits >= 7 && digits <= 15
}

export function validateContact(input: Partial<ContactInput>): ContactFieldError[] {
  const errors: ContactFieldError[] = []

  for (const field of CONTACT_REQUIRED_FIELDS) {
    if (!asText(input[field])) errors.push({ field, code: 'required' })
  }

  const email = asText(input.email)
  if (email && !isValidEmail(email)) errors.push({ field: 'email', code: 'invalidEmail' })

  const phone = asText(input.phone)
  if (phone && !isValidPhone(phone)) errors.push({ field: 'phone', code: 'invalidPhone' })

  for (const [field, max] of Object.entries(CONTACT_MAX_LENGTH) as [ContactField, number][]) {
    if (asText(input[field]).length > max) errors.push({ field, code: 'tooLong' })
  }

  return errors
}

export function isLikelySpam(input: Pick<ContactInput, 'website'>): boolean {
  return input.website.length > 0
}
