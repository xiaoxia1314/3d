const isProduction = process.env.NODE_ENV === 'production'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  // publicPath: '/',
  configureWebpack: config => {
    config.entry = ['babel-polyfill', './src/main.js']
    if (isProduction) {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    }
  }
  // devServer: {
  //     proxy: {
  //         '^/app': {
  //             target: 'http://127.0.0.1:7777',
  //             changeOrigin: true,
  //             ws: false,
  //         }
  //     }
  // }

}
