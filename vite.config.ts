import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Chapter data is bundled on purpose so the site works with no data requests.
  build: { chunkSizeWarningLimit: 800 },
})
