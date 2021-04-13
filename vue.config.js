let proxyObj = {};

proxyObj['/'] = {
  ws: false,
  target: 'http://127.0.0.1:8081',
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}


module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network':'@/network',
        'utils':'@/utils'
      }
    }
  },
  devServer: {
    host: 'localhost',
    open:true,
    port: 8080,
    proxy: proxyObj
  }
 }

