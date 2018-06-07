import Vue from 'vue'
import App from './App'
import router from './plugins/router'
import store from './plugins/vuex'
import './plugins/element-ui'
import './plugins/filters'
import './plugins/vue-empty'
import './assets/sass/app.scss'
import 'highlight.js/styles/ocean.css'

Vue.config.productionTip = false

let vm =new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

import uaParse from './plugins/ua-parse'
const { isMobile, isOpera, isIE, isSafari, isEdge, isFF, isBB, isChrome, isMaxthon, isIos } = uaParse(navigator.userAgent)
vm.$store.commit('SET_MOBILE_LAYOUT', isMobile)
