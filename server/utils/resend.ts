import type { OutgoingEmail } from './contact-email'

/** Sends an email through the Resend REST API (no SDK dependency). */
export async function sendWithResend(apiKey: string, email: OutgoingEmail): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: email.from,
      to: [email.to],
      reply_to: email.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html
    })
  })
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`)
  }
}
