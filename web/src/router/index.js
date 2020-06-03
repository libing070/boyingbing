import Vue from 'vue'
import store from './../store/index'
import Router from 'vue-router'
import { Toast } from 'vant';

import WapLogin from '@/components/wap/Login'
import WapIndex from '@/components/wap/Index'

import PcLogin from '@/components/pc/Login'
import PcIndex from '@/components/pc/Index'
import DataFetching from '@/components/pc/DataFetching'
import Falls from '@/components/pc/Falls'
import Falls4 from '@/components/pc/Falls4'

import {i18n} from "../lang";

Vue.use(Router)
Vue.use(Toast);

let terminaType = document.documentElement.clientWidth < 768 ? "wap" : 'pc';
console.log(terminaType);
store.commit('getTerminaType',terminaType);
const router= new Router({
  routes:[
    {
      path: '/'+terminaType+'/login',
      component:terminaType=='wap'?WapLogin:PcLogin,
    },
    {
      path: '/',
      redirect:'/'+terminaType+'/login'
    },
    {
      path: '/'+terminaType+'/index',
      component:terminaType=='wap'?WapIndex:PcIndex,
    },
    {
      path: '/pc/datafetching',
      component:DataFetching,
    },
    {
      path: '/pc/falls',
      component:Falls,
    },
    {
      path: '/pc/falls4',
      component:Falls4,
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})

export default router
