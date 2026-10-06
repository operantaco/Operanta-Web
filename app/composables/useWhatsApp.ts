import { buildWhatsAppUrl } from '#shared/utils/whatsapp'

/** WhatsApp link with the prefilled message in the active language. */
export function useWhatsApp() {
  const { t } = useI18n()
  const { public: { whatsappNumber } } = useRuntimeConfig()
  return computed(() => buildWhatsAppUrl(whatsappNumber, t('whatsapp.message')))
}
