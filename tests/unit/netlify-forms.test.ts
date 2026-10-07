import { describe, expect, it, vi } from 'vitest'
import { NETLIFY_FORM_NAME, sendToNetlifyForms } from '../../server/utils/netlify-forms'

const record = {
  name: 'Clara',
  email: 'clara@example.com',
  phone: '+573001112233',
  company: '',
  role: 'Gerente',
  need: 'Mejorar la operación & el talento'
}

describe('sendToNetlifyForms', () => {
  it('posts the record as urlencoded fields to the static form', async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 303 }))

    await sendToNetlifyForms('https://operanta.com.co', record, fetchMock as unknown as typeof fetch)

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://operanta.com.co/__forms.html')
    expect(init.method).toBe('POST')
    const sent = new URLSearchParams(init.body as string)
    expect(sent.get('form-name')).toBe(NETLIFY_FORM_NAME)
    expect(sent.get('name')).toBe('Clara')
    expect(sent.get('need')).toBe('Mejorar la operación & el talento')
    expect(sent.get('company')).toBe('')
  })

  it('throws when Netlify rejects the submission', async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 404 }))

    await expect(sendToNetlifyForms('https://operanta.com.co', record, fetchMock as unknown as typeof fetch))
      .rejects.toThrow('404')
  })
})
