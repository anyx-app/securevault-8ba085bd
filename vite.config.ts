import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: 'resolve-api-shared-js',
      resolveId(source) {
        if (source.includes('/shared/') && source.endsWith('.js')) {
          // Allow resolving .js imports to .ts files in shared folder
          // This bridges the gap between Vercel (needs .js) and Vite (needs .ts)
          return source.replace('.js', '.ts');
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['@tests/**/*.test.ts'],
    globals: true,
    testTimeout: 30000,
    coverage: {
      provider: 'v8',
    },
  },
}) 