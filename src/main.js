import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'virtual:windi.css'

import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import './theme.css'

import { createPinia } from 'pinia'

import router from './router'

createApp(App)
  .use(TDesign)
  .use(createPinia())
  .use(router)
  .mount('#app')
