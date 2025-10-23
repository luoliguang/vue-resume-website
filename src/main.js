import { createApp } from 'vue'
import App from './App.vue'
import { scrollFadeIn } from './directives/scrollFadeIn.js'

const app = createApp(App)

// 注册自定义指令
app.directive('scroll-fade-in', scrollFadeIn)

app.mount('#app')
