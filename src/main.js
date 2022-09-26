import Vue from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$echarts = echarts 
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
