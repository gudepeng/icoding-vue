/*
 *
 * 标签数据状态
 *
 */

export const state = () => {
  return {
    fetching: false,
    data: {
      data: []
    }
  }
}

export const mutations = {
  REQUEST_LIST(state) {
    state.fetching = true
  },
  GET_LIST_FAILURE(state) {
    state.fetching = false
    state.data = {data: []}
  },
  GET_LIST_SUCCESS(state, action) {
    state.fetching = false
    state.data = action.result
  }
}

export const actions = {
  // 获取标签列表
  loadTagList({commit}, params = {per_page: 160}) {
    commit('REQUEST_LIST')
    return Service.get('/tag', {params})
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.code, 1)
        if (success) commit('GET_LIST_SUCCESS', response.data)
        if (!success) commit('GET_LIST_FAILURE')
      })
      .catch(err => {
        commit('GET_LIST_FAILURE', err)
      })
  },
}
