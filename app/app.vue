<script setup lang="ts">
import { en, es } from '@nuxt/ui/locale'

const { t, locale } = useI18n()
const i18nHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link ?? [])],
  meta: [...(i18nHead.value.meta ?? [])]
}))

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogImage: '/brand/logo-horizontal-color.png',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

const uiLocale = computed(() => (locale.value === 'en' ? en : es))
</script>

<template>
  <UApp :locale="uiLocale">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </UApp>
</template>
