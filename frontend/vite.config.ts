import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'nextcloud-server',         
      'nextcloud-server.local',    
      '100.109.71.28'
    ]
  }
})
