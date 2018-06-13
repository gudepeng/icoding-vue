/**
 * 登录状态
 **/
import Service from '@/plugins/axios'
export const state = () => {
  return {
    showlogintype: null,
    authUser: null,
    connect:{
      qq:false,
      github:false
    },
  }
}

export const mutations = {
  SHOW_LOGIN(state, action) {
    state.showlogintype = action
  },
  SET_USER(state, user) {
    state.authUser = user
  },
  SET_CONNECT(state, data) {
    state.connect = data
  },
}

export const actions = {
  BINDCONNECT({commit}, params) {
    return Service.post('/connect/'+params)
      .then(response => {
        debugger
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        if (success) commit('SET_USER', response.data)
      }, err => {
      })
  },
  CONNECT({commit}) {
    return Service.get('/connect')
      .then(response => {
        const success = !!response.status && response.data
        if (success) commit('SET_CONNECT', response.data)
      }, err => {
      })
  },
  //修改登录状态
  SHOWLONGINTYPE({commit}, params) {
    commit('SHOW_LOGIN', params)
  },
  // 获取博主资料
  loadAdminInfo({commit}) {
    return Service.get('/user/me')
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        if (success) commit('SET_USER', response.data.result)
      }, err => {
      })
  },
  login({commit}, form) {
    return Service.post('/login/form', form, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        if (response.status == 200) {
          commit('SET_USER', response)
          commit('SHOW_LOGIN', null)
        }
      })
      .catch(err => {
        commit('SET_USER', null)
      })
  },
  logout({commit}) {
    commit('SET_USER', null)
    Service.post('/logout').then(response => {
    })
  },
}
