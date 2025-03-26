import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? '/shift/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Shift',
        short_name: 'Shift',
        start_url: isProd ? '/shift/' : '/',
        scope: isProd ? '/shift/' : '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#FF5480',
        icons: [
          {
            src: isProd ? '/shift/icon-192.png' : '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: isProd ? '/shift/icon-512.png' : '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
