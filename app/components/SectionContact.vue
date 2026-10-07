<script setup lang="ts">
const { state, status, validate, submit } = useContactForm()
const whatsappUrl = useWhatsApp()
const { public: { calendlyUrl } } = useRuntimeConfig()

const fields = [
  { name: 'name', required: true, type: 'text', autocomplete: 'name', icon: 'i-lucide-user' },
  { name: 'email', required: true, type: 'email', autocomplete: 'email', icon: 'i-lucide-mail' },
  { name: 'phone', required: true, type: 'tel', autocomplete: 'tel', icon: 'i-lucide-phone' },
  { name: 'company', required: false, type: 'text', autocomplete: 'organization', icon: 'i-lucide-building-2' },
  { name: 'role', required: false, type: 'text', autocomplete: 'organization-title', icon: 'i-lucide-briefcase' }
] as const

const alternatives = computed(() => [
  { key: 'whatsapp', icon: 'i-simple-icons-whatsapp', href: whatsappUrl.value, value: '+57 312 792 6312', external: true },
  { key: 'email', icon: 'i-lucide-mail', href: `mailto:${CONTACT_EMAIL}`, value: CONTACT_EMAIL, external: false },
  { key: 'calendly', icon: 'i-lucide-calendar-check', href: calendlyUrl, value: 'calendly.com/contacto-operanta', external: true }
])
</script>

<template>
  <section
    :id="SECTION_IDS.contact"
    class="relative overflow-hidden bg-muted py-24 sm:py-32"
  >
    <div class="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 [&>*]:min-w-0 px-4 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:px-8">
      <div>
        <SectionHeader
          :kicker="$t('contact.kicker')"
          :title="$t('contact.title')"
          :lead="$t('contact.lead')"
        />
        <div
          class="mt-10"
          data-aos="fade-up"
          data-aos-delay="250"
        >
          <p class="kicker text-dimmed">
            {{ $t('contact.alt.title') }}
          </p>
          <ul class="mt-4 space-y-3">
            <li
              v-for="alt in alternatives"
              :key="alt.key"
            >
              <a
                :href="alt.href"
                :target="alt.external ? '_blank' : undefined"
                :rel="alt.external ? 'noopener' : undefined"
                class="group flex items-center gap-4 rounded-md border border-default bg-default p-4 transition-colors duration-300 hover:border-marea-500/60"
              >
                <span class="grid size-10 shrink-0 place-items-center rounded-full bg-tinta-900 text-marea-400 dark:bg-white/10">
                  <UIcon
                    :name="alt.icon"
                    class="size-5"
                  />
                </span>
                <span class="min-w-0">
                  <span class="block font-display text-highlighted">{{ $t(`contact.alt.${alt.key}`) }}</span>
                  <span class="block truncate font-mono text-sm text-muted">{{ alt.value }}</span>
                </span>
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="ml-auto size-5 text-dimmed transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="rounded-md border border-default bg-default p-6 shadow-[0_30px_60px_-40px_rgb(19_35_63/0.45)] sm:p-10"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <UForm
          :state="state"
          :validate="validate"
          :validate-on="['blur']"
          class="grid gap-5 sm:grid-cols-2"
          @submit="submit"
        >
          <UFormField
            v-for="field in fields"
            :key="field.name"
            :name="field.name"
            :label="$t(`contact.fields.${field.name}`)"
            :required="field.required"
            :class="field.name === 'name' && 'sm:col-span-2'"
          >
            <UInput
              v-model="state[field.name]"
              :type="field.type"
              :autocomplete="field.autocomplete"
              :placeholder="$t(`contact.placeholders.${field.name}`)"
              :icon="field.icon"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <UFormField
            name="need"
            :label="$t('contact.fields.need')"
            class="sm:col-span-2"
          >
            <UTextarea
              v-model="state.need"
              :placeholder="$t('contact.placeholders.need')"
              :rows="5"
              autoresize
              size="lg"
              class="w-full"
            />
          </UFormField>

          <!-- Honeypot: hidden from people and assistive tech -->
          <div
            class="absolute -left-[9999px]"
            aria-hidden="true"
          >
            <label>Website <input
              v-model="state.website"
              type="text"
              tabindex="-1"
              autocomplete="off"
            ></label>
          </div>

          <div
            v-auto-animate
            class="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <p class="text-sm text-muted">
              {{ $t('contact.requiredNote') }} {{ $t('contact.privacy') }}
            </p>
            <UButton
              type="submit"
              size="xl"
              :loading="status === 'sending'"
              :label="status === 'sending' ? $t('contact.sending') : $t('contact.submit')"
              trailing-icon="i-lucide-send"
              class="justify-center"
            />
            <p
              v-if="status === 'sent'"
              class="flex items-center gap-2 text-sm text-success sm:basis-full"
              role="status"
            >
              <UIcon
                name="i-lucide-circle-check"
                class="size-4"
              />
              {{ $t('contact.sent') }}
            </p>
          </div>
        </UForm>
      </div>
    </div>
  </section>
</template>
