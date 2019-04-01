import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface InitialState{
  count: number;
}

const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increase(state: InitialState) {
      state.count += 1
    },
    decrease(state: InitialState) {
      state.count -= 1
    },
    setExact(state: InitialState, payload: number) {
      state.count = payload
    }
  }
})

export default store
