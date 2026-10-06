<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <nav
    :aria-label="$t('a11y.switchLang')"
    class="flex items-center rounded-full border border-current/20 p-0.5 font-mono text-xs"
  >
    <NuxtLink
      v-for="item in locales"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      :hreflang="item.language"
      :aria-current="item.code === locale ? 'true' : undefined"
      :title="item.name"
      class="rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors duration-300"
      :class="item.code === locale ? 'bg-marea-500 text-tinta-900' : 'opacity-70 hover:opacity-100'"
    >
      {{ item.code }}
    </NuxtLink>
  </nav>
</template>
