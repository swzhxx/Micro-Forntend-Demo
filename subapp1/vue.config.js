const { name } = require('./package.json')
module.exports = {
  configureWebpack: {
    devServer: {
      port: 9527,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
}
