<script setup lang="ts">
const reduced = useReducedMotion()
const pointer = reactive({ x: 0, y: 0 })

function onPointerMove(event: PointerEvent) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = (event.clientY / window.innerHeight) * 2 - 1
}

onMounted(() => window.addEventListener('pointermove', onPointerMove, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('pointermove', onPointerMove))
</script>

<template>
  <div aria-hidden="true">
    <TresCanvas
      :alpha="true"
      :clear-alpha="0"
      :antialias="true"
      :dpr="[1, 2]"
    >
      <TresPerspectiveCamera
        :position="[0, 0, 9.5]"
        :fov="40"
      />
      <TresAmbientLight :intensity="0.9" />
      <TresDirectionalLight
        :position="[4, 5, 6]"
        :intensity="2.2"
      />
      <TresPointLight
        :position="[-3, -2, 3]"
        color="#12B0A8"
        :intensity="12"
      />
      <HeroRing
        :pointer="pointer"
        :animate="!reduced"
      />
    </TresCanvas>
  </div>
</template>
