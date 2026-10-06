import type { FormError } from '@nuxt/ui'
import type { ContactInput } from '#shared/types/contact'
import { validateContact } from '#shared/utils/contact'

export type ContactFormStatus = 'idle' | 'sending' | 'sent' | 'error'

type ContactFormState = Omit<ContactInput, 'locale'>

function emptyState(): ContactFormState {
  return { name: '', email: '', phone: '', company: '', role: '', need: '', website: '' }
}

/** State, translated validation and submission for the contact form (spec 001, R7–R8). */
export function useContactForm() {
  const { t, locale } = useI18n()
  const toast = useToast()

  const state = reactive<ContactFormState>(emptyState())
  const status = ref<ContactFormStatus>('idle')

  function validate(current: Partial<ContactFormState>): FormError[] {
    const seen = new Set<string>()
    return validateContact(current)
      .filter(({ field }) => !seen.has(field) && seen.add(field))
      .map(({ field, code }) => ({ name: field, message: t(`contact.errors.${code}`) }))
  }

  async function submit() {
    status.value = 'sending'
    try {
      await $fetch('/api/contact', {
        method: 'POST',
        body: { ...state, locale: locale.value }
      })
      status.value = 'sent'
      Object.assign(state, emptyState())
      toast.add({ title: t('contact.toast.successTitle'), description: t('contact.toast.successBody'), color: 'success', icon: 'i-lucide-circle-check' })
    } catch {
      status.value = 'error'
      toast.add({ title: t('contact.toast.errorTitle'), description: t('contact.toast.errorBody'), color: 'error', icon: 'i-lucide-circle-alert' })
    }
  }

  return { state, status, validate, submit }
}
