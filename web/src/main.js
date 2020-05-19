// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './libs/rem.js';
import router from './router'
import axios from 'axios'
// 引入vuex-store
import store from './store/index';
import echarts from 'echarts'
import Vant from 'vant';
import 'vant/lib/index.css';
import * as t  from './assets/js/common'


Vue.use(Vant);
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts;
var that=this;
  setInterval(function () {
    $.ajax({
      url:'/v2/checkLogin',
      type:'get',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      async: false,
      success: function(status) {
        var status=JSON.parse(status)['status'];
        if (status ==-1) {
          console.log(status);
          localStorage.hasLogin = false;
          localStorage.isSuperAdmin = '';
          localStorage.name = '';
          localStorage.UserPhone = '';
          if(!(window.location.href.indexOf("sign-in")>-1)){
            window.location.href='sign-in';
          }
        }
      }
    })
  },2000);




// 导入资源文件
import {i18n, vantLocales} from './lang'
console.log('当前的语言是：', i18n.locale)
// vant-ui组件国际化
vantLocales(i18n.locale)

console.log('main.js文件温馨提示：', i18n.messages[i18n.locale].app.hello)
Vue.config.productionTip = false

import myLoading from './assets/js/myLoading'
Vue.use(myLoading);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
