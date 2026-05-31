import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   host: '0.0.0.0',
  //   port: process.env.PORT ? Number(process.env.PORT) : 5173,
  //   allowedHosts: ['report-management-system-software-ui.onrender.com'],
  // },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
