import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  getters: {},
  mutations: {
    setMenu(state, menu) {
      state.menu = menu;
      console.log(store.state.menu);
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
});

export default store;
