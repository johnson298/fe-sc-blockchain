export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Creator Smart Contract',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/scss/styles.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/global-components' },
    { src: '@/plugins/mixin' },
    { src: '@/plugins/fragment' },
    { src: '@/plugins/directives' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['@nuxtjs/i18n', {
      locales: [{
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.js'
      },
        {
          code: 'vi',
          iso: 'vi-VN',
          name: 'Vietnamese',
          file: 'vi.js'
        }
      ],
      defaultLocale: 'en',
      langDir: 'lang/',
      lazy: true,
      vueI18nLoader: true,
      loadLanguagesAsync: true,
      strategy: 'no_prefix',
      silentTranslationWarn: true
    }]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
