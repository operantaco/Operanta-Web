<script setup lang="ts">
const list = useI18nList()
</script>

<template>
  <section
    :id="SECTION_IDS.audience"
    class="relative overflow-hidden py-24 sm:py-32"
  >
    <div class="dot-grid absolute inset-0 text-highlighted opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        :kicker="$t('audience.kicker')"
        :title="$t('audience.title')"
        :lead="$t('audience.lead')"
      />

      <div class="mt-14 grid gap-6 md:grid-cols-3">
        <article
          v-for="(segment, index) in AUDIENCE_SEGMENTS"
          :key="segment.id"
          class="group flex flex-col rounded-md border border-default bg-default/90 p-8 backdrop-blur transition-[transform,border-color] duration-700 ease-[var(--ease-brand)] hover:-translate-y-1.5 hover:border-marea-500/50"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <span class="grid size-12 place-items-center rounded-full bg-tinta-900 text-marea-400 dark:bg-white/10">
            <UIcon
              :name="segment.icon"
              class="size-6"
            />
          </span>
          <h3 class="mt-6 text-2xl font-medium text-highlighted">
            {{ $t(`audience.segments.${segment.id}.title`) }}
          </h3>
          <p class="kicker mt-2 text-dimmed">
            {{ $t(`audience.segments.${segment.id}.subtitle`) }}
          </p>
          <ul class="mt-6 space-y-3 border-t border-default pt-6">
            <li
              v-for="expectation in list(`audience.segments.${segment.id}.expects`)"
              :key="expectation"
              class="flex gap-3"
            >
              <UIcon
                name="i-lucide-arrow-up-right"
                class="mt-1 size-4 shrink-0 text-primary"
              />
              <span class="text-default">{{ expectation }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
