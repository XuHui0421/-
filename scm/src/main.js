// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './service/http.js'
import * as Filter from './assets/js/filter.js'
import utils from './assets/js/utils.js'
import store from './store/store'
import {baseUrl} from './service/connection.js'
import {Message} from 'element-ui'
import {CityData} from './assets/js/city';
import echarts from 'echarts'
Vue.config.productionTip = false
Object.keys(Filter).forEach(key => {
  Vue.filter(key, Filter[key])
})
Vue.prototype.$utils = utils;
Vue.prototype.$baseUrl = baseUrl;
Vue.prototype.$Message = Message;
Vue.prototype.$CityData = CityData;
Vue.prototype.$echarts = echarts;
Vue.prototype.$store = store;
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
})
