const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:7072,//端口号
    proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log('代理请求:', req.url, '->', proxyReq.path);
    }
  }
},//防抖
    client: {
      overlay: false
    },
  }
})
