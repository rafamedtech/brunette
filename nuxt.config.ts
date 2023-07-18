// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/supabase', 'nuxt-icon'],
  css: ['@/assets/css/tailwind.css'],

  app: {
    head: {
      title: 'Brunette Kitchen & Drinks',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
    },
  },

  pinia: {
    autoImports: ['storeToRefs'],
  },

  imports: {
    dirs: ['stores'],
  },
});
