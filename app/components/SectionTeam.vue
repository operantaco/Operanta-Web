<template>
  <section
    :id="SECTION_IDS.team"
    class="relative overflow-hidden py-24 sm:py-32"
  >
    <ParallaxLayer
      :speed="0.25"
      :rotate="-0.03"
      class="absolute -left-40 top-20 w-[520px] opacity-15 dark:opacity-25"
    >
      <img
        src="/svg/arc-duo.svg"
        alt=""
        class="w-full"
      >
    </ParallaxLayer>
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        :kicker="$t('team.kicker')"
        :title="$t('team.title')"
      />

      <div class="mt-14 grid gap-6 md:grid-cols-2">
        <article
          v-for="(member, index) in TEAM"
          :key="member.id"
          class="group relative rounded-md border border-default bg-default p-8 transition-transform duration-700 ease-[var(--ease-brand)] hover:-translate-y-1.5"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <div class="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div class="relative size-32 shrink-0">
              <span class="absolute -inset-1.5 rounded-full border border-dashed border-marea-500/60 transition-transform duration-[2s] group-hover:rotate-90" />
              <NuxtImg
                :src="member.photo"
                :alt="$t(`team.members.${member.id}.name`)"
                width="256"
                height="256"
                fit="cover"
                loading="lazy"
                class="size-32 rounded-full bg-gradient-to-b from-marea-100 to-marea-200 object-cover object-top dark:from-tinta-700 dark:to-tinta-800"
              />
            </div>
            <div>
              <h3 class="text-2xl font-medium text-highlighted">
                {{ $t(`team.members.${member.id}.name`) }}
              </h3>
              <p class="kicker mt-2 text-primary">
                {{ $t('team.role') }}
              </p>
            </div>
          </div>
          <p class="mt-6 text-default">
            {{ $t(`team.members.${member.id}.bio`) }}
          </p>
        </article>
      </div>
      <p
        class="mt-8 text-sm text-muted"
        data-aos="fade-up"
      >
        {{ $t('team.footnote') }}
      </p>
    </div>
  </section>
</template>
