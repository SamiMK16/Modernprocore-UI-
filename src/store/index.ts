import Vue from 'vue';
import Vuex from 'vuex';

// Global app stores
import AuthStore from './auth';

// Instantiate the store.
Vue.use(Vuex);

// Wire up.
const store = new Vuex.Store({
  modules: {
    auth: AuthStore,
  },
});

export default store;
