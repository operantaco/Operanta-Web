<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative isolate overflow-hidden bg-tinta-900 pb-12 pt-20 text-white/70">
    <ParallaxLayer
      :speed="0.15"
      :rotate="0.02"
      class="absolute left-1/2 -top-[480px] w-[900px] -translate-x-1/2 opacity-50"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        class="w-full"
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="rgb(255 255 255 / 0.08)"
          stroke-width="0.6"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#12B0A8"
          stroke-width="0.6"
          pathLength="100"
          stroke-dasharray="20 80"
        />
      </svg>
    </ParallaxLayer>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img
            src="/brand/logo-horizontal-white.svg"
            alt="Operanta"
            width="240"
            height="75"
            class="-ml-4 h-20 w-auto"
          >
          <p class="mt-4 max-w-sm">
            {{ $t('footer.tagline') }}
          </p>
        </div>

        <nav aria-label="Secciones">
          <ul class="space-y-2.5">
            <li
              v-for="key in NAV_SECTIONS"
              :key="key"
            >
              <a
                :href="`#${SECTION_IDS[key]}`"
                class="transition-colors duration-300 hover:text-marea-400"
              >{{ $t(`nav.${key}`) }}</a>
            </li>
          </ul>
        </nav>

        <div>
          <p class="kicker text-white/50">
            {{ $t('footer.follow') }}
          </p>
          <ul class="mt-4 flex gap-3">
            <li
              v-for="social in SOCIAL_LINKS"
              :key="social.key"
            >
              <UButton
                :href="social.href"
                target="_blank"
                rel="noopener"
                :icon="social.icon"
                :aria-label="$t(`a11y.social.${social.key}`)"
                size="xl"
                color="neutral"
                variant="outline"
                class="rounded-full bg-transparent text-white ring-white/20 transition-all duration-500 hover:-translate-y-1 hover:bg-marea-500 hover:text-tinta-900 hover:ring-marea-500"
              />
            </li>
          </ul>
          <address class="mt-8 space-y-1 font-mono text-sm not-italic">
            <p>{{ $t('footer.location') }}</p>
            <a
              :href="`mailto:${CONTACT_EMAIL}`"
              class="block hover:text-marea-400"
            >{{ CONTACT_EMAIL }}</a>
          </address>
        </div>
      </div>

      <p class="mt-16 border-t border-white/10 pt-8 font-mono text-xs tracking-wide text-white/50">
        © {{ year }} Operanta. {{ $t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>
