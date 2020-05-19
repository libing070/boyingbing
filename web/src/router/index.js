import Vue from 'vue'
import Router from 'vue-router'
import { Toast } from 'vant';


const SignIn = resolve => require(['@/components/Home'], resolve)
import NotFound from '@/components/404/index'
import Dimensions from '@/components/Dimensions/index'
import Galaxy from '@/components/Galaxy/index'
import AnalysisBuy from '@/components/Galaxy/AnalysisBuy'
import HelloWorld from '@/components/HelloWorld'
import {i18n} from "../lang";

Vue.use(Router)
Vue.use(Toast);
const router= new Router({
  routes: [
    {
      path: '/sign-in',
      component: SignIn,
      meta: {
        permission: false
      }
    },
    {
      path: '/',
      redirect:'/sign-in'
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        permission: true
      },
    },
    {
      path: '/dimensions',
      name: 'Dimensions',
      component: Dimensions,
      meta: {
        permission: true
      },
    },
    {
      path: '/galaxy',
      name: 'Galaxy',
      component: Galaxy,
      meta: {
        permission: true
      },
    },
    {
      path: '/analysisBuy',
      name: 'AnalysisBuy',
      component: AnalysisBuy,
      meta: {
        permission: true
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
    // 如果要去账户管理页面
    if (to.path === '/account') {
      // 如果是超级管理员
      if (JSON.parse(localStorage.isSuperAdmin)) {
        next()
      } else {
        // 否则就返回并提示没有权限
        next(from.path)
      //  Message.warning(i18n.t('m.global.tips[0]'))
        Toast(i18n.messages[i18n.locale].global.tips[0]);

      }
    } else {
      next()
    }
    // 如果没有正常登录，并且需要权限验证，就导航到登录页
  } else if (to.meta.permission) {
    localStorage.hasLogin = false
    router.push('/sign-in').catch(data => {  })
    Toast(i18n.messages[i18n.locale].login.info);
  } else {
    // 否则，没有登录，不需要权限验证，就放行通过
    next()
  }
})

export default router
