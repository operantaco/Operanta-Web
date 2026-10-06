/** Tracks the `prefers-reduced-motion` media query. False during SSR. */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
