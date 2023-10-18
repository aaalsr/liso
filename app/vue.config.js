const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 项目打包时map文件删掉
  productionSourceMap: false,
  // 关闭eslint校验
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.js'
    }
  },
  devServer: {
    hot: true,
    open: true,
    port: 9222,
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' }
      }
    }
   }
})
