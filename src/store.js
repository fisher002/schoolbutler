import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state是唯一公共数据源，所有共享数据都要统一放到store的state中进行储存
  state: {
    count: 0,
    access_token: '',
    indexBreakData: []
  },
  // mutations不支持异步函数执行,只允许同步代码,只有在mutations中才有权限修改state中的数据
  /**
   * 第一种调用方法：全局调用this.$store.commit()
   * 第二种：import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
   */
  mutations: {
    setToken(state,step) {
      state.access_token = step;
    },
    setIndexBreakData(state,step) { // 往面包屑数据 indexBreakData 追加数据
      state.indexBreakData.push(...step);
    },
    clearIndexBreakData(state) { // 清除面包屑 indexBreakData
      state.indexBreakData = [];
    }
  },
  // actions允许异步执行 setTimeout等
  // 在actions中不能直接修改state中的数据，必须通过触发某个mutations才行 全局调用this.$store.dispatch()
  actions: {},
  // getters 不会修改state中的数据，只重新包装state中的某一项数据 this.$store.getters.[函数名]
  getters: {
    // showNum(state) {
    //   return '当前最新的数量为【' + state.count + '】'
    // },
    getToken(state) {
      return state.access_token;
    },
    getIndexBreakData(state) { // 返回面包屑 indexBreakData 不修改原数据
      return state.indexBreakData;
    }
  }
})
