import Vue from 'vue'
import Router from 'vue-router'
import layout from './views/layout/layout'
import home from './views/home/home.vue'
import login from './views/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      redirect: 'login',
      children: [
        // 首页
        {
          path: '/home',
          component: home,
          name: 'home'
        },
        // 设备管理
        {
          path: '/basicManagement/deviceManagement',
          component: () => import('./views/basicManagement/deviceManagement.vue'),
          name: 'deviceManagement'
        },
        // 区域管理
        {
          path: '/basicManagement/areaManagement',
          component: () => import('./views/basicManagement/areaManagement.vue'),
          name: 'areaManagement'
        },
        // 报警设置
        {
          path: '/basicManagement/warningSetting',
          component: () => import('./views/basicManagement/warningSetting.vue'),
          name: 'warningSetting'
        },
        // 办公区简介
        {
          path: '/officeManagement/officeIntroduction',
          component: () => import('./views/officeManagement/officeIntroduction.vue'),
          name: 'officeIntroduction'
        },
        // 通讯录
        {
          path: '/officeManagement/contactList',
          component: () => import('./views/officeManagement/contactList.vue'),
          name: 'contactList'
        },
        // 排班表
        {
          path: '/officeManagement/workingList',
          component: () => import('./views/officeManagement/workingList.vue'),
          name: 'workingList'
        },
        // 计划任务
        {
          path: '/officeManagement/planList',
          component: () => import('./views/officeManagement/planList.vue'),
          name: 'planList'
        },
        // 日常简报
        {
          path: '/officeManagement/dailyBriefing',
          component: () => import('./views/officeManagement/dailyBriefing.vue'),
          name: 'dailyBriefing'
        },
        // 报警管理
        {
          path: '/warningManagement',
          name: '报警管理',
          component: () => import('./views/warningManagement/warningManagement')
        },
        // 系统管理
        {
          path: '/systemManagement',
          name: '系统管理',
          component: () => import('./views/systemManagement/systemManagement')
        }
      ]
    },
    {
      path: '/login',
      component: login,
      name: 'login'
    }
  ]
})
