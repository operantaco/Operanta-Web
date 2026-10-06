import { describe, expect, it } from 'vitest'
import { buildWhatsAppUrl } from '../../shared/utils/whatsapp'
import { parallaxOffset, scrollProgress } from '../../shared/utils/parallax'

describe('buildWhatsAppUrl', () => {
  it('builds the Operanta link with the encoded message', () => {
    expect(buildWhatsAppUrl('+57 312 792 6312', 'Estoy interesada en los servicios de Operanta.'))
      .toBe('https://wa.me/573127926312?text=Estoy%20interesada%20en%20los%20servicios%20de%20Operanta.')
  })

  it('omits the text param when there is no message', () => {
    expect(buildWhatsAppUrl('573127926312', '')).toBe('https://wa.me/573127926312')
  })
})

describe('parallaxOffset', () => {
  const base = { height: 200, viewportHeight: 800 }

  it('is zero when the element is centered', () => {
    expect(parallaxOffset({ ...base, top: 300, speed: -0.3 })).toBe(0)
  })

  it('moves proportionally to the distance from the center', () => {
    expect(parallaxOffset({ ...base, top: 400, speed: -0.3 })).toBe(-30)
    expect(parallaxOffset({ ...base, top: 200, speed: 0.5 })).toBe(-50)
  })

  it('is capped by max', () => {
    expect(parallaxOffset({ ...base, top: 5000, speed: 1, max: 120 })).toBe(120)
  })
})

describe('scrollProgress', () => {
  it('goes from 0 below the viewport to 1 above it', () => {
    expect(scrollProgress(800, 200, 800)).toBe(0)
    expect(scrollProgress(300, 200, 800)).toBe(0.5)
    expect(scrollProgress(-500, 200, 800)).toBe(1)
  })
})
