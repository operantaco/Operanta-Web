export interface ParallaxInput {
  /** Element top relative to the viewport (getBoundingClientRect().top) */
  top: number
  height: number
  viewportHeight: number
  /** Positive moves with the scroll, negative against it */
  speed: number
  /** Absolute cap in px so layers never drift off-screen */
  max?: number
}

/**
 * Vertical offset in px for a parallax layer. It is 0 when the element is
 * centered in the viewport and grows linearly as it moves away.
 */
export function parallaxOffset({ top, height, viewportHeight, speed, max = 240 }: ParallaxInput): number {
  const distanceFromCenter = top + height / 2 - viewportHeight / 2
  const offset = distanceFromCenter * speed
  const capped = Math.max(-max, Math.min(max, offset))
  // `|| 0` turns -0 into 0
  return Math.round(capped * 10) / 10 || 0
}

/** 0 → 1 progress of an element crossing the viewport, clamped. */
export function scrollProgress(top: number, height: number, viewportHeight: number): number {
  const total = viewportHeight + height
  if (total <= 0) return 0
  return Math.max(0, Math.min(1, (viewportHeight - top) / total))
}
