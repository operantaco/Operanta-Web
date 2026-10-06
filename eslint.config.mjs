// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // Vendored agent skills are not part of the app
  ignores: ['.agents/**', '.claude/**']
})
