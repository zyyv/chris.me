const { resolve } = require('path')
const pathResolve = src => resolve(__dirname, src)
const pathName = '/blog'

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:1324',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = `Chris's Blog`
      return args
    })
  },
  outputDir: pathResolve(`../build${pathName}`),
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false
}
