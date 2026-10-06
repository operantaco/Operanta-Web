<script setup lang="ts">
const props = withDefaults(defineProps<{
  speed?: number
  rotate?: number
  max?: number
}>(), { speed: -0.15, rotate: 0, max: 240 })

const layer = useTemplateRef<HTMLElement>('layer')
const { style } = useParallax(() => layer.value?.parentElement, props.speed, { rotate: props.rotate, max: props.max })
</script>

<template>
  <div
    ref="layer"
    :style="style"
    aria-hidden="true"
    class="pointer-events-none"
  >
    <slot />
  </div>
</template>
