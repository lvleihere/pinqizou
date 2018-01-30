// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//import { Button } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
//Vue.use(Button)
Vue.use(ElementUI)
/* eslint-disable no-new */
Vue.prototype.rand = Date.now()
Vue.prototype.url = 'http://pinqizou.com'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
