<script setup lang="ts">
const pillars = [
  { id: 'process', icon: 'i-lucide-workflow' },
  { id: 'people', icon: 'i-lucide-graduation-cap' },
  { id: 'measure', icon: 'i-lucide-chart-no-axes-combined' }
] as const
</script>

<template>
  <section
    :id="SECTION_IDS.value"
    class="relative isolate overflow-hidden bg-tinta-900 py-24 text-white sm:py-36"
  >
    <BackgroundVideo
      src="/video/orbit-loop.mp4"
      poster="/video/orbit-loop.jpg"
      class="opacity-80 [mask-image:linear-gradient(90deg,transparent,#000_45%)]"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-tinta-900 via-tinta-900/85 to-transparent" />

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p
        class="kicker flex items-center gap-3 text-marea-400"
        data-aos="fade-up"
      >
        <span
          class="h-px w-7 bg-current"
          aria-hidden="true"
        />
        {{ $t('value.kicker') }}
      </p>
      <blockquote
        class="mt-8 max-w-4xl border-l-2 border-marea-500 pl-6 sm:pl-10"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <p class="font-display text-3xl leading-tight font-medium sm:text-5xl">
          {{ $t('value.statement') }}<span class="text-marea-500">.</span>
        </p>
        <footer class="mt-6 text-white/60">
          {{ $t('value.audience') }}
        </footer>
      </blockquote>

      <div class="mt-20 grid gap-5 md:grid-cols-3">
        <article
          v-for="(pillar, index) in pillars"
          :key="pillar.id"
          class="rounded-md border border-white/12 bg-tinta-900/60 p-7 backdrop-blur"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <UIcon
            :name="pillar.icon"
            class="size-7 text-marea-400"
          />
          <h3 class="mt-5 text-xl font-medium">
            {{ $t(`value.pillars.${pillar.id}.title`) }}
          </h3>
          <p class="mt-2 text-white/70">
            {{ $t(`value.pillars.${pillar.id}.body`) }}
          </p>
          <img
            v-if="pillar.id === 'measure'"
            src="/svg/kpi-before-after.svg"
            alt=""
            class="mt-6 w-full max-w-60 opacity-90"
          >
        </article>
      </div>
    </div>
  </section>
</template>
