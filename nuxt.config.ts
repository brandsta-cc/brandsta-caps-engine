import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  // 1. Core Engine Configuration
  compatibilityDate: '2026-08-20',
  devtools: { enabled: false },

  // 2. Styling & Vite Plugins
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  // 3. Engine SEO, Meta & PWA Configuration
  app: {
    baseURL: '/',
    buildAssetsDir: 'assets',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Hotel CAPS Data Engine - Brandsta',
      
      htmlAttrs: {
        lang: 'en'
      },
      
      meta: [
        { name: 'description', content: 'Secure headless data engine for Hotel CAPS managed by Brandsta Interactive.' },
        
        // CRITICAL: Prevents search engines from indexing this private tool
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'author', content: 'kriz - https://brandsta.in' },

        // Geographic Coordinates
        { name: 'geo.region', content: 'IN-KL' },
        { name: 'geo.placename', content: 'Koduvayur, Palakkad' },
        { name: 'geo.position', content: '10.680926464534636;76.65040838503162' }, 
        { name: 'ICBM', content: '10.680926464534636, 76.65040838503162' },

        // Global Social Layout Standards
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_IN' },
        { property: 'og:site_name', content: 'CAPS Data Engine' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'twitter:card', content: 'summary_large_image' },

        // Windows PWA & Mobile Meta Tags (Updated to your dark theme hex)
        { name: 'msapplication-TileColor', content: '#030712' },
        { name: 'msapplication-TileImage', content: '/images/favicons/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#030712' },
        { name: 'msapplication-config', content: 'browserconfig.xml' },

        // Apple Safari Device Customizations
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'CAPS Engine' }
      ],

      link: [
        // Apple Icons
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/images/favicons/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/images/favicons/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/images/favicons/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/images/favicons/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/images/favicons/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/favicons/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/images/favicons/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/images/favicons/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicons/apple-icon-180x180.png' },
        { rel: 'apple-touch-icon', sizes: '167x167', href: '/images/favicons/apple-icon.png' },
        { rel: 'apple-touch-icon', sizes: '190x190', href: '/images/favicons/apple-icon-precomposed.png' },
        // Standard Favicons
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/images/favicons/android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/images/favicons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicons/favicon-16x16.png' },
        // Cache-Busted Web Manifest Path
        { rel: 'manifest', crossorigin: 'use-credentials', href: 'manifest.json' }
      ]
    }
  }
})