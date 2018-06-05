import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: resolve => require(["@/components/index/index"], resolve),
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: resolve => require(["@/components/article/index"], resolve),
    },
    {
      path: '/mycenter/:id',
      name: 'MyCenter',
      component: resolve => require(["@/components/mycenter/index"], resolve),
    },
    {
      path: '/publish',
      name: 'Publish',
      component: resolve => require(["@/components/publish/index"], resolve),
    },
  ]
})
