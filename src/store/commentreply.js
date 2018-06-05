/**
 * 登录状态
 **/
import Service from '@/plugins/axios'
export const state = () => {
  return {
    comments:[]
  }
}

export const mutations = {
  GET_COMMENT(state, action) {
    state.comments = action
  },
  SET_COMMENT(state, action) {
    state.comments = action
  },
  SHOW_REPLY(state, action){
    state.comments[action.index].replys = action.data
    state.comments[action.index].showreplys = true
    state.comments=JSON.parse(JSON.stringify(state.comments))
  },
  HIDE_REPLY(state, action){
    state.comments[action.index].showreplys = false
    state.comments=JSON.parse(JSON.stringify(state.comments))
  },
  ADD_SHOW_REPLY(state, action){
    state.comments.unshift(action)
    state.comments=JSON.parse(JSON.stringify(state.comments))
  },
}

export const actions = {
  loadcomment({commit}, params){
    return Service.get('/comment/' + params.topicType+"/"+params.id)
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        if (success)  commit('SET_COMMENT', response.data.result)
      })
      .catch(err => {
      })
  },
  showloadreply({commit,state}, params){
    if(state.comments[params.index].showreplys){
      commit('HIDE_REPLY',params )
    }else{
      return Service.get('/reply', {params})
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.status, 0)
          params.data = response.data.result
          if (success)  commit('SHOW_REPLY',params )
        })
        .catch(err => {
        })
    }
  },
  comitcomment({commit}, params){
    return Service.put('/comment', params)
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        if (success)  commit('ADD_SHOW_REPLY',response.data.result )
      })
      .catch(err => {
      })

  }
}
