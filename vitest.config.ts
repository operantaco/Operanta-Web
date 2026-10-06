import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['tests/unit/**/*.test.ts'],
          environment: 'node'
        }
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['tests/nuxt/**/*.test.ts'],
          environment: 'nuxt',
          // Booting Nuxt with every module takes a while on the first run
          hookTimeout: 120_000,
          testTimeout: 30_000,
          environmentOptions: {
            nuxt: {
              domEnvironment: 'happy-dom',
              // The Supabase client plugin throws without a URL and would abort later plugins (i18n).
              // Tests never reach Supabase (constitution §10), so dummy values are enough.
              overrides: {
                runtimeConfig: {
                  public: { supabase: { url: 'http://localhost:54321', key: 'test-publishable-key' } }
                }
              }
            }
          }
        }
      })
    ]
  }
})
