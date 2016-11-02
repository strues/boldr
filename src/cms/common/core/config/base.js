export default {
  host: process.env.HOST || 'localhost',
  port: process.env.SSR_PORT,
  boldr: {
    htmlAttributes: { lang: 'en_US' },
    title: 'Boldr',
    titleTemplate: '%s | Powered by Boldr',
    meta: [
      { name: 'charset', content: 'utf-8' },
      // This is important to signify your application is mobile responsive!
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Why shouldnt your CMS be a little Boldr?' },
      { name: 'theme-color', content: '#2b2b2b' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#00a9d9' }
    ]
  }
};
