import Vue from 'vue'
import store from './../store/index'
import Router from 'vue-router'
import { Toast } from 'vant';
import NotFound from '@/components/404/index'
import WapLogin from '@/components/wap/Login'
import WapTest from '@/components/wap/Test'

import PcLogin from '@/components/pc/Login'
import PcTest from '@/components/pc/Test'
import HomeIndex from '@/components/Home/Index'
import DataFetching from '@/components/pc/DataFetching'
import Falls from '@/components/pc/Falls'

import {i18n} from "../lang";

Vue.use(Router)
Vue.use(Toast);

let terminaType = document.documentElement.clientWidth < 768 ? "wap" : 'pc';
console.log(terminaType);
store.commit('getTerminaType',terminaType);
const router= new Router({
  mode: "history",
  routes:[
    {
      path: '/'+terminaType+'/login',
      component:terminaType=='wap'?WapLogin:PcLogin,
      meta: {
        permission: false
      }
    },
    {
      path: '/',
       //  redirect:'/'+terminaType+'/login',
      redirect:'/index'
    },
    {
      path: '/'+terminaType+'/test',
      component:terminaType=='wap'?WapTest:PcTest,
    },
    {
      path: '/admin/datafetching',
      component:DataFetching,
      meta: {
        permission: true
      },
    },
    {
      path: '/pc/falls',
      component:Falls,
      meta: {
        permission: false
      },
    },
    {
      path: '/index',
      component:HomeIndex,
      meta: {
        permission: false
      },
    },
    {
      path: '*',
      component: NotFound,
      meta: {
        permission: false
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 如果已经登录了
  if (localStorage.hasLogin && JSON.parse(localStorage.hasLogin)) {
    next()
    // 如果没有正常登录，并且需要权限验证，就导航到登录页
  } else if (to.meta.permission) {
    localStorage.hasLogin = false;
    router.push('/'+terminaType+'/login').catch(data => {  })
    Toast("请登录");
  } else {
    // 否则，没有登录，不需要权限验证，就放行通过
    next()
  }
})

export default router
