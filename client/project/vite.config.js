import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,     // expose to local network (0.0.0.0)
    port: 5173,     // you can change this if needed
  },
})
