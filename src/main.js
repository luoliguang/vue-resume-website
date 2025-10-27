import { createApp } from 'vue'
import App from './App.vue'
import { scrollFadeIn } from './directives/scrollFadeIn.js'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import { initLanguage } from './composables/useI18n.js'

const app = createApp(App)

// 注册Arco Design
app.use(ArcoVue)

// 注册自定义指令
app.directive('scroll-fade-in', scrollFadeIn)

// 初始化语言设置
initLanguage()

app.mount('#app')
