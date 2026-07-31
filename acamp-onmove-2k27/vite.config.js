import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Adicione o link exato que o terminal pediu:
    allowedHosts: ['wearproof-joy-overstimulatively.ngrok-free.dev']
  }
})