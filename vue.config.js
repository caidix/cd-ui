const path = require('path');

const config = {
  runtimeCompiler: true,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: config => {
    config.resolve.alias
      .set('~', path.resolve('packages'))
      .set('@', path.resolve('src'))
    config.module
      .rule('js')
      .include
        .add('/packages')
        .end()
      .use('label')
        .loader('babel-loader')
  }
}

module.exports = config;