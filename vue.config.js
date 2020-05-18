const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

// 拼接路径
const resolve = (dir) => require('path').join(__dirname, dir)

let DOMAIN = 'https://v2.ocheng.me'
// let DOMAIN = 'https://stage.ocheng.me' 
// let DOMAIN = 'https://scrm.ocheng.me'   
process.env.VUE_APP_BASETYPE = 'v2 baseUrl = ' + DOMAIN
// 基础路径
let publicPath = '/oc-cloud-ui-web-new/'
process.env.VUE_APP_NODE_SHOWTYPE = '1'
if (process.env.NODE_ENV == 'development') {
  process.env.VUE_APP_NODE_SHOWTYPE = '1'
  DOMAIN = 'https://v2.ocheng.me'
  process.env.VUE_APP_BASETYPE = 'stage baseUrl = ' + DOMAIN
} else if (process.env.NODE_ENV == 'v2') {
} else if (process.env.NODE_ENV == 'stage') {
  process.env.VUE_APP_NODE_SHOWTYPE = '1'
  DOMAIN = 'https://stage.ocheng.me'
  process.env.VUE_APP_BASETYPE = 'stage baseUrl = ' + DOMAIN
} else if (process.env.NODE_ENV == 'scrm') {
  process.env.VUE_APP_NODE_SHOWTYPE = '1'
  DOMAIN = 'https://scrm.ocheng.me/v2'
  publicPath = '/v3/'
  process.env.VUE_APP_BASETYPE = 'scrm baseUrl = ' + DOMAIN
}
// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')
// 本地开发情况下展示
// process.env.VUE_APP_NODE_SHOWTYPE=1
process.env.VUE_APP_BASEURL = DOMAIN

const configureSetWebpack = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
    }),
  ],
  resolve: {
    alias: {
      '@assets': '@/assets',
      '@img': '@/assets/img',
      '@less': '@/assets/less',
      '@components': '@/components',
      '@views': '@/views',
      '@utils': '@/utils',
      '@api': '@/api',
    },
  },
}

if (process.env.NODE_ENV === 'stage' || process.env.NODE_ENV === 'scrm') {
  configureSetWebpack.plugins = [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true, // console
          drop_debugger: false,
          pure_funcs: ['console.log'], // 移除console
        },
      },
      sourceMap: false,
      parallel: true,
    }),
  ]
}

module.exports = {
  publicPath: publicPath,
  lintOnSave: false,
  configureWebpack: configureSetWebpack,
  devServer: {
    publicPath,
    proxy: {
      '/api': {
        target: DOMAIN,
        // target: 'http://v2.ocheng.me', // 后端接口地址
        changeOrigin: true, // 是否允许跨越,
        ws: false,
        pathRewrite: {
          '^/api': '/api', // 重写,
        },
      },
    },
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: `@import '~@/assets/style/public.scss';`,
      },
    },
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: (config) => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch').delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true)
    config.devtool('cheap-source-map')
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve('src/assets/svg-icons/icons'))
      .end()
    // node
    config.node.set('__dirname', true).set('__filename', true)
  },
}
