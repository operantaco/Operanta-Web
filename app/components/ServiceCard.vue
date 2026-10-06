<script setup lang="ts">
const props = defineProps<{
  id: string
  icon: string
  accent: 'marea' | 'ambar'
}>()

const list = useI18nList()
const fronts = computed(() => list(`services.items.${props.id}.fronts`))
const results = computed(() => list(`services.items.${props.id}.results`))
</script>

<template>
  <article class="service-card grid overflow-hidden rounded-md border border-default bg-default lg:grid-cols-[1fr_1.15fr_1.15fr]">
    <header
      class="relative p-7"
      :class="accent === 'marea' ? 'bg-marea-500/8' : 'bg-ambar-500/10'"
    >
      <span
        class="grid size-12 place-items-center rounded-full"
        :class="accent === 'marea' ? 'bg-marea-500 text-tinta-900' : 'bg-ambar-500 text-tinta-900'"
      >
        <UIcon
          :name="icon"
          class="size-6"
        />
      </span>
      <h3 class="mt-6 text-2xl font-medium text-highlighted">
        {{ $t(`services.items.${id}.title`) }}
      </h3>
      <p class="mt-3 text-muted">
        {{ $t(`services.items.${id}.summary`) }}
      </p>
    </header>
    <div class="border-t border-default p-7 lg:border-l lg:border-t-0">
      <p class="kicker text-dimmed">
        {{ $t('services.fronts') }}*
      </p>
      <ul class="mt-4 space-y-2.5">
        <li
          v-for="front in fronts"
          :key="front"
          class="flex gap-3 text-default"
        >
          <span
            class="mt-2.5 size-1.5 shrink-0 rounded-full"
            :class="accent === 'marea' ? 'bg-marea-500' : 'bg-ambar-500'"
          />
          {{ front }}
        </li>
      </ul>
    </div>
    <div class="border-t border-default p-7 lg:border-l lg:border-t-0">
      <p class="kicker text-dimmed">
        {{ $t('services.results') }}
      </p>
      <ul class="mt-4 space-y-2.5">
        <li
          v-for="result in results"
          :key="result"
          class="flex gap-3 text-default"
        >
          <UIcon
            name="i-lucide-check"
            class="mt-1 size-4 shrink-0 text-primary"
          />
          {{ result }}
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.service-card {
  animation: card-in 0.9s var(--ease-brand) both;
}

@keyframes card-in {
  from { opacity: 0; transform: translateY(24px); }
}
</style>
