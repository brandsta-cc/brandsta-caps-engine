import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-20',
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})