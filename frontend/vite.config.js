import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "scalemaxxing",
  resolve: {
    alias: {
      '@lexer': path.resolve(__dirname, '../lexer'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
})
