<template>
  <section
    :id="SECTION_IDS.plans"
    class="relative overflow-hidden bg-muted py-24 sm:py-32"
  >
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
          class="relative flex flex-col rounded-md border border-default bg-default p-8 transition-transform duration-700 ease-[var(--ease-brand)] hover:-translate-y-1.5"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <h3 class="text-3xl font-medium text-highlighted">
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
            :label="$t('plans.cta')"
            trailing-icon="i-lucide-arrow-right"
            variant="solid"
            color="primary"
            class="mt-8 self-start"
          />
        </article>
      </div>
    </div>
  </section>
</template>
