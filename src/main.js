import Vue from 'vue'
import App from './App'
import router from './plugins/router'
import store from './plugins/vuex'
import './plugins/element-ui'
import './plugins/filters'
import './plugins/vue-empty'
import './assets/sass/app.scss'
import 'highlight.js/styles/ocean.css'

import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css'

Vue.use(Share)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
