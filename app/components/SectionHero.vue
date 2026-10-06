<script setup lang="ts">
const whatsappUrl = useWhatsApp()
/** The 3D scene (and three.js) only loads on large screens. */
const isDesktop = useMediaQuery('(min-width: 1024px)')

const stats = [
  { value: '+25', key: 'years' },
  { value: '2', key: 'fronts' },
  { value: '1', key: 'pilot' }
] as const
</script>

<template>
  <section
    :id="SECTION_IDS.hero"
    class="relative isolate flex min-h-svh items-end overflow-hidden bg-tinta-900 text-white"
  >
    <div class="dot-grid absolute inset-0 text-white [mask-image:linear-gradient(180deg,transparent,#000_25%,#000_70%,transparent)]" />
    <div class="absolute inset-0 bg-[radial-gradient(60%_60%_at_75%_40%,rgb(18_176_168/0.18),transparent_70%)]" />

    <ParallaxLayer
      :speed="-0.3"
      :rotate="0.02"
      class="absolute -right-[30vw] -top-[20vh] w-[min(120vw,1000px)] opacity-60 lg:-right-[12vw]"
    >
      <img
        src="/svg/orbit-grid.svg"
        alt=""
        class="w-full animate-spin-slow"
      >
    </ParallaxLayer>

    <LazyHeroScene
      v-if="isDesktop"
      class="absolute inset-y-0 right-0 w-[58%]"
    />

    <ParallaxLayer
      :speed="0.2"
      class="absolute -right-24 top-24 w-72 opacity-90 sm:w-96 lg:hidden"
    >
      <img
        src="/svg/arc-duo.svg"
        alt=""
        class="w-full animate-spin-slow"
      >
    </ParallaxLayer>

    <ParallaxLayer
      :speed="0.18"
      :rotate="-0.04"
      class="absolute -bottom-40 -left-32 w-[420px] opacity-40"
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
          stroke="rgb(255 255 255 / 0.12)"
          stroke-width="1.5"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#12B0A8"
          stroke-width="1.5"
          stroke-linecap="round"
          pathLength="100"
          stroke-dasharray="30 70"
        />
      </svg>
    </ParallaxLayer>

    <div class="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28">
      <div class="max-w-2xl">
        <p
          class="kicker mb-6 flex items-center gap-3 text-marea-400"
          data-aos="fade-up"
        >
          <span
            class="h-px w-7 bg-current"
            aria-hidden="true"
          />
          {{ $t('hero.kicker') }}
        </p>
        <h1
          class="text-[2.6rem] leading-[1.02] font-medium sm:text-6xl lg:text-7xl"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {{ $t('hero.title') }}<span class="text-marea-500">.</span>
        </h1>
        <p
          class="mt-7 max-w-xl text-lg text-white/75 sm:text-xl"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {{ $t('hero.lead') }}
        </p>
        <div
          class="mt-10 flex flex-wrap gap-3"
          data-aos="fade-up"
          data-aos-delay="450"
        >
          <UButton
            :href="whatsappUrl"
            target="_blank"
            rel="noopener"
            size="xl"
            icon="i-simple-icons-whatsapp"
            :label="$t('hero.ctaWhatsapp')"
            class="bg-marea-500 text-tinta-900 hover:bg-marea-400"
          />
          <UButton
            :href="`#${SECTION_IDS.services}`"
            size="xl"
            variant="outline"
            color="neutral"
            trailing-icon="i-lucide-arrow-down"
            :label="$t('hero.ctaPortfolio')"
            class="bg-transparent text-white ring-white/30 hover:bg-white/10"
          />
        </div>
      </div>

      <dl
        class="mt-16 grid max-w-3xl grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:grid-cols-3"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <div
          v-for="stat in stats"
          :key="stat.key"
        >
          <dt class="sr-only">
            {{ $t(`hero.stats.${stat.key}`) }}
          </dt>
          <dd class="flex items-baseline gap-3 sm:block">
            <span class="font-mono text-4xl font-medium text-marea-400">{{ stat.value }}</span>
            <span class="text-sm text-white/60 sm:mt-1 sm:block">{{ $t(`hero.stats.${stat.key}`) }}</span>
          </dd>
        </div>
      </dl>
    </div>

    <a
      :href="`#${SECTION_IDS.problem}`"
      class="kicker absolute bottom-10 right-6 hidden items-center gap-3 text-white/55 [writing-mode:vertical-rl] hover:text-white lg:flex"
    >
      {{ $t('hero.scroll') }}
      <span class="relative h-16 w-px overflow-hidden bg-white/10">
        <span class="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-marea-500 to-transparent [animation:scan_2.4s_var(--ease-brand)_infinite]" />
      </span>
    </a>
  </section>
</template>
