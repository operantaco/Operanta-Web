import type { ContactRecord } from './contact-service'

/** Name of the form declared in public/__forms.html; Netlify groups submissions by it. */
export const NETLIFY_FORM_NAME = 'contacto'

/** Path of the static form Netlify scans at deploy time (SSR pages are not scanned). */
export const NETLIFY_FORM_PATH = '/__forms.html'

/** Submits a contact request to Netlify Forms, which stores it and emails the configured recipients. */
export async function sendToNetlifyForms(origin: string, record: ContactRecord, fetchImpl: typeof fetch = fetch): Promise<void> {
  const body = new URLSearchParams({ 'form-name': NETLIFY_FORM_NAME })
  for (const [key, value] of Object.entries(record)) {
    body.set(key, value ?? '')
  }

  const response = await fetchImpl(new URL(NETLIFY_FORM_PATH, origin).toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    redirect: 'manual'
  })

  // Netlify answers a successful submission with a redirect or a 2xx page.
  if (response.status >= 400) {
    throw new Error(`Netlify Forms responded ${response.status}`)
  }
}
