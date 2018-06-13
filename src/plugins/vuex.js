import Vue from 'vue'
import Vuex from 'vuex'
import * as article from '@/store/article'
import * as commentreply from '@/store/commentreply'
import * as login from '@/store/login'
import * as option from '@/store/option'
import * as tag from '@/store/tag'
import * as opensource from '@/store/opensource'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    article:article,
    commentreply:commentreply,
    login:login,
    option:option,
    tag:tag,
    opensource:opensource
  }
})
export default store
