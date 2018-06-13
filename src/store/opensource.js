/*
 *
 * 文章数据状态
 *
 */
import axios from 'axios'
export const state = () => {
  return {
    opensources: {
      fetching: false,
      data: {
      }
    }
  }
}
export const mutations = {
  GET_OPENSOURCES_SUCCESS(state, data) {
    state.opensources.fetching = false
    state.opensources.data = data
  },
  REQUEST_OPENSOURCES(state) {
    state.opensources.fetching = true
  },
  GET_OPENSOURCES_FAILURE(state) {
    state.opensources.fetching = false
  },
}
export const actions = {
  // 获取文章列表
  loadOpenSources({commit}) {
    commit('REQUEST_OPENSOURCES')
    return axios.get('https://api.github.com/users/gudepeng/starred')
      .then(response => {
        commit('GET_OPENSOURCES_SUCCESS',response.data)
      })
      .catch(err => {
        commit('GET_OPENSOURCES_FAILURE', err)
      })
  },
}
