import { describe, expect, it, vi } from 'vitest'
import { submitContact } from '../../server/utils/contact-service'
import { buildContactEmail, escapeHtml } from '../../server/utils/contact-email'

const payload = { name: 'Mónica', email: 'monica@fundacion.org', phone: '3001234567', company: 'Fundación', role: 'Directora', need: 'Gestión del cambio', locale: 'es' }
const silent = { warn: vi.fn(), error: vi.fn() }

describe('submitContact', () => {
  it('stores and notifies a valid request', async () => {
    const store = vi.fn().mockResolvedValue(undefined)
    const notify = vi.fn().mockResolvedValue(undefined)
    const result = await submitContact(payload, { store, notify, logger: silent })

    expect(result).toEqual({ status: 'ok', stored: true, notified: true })
    expect(store).toHaveBeenCalledWith(expect.objectContaining({ name: 'Mónica', email: 'monica@fundacion.org' }))
    expect(store.mock.calls[0]![0]).not.toHaveProperty('website')
  })

  it('returns the field errors without calling any dependency', async () => {
    const store = vi.fn()
    const result = await submitContact({ name: '' }, { store, logger: silent })
    expect(result.status).toBe('invalid')
    expect(store).not.toHaveBeenCalled()
  })

  it('silently ignores honeypot submissions', async () => {
    const notify = vi.fn()
    expect(await submitContact({ ...payload, website: 'x' }, { notify, logger: silent })).toEqual({ status: 'ignored' })
    expect(notify).not.toHaveBeenCalled()
  })

  it('succeeds when only the email goes through', async () => {
    const store = vi.fn().mockRejectedValue(new Error('db down'))
    const notify = vi.fn().mockResolvedValue(undefined)
    expect(await submitContact(payload, { store, notify, logger: silent })).toEqual({ status: 'ok', stored: false, notified: true })
  })

  it('fails when nothing could deliver the request', async () => {
    const notify = vi.fn().mockRejectedValue(new Error('smtp down'))
    expect(await submitContact(payload, { notify, logger: silent })).toEqual({ status: 'failed' })
  })
})

describe('buildContactEmail', () => {
  it('addresses Operanta, replies to the lead and escapes HTML', () => {
    const email = buildContactEmail({ ...payload, locale: 'es', website: '', need: '<script>x</script>' }, 'web@operanta.com.co', 'contacto@operanta.com.co')

    expect(email.to).toBe('contacto@operanta.com.co')
    expect(email.replyTo).toBe('monica@fundacion.org')
    expect(email.subject).toBe('Nuevo contacto web · Mónica (Fundación)')
    expect(email.text).toContain('Teléfono: 3001234567')
    expect(email.html).toContain('&lt;script&gt;')
    expect(email.html).not.toContain('<script>')
  })

  it('escapes quotes and ampersands', () => {
    expect(escapeHtml(`"A" & 'B'`)).toBe('&quot;A&quot; &amp; &#39;B&#39;')
  })
})
