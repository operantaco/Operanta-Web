import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'

function withSetup<T>(composable: () => T) {
  let result!: T
  const Host = defineComponent({
    setup() {
      result = composable()
      return () => h('div')
    }
  })
  return { mount: () => mountSuspended(Host), get: () => result }
}

describe('useWhatsApp', () => {
  it('links to Operanta with the spanish message by default', async () => {
    const host = withSetup(() => useWhatsApp())
    await host.mount()
    expect(host.get().value).toBe('https://wa.me/573127926312?text=Estoy%20interesada%20en%20los%20servicios%20de%20Operanta.')
  })
})

describe('useContactForm', () => {
  it('translates validation errors and reports one per field', async () => {
    const host = withSetup(() => useContactForm())
    await host.mount()
    const errors = host.get().validate({ name: '', email: 'bad', phone: '' })
    expect(errors).toEqual([
      { name: 'name', message: 'Este campo es obligatorio.' },
      { name: 'phone', message: 'Este campo es obligatorio.' },
      { name: 'email', message: 'Escriba un correo válido.' }
    ])
  })

  it('posts the form, marks it as sent and clears the state', async () => {
    const handler = vi.fn(() => ({ ok: true }))
    registerEndpoint('/api/contact', { method: 'POST', handler })

    const host = withSetup(() => useContactForm())
    await host.mount()
    const form = host.get()
    Object.assign(form.state, { name: 'Clara', email: 'clara@empresa.com', phone: '3127926312' })

    await form.submit()

    expect(handler).toHaveBeenCalledOnce()
    expect(form.status.value).toBe('sent')
    expect(form.state.name).toBe('')
  })

  it('marks the form as failed when the API errors', async () => {
    registerEndpoint('/api/contact', {
      method: 'POST',
      handler: () => {
        throw createError({ statusCode: 503 })
      }
    })
    const host = withSetup(() => useContactForm())
    await host.mount()
    await host.get().submit()
    expect(host.get().status.value).toBe('error')
  })
})
