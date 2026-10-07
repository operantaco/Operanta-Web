<script setup lang="ts">
const items = [
  { id: 'people', number: '1', badge: 'bg-ambar-500 text-tinta-900', bar: 'bg-ambar-500' },
  { id: 'process', number: '2', badge: 'bg-marea-500 text-tinta-900', bar: 'bg-marea-500' },
  { id: 'gap', number: '3', badge: 'bg-tinta-900 text-white ring-1 ring-white/15', bar: 'bg-tinta-900 dark:bg-white' }
] as const
</script>

<template>
  <section
    :id="SECTION_IDS.problem"
    class="relative overflow-hidden bg-muted py-24 sm:py-32"
  >
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        :kicker="$t('problem.kicker')"
        :title="$t('problem.title')"
      />

      <div class="mt-14 grid gap-6 md:grid-cols-3">
        <article
          v-for="(item, index) in items"
          :key="item.id"
          class="group relative overflow-hidden rounded-md border border-default bg-default p-8 transition-transform duration-700 ease-[var(--ease-brand)] hover:-translate-y-1.5"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <span
            class="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
            :class="item.bar"
          />
          <span
            class="grid size-14 place-items-center rounded-full font-display text-xl font-semibold"
            :class="item.badge"
          >
            {{ item.number }}
          </span>
          <h3 class="mt-8 text-2xl font-medium text-highlighted">
            {{ $t(`problem.items.${item.id}.title`) }}
          </h3>
          <p class="mt-3 text-muted">
            {{ $t(`problem.items.${item.id}.body`) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
