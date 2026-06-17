import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'rv-design': resolve(__dirname, 'node_modules/rv-design/src/index.ts'),
    },
  },
})
