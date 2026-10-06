<template>
  <section
    :id="SECTION_IDS.method"
    class="relative isolate overflow-hidden bg-tinta-900 py-24 text-white sm:py-32"
  >
    <BackgroundVideo
      src="/video/flow-loop.mp4"
      poster="/video/flow-loop.jpg"
      class="opacity-70"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-tinta-900 via-tinta-900/40 to-tinta-900" />

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        :kicker="$t('method.kicker')"
        :title="$t('method.consulting.title')"
        inverted
      />

      <ol class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(step, index) in CONSULTING_STEPS"
          :key="step"
          class="glass group relative rounded-md border border-white/12 !bg-tinta-900/60 p-7 transition-colors duration-500 hover:border-marea-500/60"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <span
            class="grid size-14 place-items-center rounded-full font-display text-xl font-semibold text-tinta-900"
            :class="index === CONSULTING_STEPS.length - 1 ? 'bg-ambar-500' : 'bg-marea-500'"
          >{{ index + 1 }}</span>
          <h3 class="mt-7 text-xl font-medium">
            {{ $t(`method.consulting.steps.${step}.title`) }}
          </h3>
          <p class="mt-2 text-white/70">
            {{ $t(`method.consulting.steps.${step}.body`) }}
          </p>
          <UIcon
            v-if="index < CONSULTING_STEPS.length - 1"
            name="i-lucide-chevron-right"
            class="absolute -right-4 top-11 hidden size-6 text-white/30 lg:block"
          />
        </li>
      </ol>
      <p
        class="mt-8 italic text-white/70"
        data-aos="fade-up"
      >
        {{ $t('method.consulting.note') }}
      </p>

      <div class="mt-24 border-t border-white/12 pt-16">
        <h3
          class="text-3xl font-medium sm:text-4xl"
          data-aos="fade-up"
        >
          {{ $t('method.training.title') }}<span class="text-ambar-500">.</span>
        </h3>
        <ol class="mt-10 grid gap-5 md:grid-cols-3">
          <li
            v-for="(step, index) in TRAINING_STEPS"
            :key="step"
            class="rounded-md border border-white/12 bg-white/[0.04] p-7 transition-transform duration-700 ease-[var(--ease-brand)] hover:-translate-y-1"
            data-aos="fade-up"
            :data-aos-delay="index * 150"
          >
            <div class="flex items-center justify-between">
              <span class="grid size-12 place-items-center rounded-full bg-ambar-500 font-display text-lg font-semibold text-tinta-900">{{ index + 1 }}</span>
              <span class="kicker text-white/40">0{{ index + 1 }} / 0{{ TRAINING_STEPS.length }}</span>
            </div>
            <h4 class="mt-6 text-xl font-medium">
              {{ $t(`method.training.steps.${step}.title`) }}
            </h4>
            <p class="mt-2 text-white/70">
              {{ $t(`method.training.steps.${step}.body`) }}
            </p>
          </li>
        </ol>
        <p
          class="mt-8 italic text-white/70"
          data-aos="fade-up"
        >
          {{ $t('method.training.note') }}
        </p>
      </div>
    </div>
  </section>
</template>
