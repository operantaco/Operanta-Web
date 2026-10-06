export type ContactField = 'name' | 'email' | 'phone' | 'company' | 'role' | 'need'

export type ContactErrorCode = 'required' | 'invalidEmail' | 'invalidPhone' | 'tooLong'

export type ContactLocale = 'es' | 'en'

export interface ContactInput {
  name: string
  email: string
  phone: string
  company: string
  role: string
  need: string
  locale: ContactLocale
  /** Honeypot: humans never fill it */
  website: string
}

export interface ContactFieldError {
  field: ContactField
  code: ContactErrorCode
}
