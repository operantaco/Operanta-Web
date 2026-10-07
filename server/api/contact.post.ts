import { serverSupabaseServiceRole } from '#supabase/server'
import type { ContactDeps } from '../utils/contact-service'
import { submitContact } from '../utils/contact-service'
import { buildContactEmail } from '../utils/contact-email'
import { sendWithResend } from '../utils/resend'
import { sendToNetlifyForms } from '../utils/netlify-forms'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)

  const supabaseUrl = config.public.supabase?.url
  const hasSupabase = Boolean(
    supabaseUrl && !supabaseUrl.includes('placeholder') && (config.supabase?.secretKey || config.supabase?.serviceKey)
  )

  const deps: ContactDeps = {
    logger: console,
    store: hasSupabase
      ? async (record) => {
        const { error } = await serverSupabaseServiceRole(event)
          .from('contact_requests')
          .insert({ ...record, source: 'landing' })
        if (error) throw error
      }
      : undefined,
    notify: config.resendApiKey
      ? record => sendWithResend(config.resendApiKey, buildContactEmail({ ...record, website: '' }, config.contactFromEmail, config.contactToEmail))
      // Netlify does not expose NETLIFY at runtime, so any non-dev server uses Netlify Forms as the default inbox.
      : import.meta.dev
        ? undefined
        : record => sendToNetlifyForms(getRequestURL(event, { xForwardedHost: true }).origin, record)
  }

  const result = await submitContact(body, deps)

  switch (result.status) {
    case 'invalid':
      throw createError({ statusCode: 422, statusMessage: 'Invalid contact request', data: { errors: result.errors } })
    case 'failed':
      throw createError({ statusCode: 503, statusMessage: 'Contact request could not be delivered' })
    default:
      return { ok: true }
  }
})
