/** Reactive `window.matchMedia`. False during SSR and before mount. */
export function useMediaQuery(query: string) {
  const matches = ref(false)
  let list: MediaQueryList | undefined

  function onChange(event: MediaQueryListEvent) {
    matches.value = event.matches
  }

  onMounted(() => {
    list = window.matchMedia(query)
    matches.value = list.matches
    list.addEventListener('change', onChange)
  })

  onBeforeUnmount(() => list?.removeEventListener('change', onChange))

  return matches
}
