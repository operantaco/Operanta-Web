<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import type { Group } from 'three'

const props = defineProps<{
  pointer: { x: number, y: number }
  animate: boolean
}>()

const TAU = Math.PI * 2
const RADIUS = 2
const TUBE = 0.17
const ARC = TAU * 0.44
const AMBER_START = TAU * (100 / 360)
const MAREA_START = TAU * (280 / 360)

/** Round caps: spheres at both ends of each arc, like the stroked logo. */
const caps = [
  { color: '#F4A340', angle: AMBER_START },
  { color: '#F4A340', angle: AMBER_START + ARC },
  { color: '#12B0A8', angle: MAREA_START },
  { color: '#12B0A8', angle: MAREA_START + ARC }
].map(cap => ({ ...cap, position: [Math.cos(cap.angle) * RADIUS, Math.sin(cap.angle) * RADIUS, 0] as [number, number, number] }))

const ring = shallowRef<Group>()
const orbit = shallowRef<Group>()
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (ring.value) {
    if (props.animate) ring.value.rotation.z -= delta * 0.16
    ring.value.rotation.x += (props.pointer.y * 0.4 - ring.value.rotation.x) * 0.035
    ring.value.rotation.y += (props.pointer.x * 0.5 - ring.value.rotation.y) * 0.035
  }
  if (orbit.value && props.animate) orbit.value.rotation.z += delta * 0.32
})
</script>

<template>
  <TresGroup
    ref="ring"
    :rotation="[0.35, -0.45, 0]"
  >
    <TresMesh :rotation="[0, 0, AMBER_START]">
      <TresTorusGeometry :args="[RADIUS, TUBE, 32, 180, ARC]" />
      <TresMeshStandardMaterial
        color="#F4A340"
        emissive="#F4A340"
        :emissive-intensity="0.18"
        :roughness="0.32"
        :metalness="0.15"
      />
    </TresMesh>
    <TresMesh :rotation="[0, 0, MAREA_START]">
      <TresTorusGeometry :args="[RADIUS, TUBE, 32, 180, ARC]" />
      <TresMeshStandardMaterial
        color="#12B0A8"
        emissive="#12B0A8"
        :emissive-intensity="0.2"
        :roughness="0.32"
        :metalness="0.15"
      />
    </TresMesh>
    <TresMesh
      v-for="(cap, index) in caps"
      :key="index"
      :position="cap.position"
    >
      <TresSphereGeometry :args="[TUBE, 24, 24]" />
      <TresMeshStandardMaterial
        :color="cap.color"
        :emissive="cap.color"
        :emissive-intensity="0.18"
        :roughness="0.32"
      />
    </TresMesh>

    <TresMesh>
      <TresTorusGeometry :args="[2.9, 0.008, 8, 240]" />
      <TresMeshBasicMaterial
        color="#FFFFFF"
        :transparent="true"
        :opacity="0.18"
      />
    </TresMesh>
    <TresMesh>
      <TresTorusGeometry :args="[1.35, 0.006, 8, 200]" />
      <TresMeshBasicMaterial
        color="#12B0A8"
        :transparent="true"
        :opacity="0.35"
      />
    </TresMesh>

    <TresGroup ref="orbit">
      <TresMesh :position="[2.9, 0, 0]">
        <TresSphereGeometry :args="[0.07, 16, 16]" />
        <TresMeshBasicMaterial color="#12B0A8" />
      </TresMesh>
      <TresMesh :position="[-1.35, 0, 0]">
        <TresSphereGeometry :args="[0.05, 16, 16]" />
        <TresMeshBasicMaterial color="#F4A340" />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
