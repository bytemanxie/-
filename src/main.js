import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'modern-normalize/modern-normalize.css';
import pinia from './store'

const app = createApp(App)
app.use(router).use(ElementPlus).use(pinia).mount('#app')
app.use(ElementPlus, {
    locale: zhCn,
  })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
} 