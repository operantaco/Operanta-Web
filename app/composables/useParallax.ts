import type { MaybeRefOrGetter } from 'vue'
import { parallaxOffset } from '#shared/utils/parallax'

export interface ParallaxOptions {
  /** Degrees of rotation per px of distance from the viewport center */
  rotate?: number
  max?: number
}

/**
 * Scroll-driven translate/rotate for a decorative layer. `measure` is the
 * element whose position drives the effect (usually the layer's container,
 * so the transform does not feed back into the measurement).
 * Stays static when the user prefers reduced motion.
 */
export function useParallax(measure: MaybeRefOrGetter<HTMLElement | null | undefined>, speed: number, options: ParallaxOptions = {}) {
  const reduced = useReducedMotion()
  const offset = ref(0)
  const rotation = ref(0)
  let frame = 0

  function update() {
    frame = 0
    const el = toValue(measure)
    if (!el || reduced.value) return
    const rect = el.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    offset.value = parallaxOffset({ top: rect.top, height: rect.height, viewportHeight, speed, max: options.max })
    if (options.rotate) {
      const distance = rect.top + rect.height / 2 - viewportHeight / 2
      rotation.value = Math.round(distance * options.rotate * 100) / 100
    }
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    schedule()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    if (frame) cancelAnimationFrame(frame)
  })

  watch(reduced, (isReduced) => {
    if (isReduced) {
      offset.value = 0
      rotation.value = 0
    }
  })

  const style = computed(() => ({
    transform: `translate3d(0, ${offset.value}px, 0) rotate(${rotation.value}deg)`,
    willChange: 'transform'
  }))

  return { offset, rotation, style }
}
