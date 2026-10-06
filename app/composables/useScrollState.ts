/** Page scroll position, whether the header should be solid, and 0→1 page progress. */
export function useScrollState(solidAfter = 80) {
  const y = ref(0)
  const progress = ref(0)
  let frame = 0

  function update() {
    frame = 0
    y.value = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    update()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', schedule)
    if (frame) cancelAnimationFrame(frame)
  })

  const solid = computed(() => y.value > solidAfter)

  return { y, progress, solid }
}
