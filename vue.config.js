const { defineConfig } = require('@vue/cli-service')
const path = require('path') // 需要引入 path 模块

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        
      }
    }
  }
})