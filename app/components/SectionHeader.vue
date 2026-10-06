<script setup lang="ts">
withDefaults(defineProps<{
  kicker: string
  title: string
  lead?: string
  /** Light text for dark bands */
  inverted?: boolean
  center?: boolean
}>(), { lead: undefined, inverted: false, center: false })
</script>

<template>
  <header
    class="relative z-10 max-w-3xl"
    :class="center && 'mx-auto text-center'"
  >
    <p
      class="kicker mb-5 flex items-center gap-3"
      :class="[center && 'justify-center', inverted ? 'text-marea-400' : 'text-primary']"
      data-aos="fade-up"
    >
      <span
        class="h-px w-7 bg-current"
        aria-hidden="true"
      />
      {{ kicker }}
    </p>
    <h2
      class="text-4xl leading-[1.05] font-medium sm:text-5xl"
      :class="inverted ? 'text-white' : 'text-highlighted'"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {{ title }}<span class="text-marea-500">.</span>
    </h2>
    <p
      v-if="lead"
      class="mt-5 text-lg"
      :class="inverted ? 'text-white/70' : 'text-muted'"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {{ lead }}
    </p>
  </header>
</template>
