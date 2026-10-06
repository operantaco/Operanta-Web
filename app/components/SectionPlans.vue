<template>
  <section
    :id="SECTION_IDS.plans"
    class="relative overflow-hidden bg-muted py-24 sm:py-32"
  >
    <ParallaxLayer
      :speed="-0.2"
      class="ghost-number absolute right-4 top-10 text-[9rem] text-highlighted sm:right-10 sm:text-[16rem]"
    >
      07
    </ParallaxLayer>
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        :kicker="$t('plans.kicker')"
        :title="$t('plans.title')"
        :lead="$t('plans.lead')"
      />

      <div class="mt-14 grid gap-6 lg:grid-cols-3">
        <article
          v-for="(plan, index) in PLANS"
          :key="plan.id"
          class="relative flex flex-col rounded-md border bg-default p-8 transition-transform duration-700 ease-[var(--ease-brand)] hover:-translate-y-1.5"
          :class="plan.featured ? 'border-marea-500 shadow-[0_30px_60px_-30px_rgb(18_176_168/0.55)] lg:-translate-y-3 lg:hover:-translate-y-4' : 'border-default'"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <p
            class="kicker"
            :class="plan.featured ? 'text-primary' : 'text-dimmed'"
          >
            <UIcon
              v-if="plan.featured"
              name="i-lucide-star"
              class="-mt-0.5 mr-1 size-3.5 align-middle"
            />
            {{ $t(`plans.items.${plan.id}.eyebrow`) }}
          </p>
          <h3 class="mt-4 text-3xl font-medium text-highlighted">
            {{ $t(`plans.items.${plan.id}.title`) }}
          </h3>
          <p class="kicker mt-2 text-primary">
            {{ $t(`plans.items.${plan.id}.model`) }}
          </p>
          <p class="mt-5 flex-1 text-muted">
            {{ $t(`plans.items.${plan.id}.body`) }}
          </p>
          <UButton
            :href="`#${SECTION_IDS.contact}`"
            :label="$t(`plans.items.${plan.id}.cta`)"
            trailing-icon="i-lucide-arrow-right"
            :variant="plan.featured ? 'solid' : 'link'"
            :color="plan.featured ? 'primary' : 'neutral'"
            class="mt-8 self-start"
            :class="!plan.featured && 'px-0 text-highlighted'"
          />
        </article>
      </div>
    </div>
  </section>
</template>
