const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
      proxy: {
        '/api': {
          target: 'https://api.coincap.io/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''   // 让请求的地址访问到实际的访问地址
          }
        },
        'dis': {
          target: 'http://www.zhiwen.life/',
          changeOrigin: true,
          pathRewrite: {
            '^/dis': ''   // 让请求的地址访问到实际的访问地址
          }
        }
      }
  }
})
