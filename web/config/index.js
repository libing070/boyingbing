'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const HOST_PRODUCTION = "http://jeep.bitsmart.com.cn/";
const HOST_DEV = "http://172.20.207.44:8080";
// let host = HOST_DEV;
let host = HOST_PRODUCTION;
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    //assetsPublicPath: './',//测试
    assetsPublicPath: '/',//本地
    proxyTable: {
      "**/login": {
        target: host,
        changeOrigin: true
      },
      "**/checkLogin": {
        target: host,
        changeOrigin: true
      },
      "/mail": {
        target: host,
        changeOrigin: true
      },
      "/car/brand": {
        target: host,
        changeOrigin: true
      },
      "/car/series": {
        target: host,
        changeOrigin: true
      },
      "/car/year": {
        target: host,
        changeOrigin: true
      },
      "/cross/media": {
        target: host,
        changeOrigin: true
      },
      "/praise/compet": {
        target: host,
        changeOrigin: true
      },
      "/sound/day": {
        target: host,
        changeOrigin: true
      },
      "/sound/all": {
        target: host,
        changeOrigin: true
      },
      "/praise/day": {
        target: host,
        changeOrigin: true
      },
      "/praise/emotion": {
        target: host,
        changeOrigin: true
      },
      "/praise/opinions": {
        target: host,
        changeOrigin: true
      },
      "/praise/first": {
        target: host,
        changeOrigin: true
      },
      "/praise/second": {
        target: host,
        changeOrigin: true
      },
      "/praise/third": {
        target: host,
        changeOrigin: true
      }
    },

    // Various Dev Server settings
    //host:'192.168.1.182',
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
