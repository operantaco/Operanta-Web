<script setup lang="ts">
defineProps<{
  src: string
  poster: string
}>()

const reduced = useReducedMotion()
const video = useTemplateRef<HTMLVideoElement>('video')

watch([reduced, video], ([isReduced, el]) => {
  if (!el) return
  if (isReduced) el.pause()
  else el.play().catch(() => {})
})
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <img
      v-if="reduced"
      :src="poster"
      alt=""
      class="size-full object-cover"
    >
    <video
      v-else
      ref="video"
      class="size-full object-cover"
      :poster="poster"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
    >
      <source
        :src="src"
        type="video/mp4"
      >
    </video>
  </div>
</template>
