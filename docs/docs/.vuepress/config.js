module.exports = {
  title: 'ConerstoneApi',
  description: 'ConerstoneApi',
  head: [
    [
      'link',
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon.png' }
    ],
    ['link', { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    [
      'link',
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
    ],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    [
      'script',
      { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#da532c' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    docsDir: 'docs',
    editLinks: true,
    nav: [
      {
        text: '案例',
        items: [
          { text: '案例1', link: 'http://localhost:8585' },
          { text: '案例2', link: 'http://localhost:8585' }
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'Cornerstone', link: '/components/cornerstone/' },
          { text: 'CornerstoneTools', link: '/components/cornerstoneTools/' }
        ]
      },
      {
        text: '相关文档',
        items: [
          { text: '文档1', link: '1' },
          { text: '文档2', link: '2' }
        ]
      }
    ],
    sidebar: {
      '/components/cornerstone/': [
        {
          title: '开发指南',
          collapsable: false,
          children: [
            '/components/cornerstone/cornerstone',
            '/components/cornerstone/API',
            '/components/cornerstone/liveExample',
            '/components/cornerstone/github'
          ]
        }
      ],
      '/components/cornerstoneTools/': [
        {
          title: '开发指南',
          collapsable: false,
          children: ['/components/cornerstoneTools/cornerstoneTools']
        }
        // {
        //   title: '组件',
        //   collapsable: false,
        //   children: ['/components/cornerstoneTools/cornerstoneTools']
        // }
      ]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@packages': './packages'
      }
    }
  },

  plugins: ['demo-block'],
  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require('markdown-it-vuese'), {})
    }
  }
}
