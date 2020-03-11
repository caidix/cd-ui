import Vue from 'vue'
import App from './App.vue'
import cdui from '@/index.js'
Vue.config.productionTip = false
Vue.use(cdui)
new Vue({
  render: h => h(App),
}).$mount('#app')
