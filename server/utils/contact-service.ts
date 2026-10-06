import type { ContactFieldError, ContactInput } from '../../shared/types/contact'
import { isLikelySpam, normalizeContact, validateContact } from '../../shared/utils/contact'

export type ContactRecord = Omit<ContactInput, 'website'>

export interface ContactDeps {
  /** Persists the request. Undefined when storage is not configured. */
  store?: (record: ContactRecord) => Promise<void>
  /** Notifies Operanta's inbox. Undefined when email is not configured. */
  notify?: (record: ContactRecord) => Promise<void>
  logger?: Pick<Console, 'warn' | 'error'>
}

export type SubmitResult
  = | { status: 'ok', stored: boolean, notified: boolean }
    | { status: 'ignored' }
    | { status: 'invalid', errors: ContactFieldError[] }
    | { status: 'failed' }

async function attempt(step: ((r: ContactRecord) => Promise<void>) | undefined, record: ContactRecord, label: string, logger: ContactDeps['logger']): Promise<boolean> {
  if (!step) {
    logger?.warn(`[contact] ${label} is not configured, skipping`)
    return false
  }
  try {
    await step(record)
    return true
  } catch (error) {
    logger?.error(`[contact] ${label} failed`, error)
    return false
  }
}

/**
 * Validates and delivers a contact request. Succeeds when the request is
 * stored or emailed; both are attempted independently so one outage does not lose the lead.
 */
export async function submitContact(raw: unknown, deps: ContactDeps): Promise<SubmitResult> {
  const input = normalizeContact(raw)
  if (isLikelySpam(input)) return { status: 'ignored' }

  const errors = validateContact(input)
  if (errors.length) return { status: 'invalid', errors }

  const { website: _honeypot, ...record } = input
  const [stored, notified] = await Promise.all([
    attempt(deps.store, record, 'storage', deps.logger),
    attempt(deps.notify, record, 'email', deps.logger)
  ])

  return stored || notified ? { status: 'ok', stored, notified } : { status: 'failed' }
}
