/*
 *
 * 文章数据状态
 *
 */
import Service from '@/plugins/axios'
export const state = () => {
  return {
    hot: {
      fetching: false,
      data: []
    },
    list: {
      fetching: false,
      data: {
        page: {
          currentPage: 0
        },
        data: []
      }
    },
    detail: {
      fetching: false,
      data: {}
    },
    publish: {
      posting: false,
      data: {}
    },
    self: {
      fetching: false,
      data: {
        page: {
          currentPage: 0
        },
        data: []
      }
    },
    selflike: {
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
  // List
  CLEAR_LIST(state) {
    state.list.data = {
      page: {
        currentPage: 0
      },
      data: []
    }
  },
  REQUEST_LIST(state) {
    state.list.fetching = true
  },
  GET_LIST_FAILURE(state) {
    state.list.fetching = false
  },
  GET_LIST_SUCCESS(state, action) {
    state.list.fetching = false
    state.list.data = action.result
  },
  ADD_LIST_SUCCESS(state, action) {
    state.list.fetching = false
    state.list.data.data.push.apply(state.list.data.data, action.result.data)
    state.list.data.page = action.result.page
  },
  // Hot
  REQUEST_HOT_LIST(state) {
    state.hot.fetching = true
  },
  GET_HOT_LIST_FAILURE(state) {
    state.hot.fetching = false
  },
  GET_HOT_LIST_SUCCESS(state, action){
    state.hot.fetching = false
    state.hot.data = action.result
  },
  // Self
  REQUEST_SELF_LIST(state) {
    state.self.fetching = true
  },
  GET_SELF_LIST_FAILURE(state) {
    state.self.fetching = false
  },
  GET_SELF_LIST_SUCCESS(state, action){
    state.self.fetching = false
    state.self.data = action.result
  },
  // SelfLike
  REQUEST_SELFLIKE_LIST(state) {
    state.selflike.fetching = true
  },
  GET_SELFLIKE_LIST_FAILURE(state) {
    state.selflike.fetching = false
  },
  GET_SELFLIKE_LIST_SUCCESS(state, action){
    state.selflike.fetching = false
    state.selflike.data = action.result
  },
  // Detail
  CLEAR_DETAIL(state) {
    state.detail.data = {}
  },
  REQUEST_DETAIL(state) {
    state.detail.fetching = true
  },
  GET_DETAIL_FAILURE(state) {
    state.detail.fetching = false
    state.detail.data = {}
  },
  GET_DETAIL_SUCCESS(state, action) {
    state.detail.fetching = false
    state.detail.data = action.result
  },
  // 喜欢某篇文章
  LIKE_ARTICLE(state, action) {
    state.list.data.data[action.keyindex].likeId = action.userid
    state.list.data.data[action.keyindex].articleLike = state.list.data.data[action.keyindex].articleLike + 1
  },
  UNLIKE_ARTICLE(state, action) {
    state.list.data.data[action.keyindex].likeId = null
    state.list.data.data[action.keyindex].articleLike = state.list.data.data[action.keyindex].articleLike - 1
  },
  //保存文章
  PUBLISH_ARTICLE_FAILURE(state) {
    state.publish.posting = false
    state.detail.data = {}
  },
  PUBLISH_ARTICLE_SUCCESS(state, action) {
    state.publish.posting = false
    state.publish.data = action
  },
  PUBLISH_ARTICLE(state){
    state.publish.posting = true
  }
}
export const actions = {
  // 获取文章列表
  loadArticles({commit}, params = {currentPage: 1, sortId: null}) {
    commit('REQUEST_LIST')
    return Service.get('/article', {params})
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
  // 获取最热文章列表
  loadHotArticles({commit}) {
    commit('REQUEST_HOT_LIST')
    return Service.get('/article/hot')
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        if (success) commit('GET_HOT_LIST_SUCCESS', response.data)
        if (!success) commit('GET_HOT_LIST_FAILURE')
      }, err => {
        commit('GET_HOT_LIST_FAILURE', err)
      })
  },
  // 获取我的文章列表
  loadSelfOrLikeArticles({commit}, params) {
    return Service.get('/article/self/'+params.type, {params})
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        const isFirstPage = params.currentPage && params.currentPage > 1
        const commitName = `${isFirstPage ? 'ADD' : 'GET'}_${params.type}_LIST_SUCCESS`
        if (success) commit(commitName, response.data)
      })
      .catch(err => {
      })
  },
  // 获取文章详情
  loadArticleDetail({commit}, params = {}) {
    commit('REQUEST_DETAIL')
    return Service.get(`/article/${ params.id }`)
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        if (success) commit('GET_DETAIL_SUCCESS', response.data)
        if (!success) commit('GET_DETAIL_FAILURE')
        return Promise.resolve(response.data)
      }, err => {
        commit('GET_DETAIL_FAILURE', err)
        return Promise.reject(err)
      })
  },
  //保存文章
  PUBLISH_ARTICLE({commit}, params) {
    // 如果数据已存在，则直接返回Promise成功，并返回数据
    // 不存在则请求新数据
    return Service.post('/article', params).then(response => {
      const success = !!response.status && response.data && Object.is(response.data.status, 0)
      if (success) commit('PUBLISH_ARTICLE_SUCCESS', response.data)
      if (!success) commit('PUBLISH_ARTICLE_FAILURE')
      return Promise.resolve(response.data)
    }, err => {
      commit('PUBLISH_ARTICLE_FAILURE', err)
      return Promise.reject(err)
    })
  },
  CLEARARTICLELIST({commit}, params = {currentPage: 1, sortId: null}) {
    commit('CLEAR_LIST')
    commit('REQUEST_LIST')
    return Service.get('/article', {params})
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        const isFirstPage = params.currentPage && params.currentPage > 1
        const commitName = `${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
        if (success) commit(commitName, response.data)
        if (!success) commit('GET_LIST_FAILURE')
      })
      .catch(err => {
        commit('GET_LIST_FAILURE', err)
      })
  },
  likearticle({commit}, params){
    Service.put('/like/' + params.id)
      .then(function (response) {
        commit('LIKE_ARTICLE', params)
      }, function (err) {
      })
  },
  unlikearticle({commit}, params){
    Service.delete('/like/' + params.id)
      .then(function (response) {
        commit('UNLIKE_ARTICLE', params)
      }, function (err) {
      })
  },
}
