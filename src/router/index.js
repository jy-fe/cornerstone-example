import Vue from 'vue'
import Router from 'vue-router'
import AllToolsExample from '@/pages/AllToolsExample/index'
import AllImageTools from '@/pages/AllImageTools'
import ClearToolData from '@/pages/ClearToolData'
import LayeredImageStacks from '@/pages/LayeredImageStacks'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AllToolsExample',
      component: AllToolsExample
    },
    {
      path: '/allImageTools',
      name: 'AllImageTools',
      component: AllImageTools
    },
    {
      path: '/clearToolData',
      name: 'ClearToolData',
      component: ClearToolData
    },
    {
      path: '/layeredImageStacks',
      name: 'LayeredImageStacks',
      component: LayeredImageStacks
    }
  ]
})
