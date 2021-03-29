export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Liga ZSE 2020',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],

  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/bootstrap.min.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '~/plugins/compConfig.js'
    },
    {
      src: '~/plugins/bracket.js',
      mode: 'client'
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt'
  ],
  
  bootstrapVue : {
    bootstrapCSS: false,
    icons: true
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // baseURL: 'https://turniej.zse.gda.pl:2137/api'
    baseURL: 'http://localhost:2137/api'
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  auth: {
    scopeKey: 'scope',
    strategies: {
      local: {
        token: {
          property: 'data.token'
        },
        user: {
          property: 'data.user'
        },
        endpoints: {
          login: {
            url: '/user/login',
            method: 'post'
          },
          user: {
            url: '/user',
            method: 'post'
          },
          logout: false
        },
        scope: true
      }
    },
    redirect: {
      login: '/user/login',
      logout: '/',
      home: '/'
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
    optimization: {
      minimize: true
    },
    extend(config, ctx) {
      // Niech się ESLint sam ogarnia bo mnie wkurwia
      // Snipppet z neta
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  },
  loading: {
    color: '#26496e',
    height: '10px',
    duration: 4500
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
}
