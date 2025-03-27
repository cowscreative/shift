import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? '/cactus/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Cactus',
        short_name: 'Cactus',
        start_url: isProd ? '/cactus/' : '/',
        scope: isProd ? '/cactus/' : '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#B9EF44',
        icons: [
          {
            src: isProd ? '/cactus/icon-192.png' : '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: isProd ? '/cactus/icon-512.png' : '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
