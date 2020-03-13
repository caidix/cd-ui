import Vue from 'vue'
import App from './App.vue'
import cdui from '@/index.js'
import '../packages/theme-chalk/src/index.scss'
Vue.config.productionTip = false
Vue.use(cdui)
new Vue({
  render: h => h(App),
}).$mount('#app')
