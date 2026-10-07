<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const colorMode = useColorMode()
const { solid, progress } = useScrollState(80)
const menuOpen = ref(false)

const navItems = computed(() => NAV_SECTIONS.map(key => ({ key, label: t(`nav.${key}`), href: `#${SECTION_IDS[key]}` })))

/** Over the dark hero the header is always light-on-dark. */
const onDark = computed(() => !solid.value || colorMode.value === 'dark')
const logo = computed(() => (onDark.value ? '/brand/logo-horizontal-on-dark.svg' : '/brand/logo-horizontal-color.svg'))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500"
    :class="solid ? 'glass border-default shadow-[0_12px_30px_-24px_rgb(19_35_63/0.5)]' : 'border-transparent'"
  >
    <div
      class="absolute left-0 top-0 h-0.5 w-full origin-left bg-marea-500"
      :style="{ transform: `scaleX(${progress})` }"
      role="progressbar"
      :aria-label="$t('a11y.progress')"
      :aria-valuenow="Math.round(progress * 100)"
      aria-valuemin="0"
      aria-valuemax="100"
    />
    <div
      class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8"
      :class="onDark ? 'text-white' : 'text-highlighted'"
    >
      <NuxtLink
        :to="localePath('/')"
        :aria-label="$t('a11y.home')"
        class="shrink-0"
      >
        <img
          :src="logo"
          alt="Operanta"
          width="192"
          height="60"
          class="-mx-3 h-12 w-auto lg:h-14"
        >
      </NuxtLink>

      <nav
        class="hidden items-center gap-7 lg:flex"
        aria-label="Principal"
      >
        <a
          v-for="item in navItems"
          :key="item.key"
          :href="item.href"
          class="group relative py-1 text-sm transition-opacity duration-300 hover:opacity-100"
          :class="onDark ? 'opacity-80' : 'opacity-90'"
        >
          {{ item.label }}
          <span class="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-marea-500 transition-transform duration-500 group-hover:scale-x-100" />
        </a>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <LangSwitch />
        <UColorModeButton :class="onDark && 'text-white hover:bg-white/10'" />
        <UButton
          :href="`#${SECTION_IDS.contact}`"
          :label="$t('nav.cta')"
          trailing-icon="i-lucide-arrow-right"
          class="hidden bg-marea-500 text-tinta-900 hover:bg-marea-400 sm:inline-flex"
        />
        <UButton
          class="lg:hidden"
          :class="onDark && 'text-white hover:bg-white/10'"
          color="neutral"
          variant="ghost"
          icon="i-lucide-menu"
          :aria-label="$t('nav.cta')"
          @click="menuOpen = true"
        />
      </div>
    </div>

    <USlideover
      v-model:open="menuOpen"
      side="right"
      :title="'Operanta'"
    >
      <template #body>
        <nav
          class="flex flex-col gap-1"
          aria-label="Principal"
        >
          <a
            v-for="item in navItems"
            :key="item.key"
            :href="item.href"
            class="rounded px-3 py-3 font-display text-lg text-highlighted transition-colors hover:bg-muted"
            @click="menuOpen = false"
          >{{ item.label }}</a>
        </nav>
      </template>
    </USlideover>
  </header>
</template>
