import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    terminaType:'',
    mycalendarshow:true,
  },
  mutations:{
    getTerminaType(state,flag){
      state.terminaType = flag;
    },
    changeMyCalendar(state,flag){
      state.mycalendarshow = flag;
    },
  }
})
