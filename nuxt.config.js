export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'PressFeed',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: {
    color: '#00c58e',
    height: '10px'
  },
  env: {
    serverUrl: process.env.SERVER_URL || 'http://localhost:5000'
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/vue-infinite-loading.js', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: {
    dirs: [
      '~/components'
    ]
  },
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/vuetify'
  ],

  serverMiddleware: {
    '/api': '~/api'
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
};
