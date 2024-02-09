// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_ID: process.env.NOTION_ID,
    NOTION_NAME: process.env.NOTION_NAME,
    NOTION_CREATED_AT: process.env.NOTION_CREATED_AT,
    NOTION_PHONE: process.env.NOTION_PHONE,
    NOTION_MESERO: process.env.NOTION_MESERO,
    NOTION_FIRSTQUESTION: process.env.NOTION_FIRSTQUESTION,
    NOTION_SECONDQUESTION: process.env.NOTION_SECONDQUESTION,
    NOTION_THIRDQUESTION: process.env.NOTION_THIRDQUESTION,
    NOTION_FOURTHQUESTION: process.env.NOTION_FOURTHQUESTION,
    NOTION_FIFTHQUESTION: process.env.NOTION_FIFTHQUESTION,
    NOTION_COMMENT: process.env.NOTION_COMMENT,
    NOTION_COMPLETE: process.env.NOTION_COMPLETE,
    SHEETMONKEY_API: process.env.SHEETMONKEY_API,
  },
  // devtools: { enabled: true },

  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],
  css: ['@/assets/css/tailwind.css'],

  app: {
    head: {
      title: 'Brunette Kitchen & Drinks',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
    },
    pageTransition: { name: 'up', mode: 'out-in' },
  },

  pinia: {
    autoImports: ['storeToRefs'],
  },

  imports: {
    dirs: ['stores'],
  },
});
