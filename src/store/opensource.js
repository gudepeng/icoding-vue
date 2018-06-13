/*
 *
 * 文章数据状态
 *
 */
import Service from '@/plugins/axios'
export const state = () => {
  return {
    list: {
      fetching: false,
      data: {
        page: {
          currentPage: 0
        },
        data: []
      }
    }
  }
}
export const mutations = {
  GET_LIST_SUCCESS(state, action) {
    state.list.fetching = false
    state.list.data = action.result
  },
  ADD_LIST_SUCCESS(state, action) {
    state.list.fetching = false
    state.list.data.data.push.apply(state.list.data.data, action.result.data)
    state.list.data.page = action.result.page
  },
  REQUEST_LIST(state) {
    state.list.fetching = true
  },
  GET_LIST_FAILURE(state) {
    state.list.fetching = false
  },
}
export const actions = {
  // 获取文章列表
  loadOpenSources({commit}, params = {currentPage: 1}) {
    commit('REQUEST_LIST')
    return Service.get('/opensource', {params})
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        const isFirstPage = params.currentPage && params.currentPage > 1
        const commitName = `${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
        if (success) commit(commitName, response.data)
        if (!success) commit('GET_LIST_FAILURE')
      })
      .catch(err => {
        commit('article/GET_LIST_FAILURE', err)
      })
  },
}
