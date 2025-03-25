import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isProd ? '/workout/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Workout App',
        short_name: 'Workout',
        start_url: isProd ? '/workout/' : '/',
        scope: isProd ? '/workout/' : '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: isProd ? '/workout/icon-192.png' : '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: isProd ? '/workout/icon-512.png' : '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })    
  ]
})
