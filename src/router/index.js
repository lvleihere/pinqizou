import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Publish from '@/pages/Publish'
import User from '@/pages/User'
import Base from '@/pages/user/Base'
import Msg from '@/pages/user/Msg'
import AppInfo from '@/pages/AppInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'base/:uid?',
          component: Base
        },
        {
          path: 'msg',
          component: Msg
        }
      ]
    },
    {
      path: '/appinfo',
      name: 'AppInfo',
      component: AppInfo
    }
  ]
})
