// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  extends: [
    './layers/tairo',
    './layers/tairo-layout-collapse',
  ],
  devtools: { enabled: false },
  pages: true,
  modules: ['@pinia/nuxt', "@nuxt/image", '@vueuse/nuxt'],
  pinia: {
    storesDirs: ['./stores/**', './components/**/stores', './views/**/stores'],
  },

  css: [
  ],

  tailwindcss: {
    // If you want to specify a custom config path
    configPath: '~/tailwind.config.ts',
  },
  ssr: false,

  app: {

    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/logo.svg', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: false },
        { href: 'https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap', rel: 'stylesheet' },
      ],
    }
  }
})