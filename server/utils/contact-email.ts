import type { ContactInput } from '../../shared/types/contact'

export interface OutgoingEmail {
  from: string
  to: string
  replyTo: string
  subject: string
  text: string
  html: string
}

const LABELS: [keyof ContactInput, string][] = [
  ['name', 'Nombre'],
  ['email', 'Correo'],
  ['phone', 'Teléfono'],
  ['company', 'Empresa'],
  ['role', 'Cargo'],
  ['need', 'Necesidad'],
  ['locale', 'Idioma del sitio']
]

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Notification sent to Operanta's inbox for each contact request. Always in Spanish. */
export function buildContactEmail(input: ContactInput, from: string, to: string): OutgoingEmail {
  const rows = LABELS.map(([key, label]) => [label, input[key] || '—'] as const)
  const subject = `Nuevo contacto web · ${input.name}${input.company ? ` (${input.company})` : ''}`

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n')
  const html = `<div style="font-family:Arial,sans-serif;color:#13233F">
<h2 style="margin:0 0 16px">Nuevo contacto desde operanta.com.co</h2>
<table cellpadding="8" style="border-collapse:collapse">${rows
  .map(([label, value]) => `<tr><td style="color:#68727E;border-bottom:1px solid #EEF0F1">${label}</td><td style="border-bottom:1px solid #EEF0F1;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
  .join('')}</table>
</div>`

  return { from, to, replyTo: input.email, subject, text, html }
}
