import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    mycalendarshow:true,
  },
  mutations:{
    changeMyCalendar(state,flag){
      state.mycalendarshow = flag;
    },
  }
})
