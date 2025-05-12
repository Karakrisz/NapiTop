// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/app.scss'],
  ssr: true,

  app: {
    head: {
      title: 'Parti Birtok Rendezványház',
      htmlAttrs: {
        lang: 'hu',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Rendezvényhelyszín Makón – Parti Birtok: esküvők, születésnapok, céges események gyönyörű környezetben, a Maros-partján.',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { hid: 'robots', name: 'robots', content: 'index, follow' },
        {
          'http-equiv': 'Content-Security-Policy',
          content: `
            default-src 'self' https: data:;
            img-src 'self' https: http: data:;
            font-src 'self' https: data:;
            style-src 'self' https: 'unsafe-inline';
            script-src 'self' https: 'unsafe-inline' 'unsafe-eval';
          `,
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://www.alkuszom.info' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Oxanium:wght@200..800&display=swap" rel="stylesheet',
        },
      ],
    },
  },

  modules: [
    '@nuxt/image',
    '@nuxtjs/sitemap',
    [
      'nuxt-mail',
      {
        message: {
          to: 'web@alkuszom.info',
        },
        smtp: {
          host: 's56.tarhely.com',
          port: 587,
          auth: {
            user: 'web@alkuszom.info',
            pass: '#+SpM_HR~QCy',
          },
        },
      },
    ],
  ],

  site: {
    url: 'https://www.alkuszom.info',
    trailingSlash: true,
  },

  compatibilityDate: '2025-01-21',
})
