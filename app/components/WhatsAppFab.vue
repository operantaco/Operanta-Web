<script setup lang="ts">
const whatsappUrl = useWhatsApp()
</script>

<template>
  <UTooltip
    :text="$t('whatsapp.tooltip')"
    :content="{ side: 'left' }"
  >
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener"
      :aria-label="$t('a11y.whatsapp')"
      class="group fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-12px_rgb(19_35_63/0.6)] transition-transform duration-500 ease-[var(--ease-brand)] hover:-translate-y-1 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-marea-500 sm:bottom-7 sm:right-7 sm:size-16"
    >
      <span
        class="animate-pulse-ring absolute inset-0 rounded-full bg-[#25D366]"
        aria-hidden="true"
      />
      <UIcon
        name="i-simple-icons-whatsapp"
        class="relative size-7 sm:size-8"
      />
    </a>
  </UTooltip>
</template>
