import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
      },
      manifest: {
        name: 'Comuna 4.0 — Mapa Vecinal',
        short_name: 'Comuna 4.0',
        description:
          'Recorremos las plazas de La Boca, Barracas, Parque Patricios y Nueva Pompeya. Escuchamos a los vecinos y llevamos sus voces a la Legislatura porteña.',
        theme_color: '#1c1917',
        background_color: '#f5ede0',
        display: 'standalone',
        start_url: '/',
        lang: 'es-AR',
        categories: ['news', 'social', 'government'],
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
