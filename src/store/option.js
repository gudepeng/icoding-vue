/*
 *
 * 全局设置数据状态
 *
 */
export const state = () => {
  return {

    // 页面的栏目展示类型（3栏/2栏）
    fullColumn: false,
    errorColumn: false,

    // 图片格式
    imgExt: 'webp',

    // 是否为移动端
    mobileLayout: false,

    // 移动端侧边栏
    mobileSidebar: false,

    // 是否开启弹幕
    openBarrage: false,

    // 是否开启rtc
    openWebrtc: false,

    // ua
    userAgent: '',

    articleType: [
      {
        value: 1, label: '前端'
      },
      {
        value: 2, label: '后端'
      },
      {
        value: 3, label: '数据库'
      },
      {
        value: 4, label: '手机端'
      },
      {
        value: 5, label: '技术简介'
      }
    ],
    articleUpType: [{
      value: '1',
      label: '置顶'
    }, {
      value: '0',
      label: '不置顶'
    }],
    resourceType: [],
  }
}

export const getters = {
  mobileLayout: state => state.mobileLayout,
  articleType: state => state.articleType
}

export const mutations = {

  // 设置UA
  SET_USER_AGENT(state, action) {
    state.userAgent = action
  },

  // 设置图片格式
  SET_IMG_EXT(state, action) {
    state.imgExt = action
  },

  // 设置是否移动端状态
  SET_MOBILE_LAYOUT(state, action) {
    state.mobileLayout = action
  },

  // 切换移动端侧边栏
  SET_MOBILE_SIDEBAR(state, action) {
    state.mobileSidebar = action
  },

  // 设置栏目结构
  SET_FULL_COLUMU(state, action) {
    state.fullColumn = action
  },

  // 设置错误页面模板
  SET_ERROR_COLUMU(state, action) {
    state.errorColumn = action
  },

  // 切换弹幕状态
  UPDATE_BARRAGE_STATE(state, action) {
    if (action !== undefined) {
      state.openBarrage = !!action
    } else {
      state.openBarrage = !state.openBarrage
    }
  },

  // 切换RTC状态
  UPDATE_WEBRTC_STATE(state, action) {
    if (action !== undefined) {
      state.openWebrtc = !!action
    } else {
      state.openWebrtc = !state.openWebrtc
    }
  },
  SET_ARTICLETYPE(state, articletype) {
    state.articleType = articletype
  }
}
