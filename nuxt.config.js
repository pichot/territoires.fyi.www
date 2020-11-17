import { GraphQLClient, gql } from 'graphql-request'

export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  publicRuntimeConfig: {
    searchUrl: process.env.SEARCH_URL || 'http://localhost:7700',
    searchKey: process.env.SEARCH_KEY || null
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */

  head: {
    titleTemplate: '%s - territoires.fyi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'le moteur de recherche des territoires' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        skip: process.env.NODE_ENV === 'development',
        "data-website-id": "b80eddf6-1d5d-4729-9611-788dec60d92d", 
        src: "https://stats.territoires.fyi/umami.js",
        async: true,
        defer: true
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/meilisearch.js',
    '~/plugins/numerals.client.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Roboto: true,
      Poppins: true
    }
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'nuxt-graphql-request'
  ],

  graphql: {
    /**
     * Your GraphQL endpoint (required)
     */
    endpoint: process.env.API_URL || 'http://localhost:8080/v1/graphql',

    /**
     * Options
     * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
     */
    options: {},

    /**
     * Optional
     * default: true (this includes cross-fetch/polyfill before creating the graphql client)
     */
    useFetchPolyfill: true,

    /**
     * Optional
     * default: false (this includes graphql-tag for node_modules folder)
     */
    includeNodeModules: true,
  },

  axios: {
    // proxyHeaders: false
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  generate: {
    routes: async function () {
      const uri = process.env.API_URL || 'http://localhost:8080/v1/graphql'
      const graphQLClient = new GraphQLClient(uri)

      const sampleDataQuery = gql`
        {
          communes(limit: 5) {
            insee_com
          }
          regions(limit: 5) {
            insee_reg
          }
          departements(limit: 5) {
            insee_dep
          }
          epcis(limit: 5) {
            code_epci
          }
        }
      `

      const query = gql`
      {
        communes {
          insee_com
        }
        regions {
          insee_reg
        }
        departements {
          insee_dep
        }
        epcis {
          code_epci
        }
      }`

      const data = await graphQLClient.request(!!process.env.SAMPLE_DATA ? sampleDataQuery : query)

      const routes = []

      routes.push(data.regions.map(c => `region/${c.insee_reg}`))
      routes.push(data.departements.map(c => `departement/${c.insee_dep}`))
      routes.push(data.communes.map(c => `commune/${c.insee_com}`))
      routes.push(data.epcis.map(c => `epci/${c.code_epci}`))

      return routes.flat()
    }.bind(this)
  }
}
