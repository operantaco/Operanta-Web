<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const { t } = useI18n()

const tabs = computed<TabsItem[]>(() => [
  { label: t('services.tabs.operations'), value: 'operations', slot: 'operations' as const, icon: 'i-lucide-settings-2' },
  { label: t('services.tabs.talent'), value: 'talent', slot: 'talent' as const, icon: 'i-lucide-users-round' }
])
</script>

<template>
  <section
    :id="SECTION_IDS.services"
    class="relative overflow-hidden py-24 sm:py-32"
  >
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
        <SectionHeader
          :kicker="$t('services.kicker')"
          :title="$t('services.title')"
          :lead="$t('services.lead')"
        />
        <div
          class="hidden grid-cols-2 gap-4 lg:grid"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <img
            src="/svg/service-operations.svg"
            alt=""
            class="rounded-2xl ring-1 ring-tinta-200/60"
          >
          <img
            src="/svg/service-talent.svg"
            alt=""
            class="rounded-2xl ring-1 ring-tinta-200/60"
          >
        </div>
      </div>

      <UTabs
        :items="tabs"
        default-value="operations"
        variant="pill"
        size="lg"
        class="mt-14"
        :ui="{ list: 'max-w-md', trigger: 'font-display' }"
        data-aos="fade-up"
      >
        <template #operations>
          <div class="mt-8 space-y-6">
            <ServiceCard
              v-for="item in SERVICE_GROUPS.operations"
              :id="item.id"
              :key="item.id"
              :icon="item.icon"
              accent="marea"
            />
          </div>
        </template>
        <template #talent>
          <div class="mt-8 space-y-6">
            <ServiceCard
              v-for="item in SERVICE_GROUPS.talent"
              :id="item.id"
              :key="item.id"
              :icon="item.icon"
              accent="ambar"
            />
          </div>
        </template>
      </UTabs>

      <p class="mt-6 text-sm italic text-muted">
        * {{ $t('services.footnote') }}
      </p>
    </div>
  </section>
</template>
